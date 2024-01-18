export const blogsTable = [
  {
    content: `We previously explained how we calculate the Hashnode Feed and select content and metadata for each user. We found that the feed now displays improved and personalized content. However, we did find two issues in the implementation:

Performance: The Feed calculation is not trivial; thus, it slows down the access to our main page.

Security: Many expensive queries and aggregations are needed to gather all the data required for the calculation. Safeguarding our database from excessive usage is a must.

Speeding up the page, keeping our databased safe, and showing the freshest content for you on the Hompage was the inspiration for building Feeds on steroids: a scalable and serverless architecture to pre-calculate feeds for recurring users 💊

High level overview of Hashnode's scalable feed architecture

To optimize page speed, we found that pre-calculating feeds for users is the best option. This means we don't have to calculate the feed every time a user visits our feed page. Instead, we can return the feed from the cache and make page loading times faster. A crucial enabler for this is using a cache. With the fast access a cache offers, we can directly load the feed from there to be presented for our users. The above image shows this in a very high abstraction. We are calculating feeds using data from our internal database and a cache for relevant metadata. The calculated data is then stored in a cache for quick access.

Let's take a look at how everything comes together in detail ⬇️

Pre-calculating feeds for thousands of users with AWS Step Functions 😎
Detailed overview of Hashnode's scalable feed architecture

We calculate the feed for each user based on internal Hashnode events. These events require a re-calculation of the feeds. An example here is publishing a new post on Hashnode.

Prepare the cache: Before we start calculating each feed, we must ensure that all data required is in the cache. The final calculation step is wholly based on the cache. This includes user metadata, relevant data for posts, and active users for whom we are pre-calculating. If data is unavailable in the cache or too old for usage, we pull fresh data from our internal database.

Calculate the feed: We start the actual calculation when all data is prepared and ready in the cache. We use an AWS Step Function feature called distributed map execution to do this in parallel. We can calculate multiple feeds simultaneously and reduce execution time. Each calculation has its own AWS Lambda function.

If each user's feed would be calculated on the fly, we would see longer loading times on Hashnode's main page. To do the calculation, we need a lot of data. We must get all the data from the database. This will affect other queries. Lastly, a simple approach like that seems wasteful. We are pulling in the same data again and again for the calculation without reusing it.

The above architecture reference shows the feed pre-calculation process. We utilize a couple of services to achieve a performant recalculation on various triggers:

AWS Lambda

AWS Step Functions

Redis Cache

Distributed Maps in Step Functions

Amazon EventBridge

Once an event that requires feed re-calculation reaches the AWS Step Function, we will run different checks and collect the necessary data. A new feed for each active user on our platform is then generated. We minimize database access and store necessary data in a cache for fast access. Utilizing our event-driven architecture allows us to react to different events within the system and keep the cache up-to-date.

Let's look at the core parts and what's happening there.

Preparing data in the cache
Preparing user relevant data for the calculation

When an event triggers an AWS Step Function, we must have all the required data for the calculation step. The first step is to check if the cache has valid data. If not, fill it. The main data for feed calculation are posts. The first AWS Lambda in the AWS Step Function execution will check if we have valid data in the cache for the posts we base our calculation on. Valid in this context refers to data that is not outdated and available in the cache.

Once this is resolved, we can go to the next ingredient for calculation: getting the active users. When no active user is found, we skip the further execution altogether.

Based on the active users, we can now check if the personalization component, the user's metadata, is available in the cache. If metadata is found, we can directly calculate the feed. Otherwise, we have to collect the metadata beforehand from the database and save it to the cache.

These last two steps are done by utilizing distributed maps. One map for users whom we have found valid metadata in our cache. One for users where no metadata data was found, and we need to collect it before starting the actual calculation

Distributed map for users where metadata is available
Calculating the feed for users where metadata was found in the cache

We find valid metadata for a user. The previous steps of our AWS Step Function provided all the required data. We can now start calculating the user's feed directly. Notice how no database is involved in this step anymore.

Distributed map for users where metadata is not available
Calculating the feed for users where no metadata was found in the cache

No metadata found for the user requires us to prepare it before starting the calculation. A preceding AWS Lambda function handles this before the actual calculation is done. The database is queried to collect the user's metadata, and the result is stored in our cache. Again, the calculation step does not require any database connection to do its job.

The two distributed maps share the same final step of the feed calculation. Once succeeded, we save the result, the user's feed, in the cache for fast access via our APIs. To make the process faster and use less bandwidth, we use item batching in the AWS Step Function. This allows us to share post data with the items in the same batch. We would have to get the post data and metadata information for each user otherwise.

Feed calculation execution duration

A typical AWS Step Function run has a duration of ~26 seconds - while calculating the feed for thousands of users 🚀

Getting rid of stale data - Purging and re-calculating feeds on a period
We decided to purge the whole cache regularly, even though we have implemented householding for our cache. We also have various steps in the AWS Step Function that validate cache data before the calculation is done.

A cron job runs the AWS Step Function every couple of hours to delete all data in the cache. This is a safety measure and reassurance that we only store essential data briefly. We can ignore events that may affect the feed for a longer time. The updates from these events will be included after the next purge. This is a nice bonus. This saves some implementation effort for low-priority events regarding feed re-calculation. The AWS Step Function will refill the cache when the feed is empty.

Final words
This post should give you a rough idea of calculating feeds on the scale and which services we apply. Are you interested in more feed-related content? If so, let us know in the comments - we have a couple more crips implementation details ready to be published 🙌

Cheers 🙌`,
  },
  {
    content: `One essential feature of any blogging platform is the ability to schedule posts for publication. Hashnode introduced this functionality in June 2022.

At that time, the entire feature was based on a CRON job. This CRON job managed all various states and published the post. The CRON job was running every minute to ensure that scheduled posts were published.

There were certain cons associated with the CRON job:

Unnecessary computation: The CRON job ran even if no posts were scheduled at that time.

Observability: Each execution of the CRON job produced logs and traces. It was quite hard to understand if and how many posts were scheduled at a certain time.

Error Handling: Error handling was quite hard. If one post failed to be published we couldn't let the whole processing Lambda fail. Alerting needed special functionalities to handle that.

With the launch of EventBridge Scheduler in 2022 we instantly knew that scheduling posts is a perfect use-case for that.

EventBridge Scheduler
eventbridge scheduler example

EventBridge scheduler is a feature of EventBridge that allows users to schedule tasks at precise times. You can schedule a task that will be executed once at an exact time.

The same targets are supported as for EventBridge, such as:

Lambda

SQS

SNS

Step Functions

... and many more!

Scheduling Posts with EventBridge Scheduler
scheduling posts with eventbridge

Let's see how we have implemented the scheduling of posts with the scheduler.

EventBridge Scheduling Basics
Before we worked on any API integrations we first created a few resources we needed to share with our API:

EventBridge Scheduling Group

Lambda Consumer with DLQ (consumer errors)

SQS Dead-Letter-Queue (server-side errors)

IAM Role

☝
Hashnode uses two different CDK apps. One for all asynchronous workloads in plain CDK. And another one with SST for our synchronous APIs. Data needs to be shared via SSM parameters.
EventBridge Scheduling Group
For improving the overview of schedules it is recommended to create schedule groups. It is easier to filter your schedules based on these. We have created one group with the name: SchedulePublishDraft.


COPY

COPY
new CfnScheduleGroup(this, 'SchedulePublishDraft');
This group needs to be supplied once the schedule is created.

Lambda Consumer


Next, we need a Consumer for our EventBridge Schedule. The schedule is scheduled for a specific time. Once this time is reached a target consumer is called.

We use AWS Lambda for that. The Lambda function will be called asynchronously. The asynchronous call gives us the ability to use Lambda Destinations. You have two types of Lambda Destinations:

onSuccess: This is called once the Lambda succeeds

onFailure: This is called once the Lambda fails

We make use of the onFailure destination. Once the Lambda function encounters some error and fails, we retry the event two times. If it still fails we send it to a Dead-Letter-Queue (DLQ).

The Lambda function executes the business logic (publishing the post, and updating some database states).

🚧
Remember: Your EventBridge consumer needs to be idempotent. If not it can (and will happen) that your consumer is executed twice. Which could result in duplicated post publishes.
Scheduling DLQ (server-side errors)
DLQ for EventBridge errors

There is a second DLQ we need to supply in our creation of the EventBridge schedule. This DLQ handles all server-side errors like missing IAM permissions or Lambda API outages.

We now have two DLQs in place:

The first one is for server-side errors. For example: Missing IAM policies or when the Lambda API is down

The second one is for consumer errors. In case the Lambda function fails, the event will be retried two times and after that sent to a DLQ.

In this section, we are talking about the first one. This one is needed to supply while creating the schedule.

We create this DLQ with CDK as well and share it via a parameter:


COPY

COPY

const dlqScheduler = new MonitoredDeadLetterQueue(this, 'SchedulerDlq');

this.scheduleDeadLetterArn = dlqScheduler.queueArn;

new StringParameter(this, 'EventBridgeSchedulerDLQArn', {
  stringValue: this.scheduleDeadLetterArn,
});
This gives us the ability to use the parameter in the second API CDK app.

IAM Role
While creating the schedule you need to supply an IAM Role ARN. This role is used for executing the schedule.

This is the CDK code we are using:


COPY

COPY
this.role = new Role(this, 'RevokeProAccessPublicationRole', {
  assumedBy: new ServicePrincipal('scheduler.amazonaws.com')
});

this.postPublishLambda.grantInvoke(this.role);


new StringParameter(this, 'TargetRoleArn', {
  stringValue: this.role.roleArn,
  parameterName: /infra/schedulePublishDraft/targetRoleArn\
});
We create a role that can be assumed by the scheduler service. We then grant the invoke permissions for one Lambda to this role and save it as a string parameter in SSM.

CRUD Operations
One of the main things we needed to think about is how we want to Create, Update, and Delete the schedules. Hashnode uses a GraphQL API. We have had several mutations for handling schedules already (yes the naming can be quite hard with posts and drafts...):

scheduleDraft

reschedulePost

cancelScheduledPost

These operations handled the creation of documents in our database. Each of these mutation need to handle the EventBridge schedule CRUD operation.

Schedule Drafts
Scheduling a draft needs to create the EventBridge schedule. We have our own package in our monorepo called @hashnode/scheduling. This package abstracts the calls to EventBridge and allows us to type it more precisely for our needs.

For publishing a draft we only need to call the function schedulePublishDraftScheduler() and everything else is abstracted. The function will

Parse incoming data with zod

Creates the CreateScheduleCommand

Sends the command to EventBridge to create the schedule

The create command looks like this:


COPY

COPY
const command = new CreateScheduleCommand({
  Name: createName({
    draftId
  }),
  GroupName: groupName,
  ScheduleExpression: at(),
  ScheduleExpressionTimezone: 'UTC',
  Target: {
    Arn: targetArn,
    RoleArn: targetRoleArn,
    Input: JSON.stringify(schedulerPayload),
    DeadLetterConfig: {
      Arn: deadLetterArn
    }
  },
  FlexibleTimeWindow: { Mode: 'OFF' },
  ActionAfterCompletion: 'DELETE'
});
The name of each schedule should be unique (no drafts can be scheduled twice). The name follows this pattern:


COPY

COPY
SchedulePublishDraft-
The Target input object shows you all the data we have created before:

Arn: ARN of the Lambda function that executes the business logic

RoleArn: The ARN of the Role

DeadLetterConfig.Arn: The ARN of the DLQ for server-side errors

We also set the flag ActionAfterCompletion to DELETE to make sure each schedule is removed after it runs successfully.

Reschedule Drafts & Cancel Schedules
Rescheduling and canceling scheduled drafts follows the same procedure as creating them. In rescheduling, we make sure that the date is valid. We update the schedule.

For canceling schedules we simply remove the schedule from EventBridge.

Results after that
We've deployed everything on production without any issues. A very minimal migration was needed to create schedules for all existing drafts.

Now, if one post publish fails we get alerted immediately with exactly the post that failed.

The development and integration of using EventBridge Schedules for use cases like this are straightforward. The benefits of simplicity we have are immense.

Summary
This post should show you how easy it can be to leverage the managed services of AWS for features like that. The scheduling stack costs 1ct per month at the moment.

Costs for scheduling stack

One alternative approach for tackling this issue of the CRON job would have been to use SQS and partial batch failures. However, the EventBridge scheduling approach is much more simple. And simple is king.

Resources
Hashnode

Join our Discord Server`,
  },
  {
    content: `Handling Events the React way:
React lets you add event handlers to your JSX. Event handlers are your own functions that will be triggered in response to interactions like clicking, hovering, focusing form inputs, and so on. For this concept about responding to events I will be using the React documentation.

First I am going to create a simple steps component to explain a bit.🙂👇



Adding event handlers:
To add an event handler, you will first define a function and then pass it as props to the appropriate JSX tag. For example, the previous and next buttons in the image below have no functionality. Let's change that in three steps! 💪 First, this is what our <button> JSX file looks like, with only the className and inline styles at Line 19 and 25 👇."



So three steps :

Create two functions called handlePrevious and handleNext inside the App component.

Implement a logic inside that function (use alert to show the message for previous and next respectively).

And lastly, add onClick={handlePrevious} and onClick={handleNext} to the <button> JSX.

See step 1, 2 and 3👇👌.



See results when I click on the previous button👇



Here I defined the handlePrevious and handleNext function and then passed it as props to <button> . Alternatively you can define the event handler inside of the JSX 👇

<button onClick={function handlePrevious() {

alert('Previous');

}}>

Or with the arrow function👇👇

<button onClick={() => {alert('Previous')}}>

Note: All of these styles are equivalent. Inline event handlers are convenient for short functions.

Things to take note of when adding event handlers:
Functions passed to event handlers must be passed, not called. Let's create two examples and the first will be what passing a function looks like and the second will be calling a function ❌👇

First ✔ - Passing function : <button onClick={handlePrevious}>

Second❌ - Calling function : <button onClick={handlePrevious()}>

Now the difference between these two is that In the first example, the handlePrevious function is passed as an onClick event handler. This tells React to remember it and only call your function when the user clicks the button.

In the second example, the () at the end of handlePrevious() fires the function immediately during rendering, without any clicks. This is because JavaScript inside the JSX { and } executes right away.

Remember here👆👆 we already defined the function before passing it. So now what if we want to try other alternative like defining the function in the JSX🤔🤔💭. 👇

Wrong❌ - This alert fires when the component renders, not when clicked!

<button onClick={alert('Previous')}>

Correct ✔- If you want to define your event handler inline, wrap it in an anonymous function like so👇.

<button onClick={() => alert('Previous')}>

In Conclusion:

<button onClick={handlePrevious}> passes the handlePrevious function.✔

<button onClick={() => alert('handleNext')}> passes the () => alert('handleNext') function.✔

There are also different event handlers like onMouseOver and onMouseOut, among others.

Passing event handlers as props
Just as we pass props from parent to child components, we can also pass event handlers. Now, I'll try to simplify this because React documentation almost made my brain vanish! 😢🤣

Let's say we want to move the previous and next button elements from the App component and create a separate component for them. However, we still want to trigger alert("previous") when clicking on the previous button and alert("next") when clicking on the next button. 👇👇 Now, remember our previous steps. 👇"



Since we've extracted the button JSX with the event handler from step 3 and created a new component for both buttons, we now need to figure out how to pass the function created in step 1, along with the logic added to the function in step 2, to the new components from the App component. Are you following? 🤔 Take a look at the new components I've created and how I've used them in the App component, passing the event handlers as props. 👇👇



This still works fine ✌ like when the <button> was still in the App component.👇



Naming event handler props
When it comes to naming event handler props in React, it's essential to follow a convention that is clear, descriptive, and consistent. This helps improve code readability and maintainability. Choose names that clearly indicate the purpose or action of the event. For example, if the event is handling a button click, a prop like onClick is more descriptive than something generic like handlePrevious. So, on lines 25 and 26, I may have playfully violated this rule a bit! 🤣👇👇



Time to fix this🙆‍♀️👇. I hope It's right 🤔 at Line 25 and 26.



Other rules include starting the event handler prop name with 'on' to clearly indicate that it represents an event, using descriptive names, and following the camelCase convention for event handler prop names.

Tomorrow, I'll try to make the Steps component functional. Wish me luck! 🎉🥰

Thanks for reading. I'm going to learn some more CSS now. 🙆‍♀️🎉 Have a great day!.`,
  },
  {
    content: `Introduction
Redirecting to a page that is not found on your website is annoying and what makes it more annoying is the fact that the generic 404 page from next.js is ugly and you just hate yourself for going to a file that is not found. But there is nothing you can do except you make it pretty and that’s what we’re going to do in this article.

Understanding Next.js Routing in app router
Next.js has two options for routing but in this article, we’re only going to be working with the app router which is the recommended option for next.js. Routing in the app router is different from page router but we won’t be looking at that today.

Routing in the app router is pretty cool, you can define a unique route by creating a folder and putting “page.tsx” in it and it automatically handles client-side navigation.



Next.js has file conventions which are the rules or guidelines for naming files that define routes of your web application and will be looking at one of the files next.js has which is not-found.js which renders as the 404 page.

No offense but I honestly don’t want to see this UI when I redirect to a URL that is not found on your website.



Why a custom 404 page?
By customizing your 404 page you have the opportunity to turn a potential frustration for users into a unique and engaging experience. A customized 404 page will give the user a good experience because you have a detailed message telling them that they are on the wrong page and a button for them to redirect them to the homepage. You can make the page engaging by adding your brand identity like color, logo, image, etc., and something cool like what we’ll be doing today.

Setting Up a Next.js Project and Integrating Tailwind CSS
Let’s install the next.js project using this command



Take note of what I selected and do that for yours.



Creating the 404 Page and Adding Styles with Tailwind
Create a page called “not-found”



This page automatically becomes your custom 404 page.

Let’s write something inside and check out how it looks on the browser.





Woah, it works. So let’s make it pretty.

Use this code to update the style.
Here is the preview.



Conclusion
I hope this article has successfully guided you on how to create your custom 404 page. Make sure to create a prettier UI for your 404 page.
`,
  },
  {
    content: `sudo yum install git -y - install git in the local system.

git config --global user.name - sets the global username for Git on your computer.

git config --global user.email - sets the global email address for Git on your computer.

git config --system user.email - used to set the email address for all users on the system

git config --system user.name - used to set the Username for all users on the system

git config --list - lists all the variables and values that are set in the Git configuration file.

git help - displays help information about Git.

man git log -Displays the manual page for the git log command.

git pull - pulls the changes from a remote repository to your local repository.

git add - adds the specified file to the staging area.(uses dot ‘.’ For all)

git remote add origin - it sets up a connection between your local Git repository and a remote repository specified by the . This allows you to push and pull changes to and from the remote repository.

git commit -m “” - used to create a new commit with a descriptive comment in Git. or move files from staging area committed area.

git push - used to upload your local Git commits to a remote repository.

git status - it shows the current state of your Git repository, including any changes you've made and the status of your branches.

git diff - different between working area to stagging area.

git diff --staged - different between stagging area to committed area.

git diff HEAD - Difference between commited to working area.

git difftool - visual representation of file working area to stagging area.

git difftool --staged - opens a visual diff tool to compare the changes between your staged changes and the previous commit. It's a helpful way to review and visualize the differences before committing them.

git difftool HEAD - compares the latest changes between your current branch's latest commit and the previous commit visually.

git status -s - provides a short and concise summary of the status of your Git repository, showing the modified, added, and deleted files in a simplified format. It's a quick way to get an overview of the changes in your repository.

git log - displays a chronological list of commits in the Git repository, showing the commit hash, author, date, and commit message.

.gitignore -The ".gitignore" file is used to specify intentionally untracked files and directories that Git should ignore. It's helpful to prevent certain files from being committed to the repository.

git reset HEAD - git reset HEAD " allows you to unstage a file that was previously added.

git reset --hard HEAD~1 - will reset your repository to the previous commit, discarding the changes in the most recent commit.

git restore - allows you to discard changes in a specific file and restore it to the state of the last commit.

git tag - used to create a new tag in Git. Tags are used to mark specific points in history, like a specific commit or release version

git tag - It shows the names of the tags that have been created.

git push origin - To push a specific tag to the remote repository, you can use the command "git push origin ". This will push the tag to the origin remote repository.

git remote - The "git remote" command is used to manage the remote repositories associated with your local Git repository. It allows you to view, add, rename, and remove remote repositories.

git remote rename

To rename a remote repository in Git`,
  },
  {
    content: `What is a CDN?
A Content Delivery Network (CDN) is a geographically distributed network of servers that work together to provide fast delivery of internet content. A CDN allows for the quick transfer of assets needed for loading internet content including HTML pages, java script files, stylesheets, images, and videos.

Why Do We Need a CDN?
The primary reasons for using a CDN are to improve website load times, reduce bandwidth costs, increase content availability and redundancy, and improve website security.

Performance: CDNs deliver content to end users from the nearest server, reducing latency and packet loss.

Scalability: CDNs can handle sudden traffic spikes and heavy loads, like during major events.

Reliability: By distributing assets across multiple servers, CDNs can handle hardware failures more smoothly.

Security: CDNs can provide several security benefits, like DDoS protection and edge SSL encryption.

Blocked Access: With CDN, your content might be blocked in certain countries or regions.

Optimization: CDNs often provide automatic optimization for faster content delivery

Content Delivery Network (CDN) - Ultimate Guide (2023)

Different Types of CDNs
There are primarily three types of CDNs:

Open CDNs: These are publicly available CDNs that anyone can use to deliver content. Examples include Cloudflare and Fastly.

Private CDNs: These are custom-built for specific organizations and are not available to the general public. Large companies like Google and Facebook use private CDNs.

Hybrid CDNs: These are a combination of open and private CDNs, providing the benefits of both types.

Use Cases and Real-World Examples
CDNs are used in various scenarios, such as:

Website Content Delivery: CDNs are used to deliver website content to users quickly and efficiently. For example, media websites like BBC and CNN use CDNs to ensure their content reaches viewers around the world quickly.

Streaming Media: CDNs are used to stream video and audio content to users worldwide. For instance, Netflix and YouTube use CDNs to ensure smooth streaming experiences for their users.

Software Distribution: CDNs are used to distribute software updates and patches to users. For example, Microsoft uses its own CDN to distribute updates to Windows users worldwide.

Different CDN's available across the globe
Akamai CDN (Content Delivery Network) is a globally distributed network of servers designed to deliver web content, such as web pages, videos, and other digital assets, to users with high performance and low latency. This is the one of the most popular CDN used across the world.

It is a cloud-based service that caches and distributes content across its vast network of servers strategically located in data centers around the world. It optimizes content delivery by routing user requests to the nearest server, reducing latency and enhancing website performance.

Akamai, Cloudflare, and AWS CloudFront are all popular Content Delivery Network (CDN) services, each with its own strengths and weaknesses.

Akamai

Akamai Hosting Akamai Logo Company Openings Job User Freshers Interface ...

Pros: Extensive network with over 240,000 servers worldwide, advanced security features, efficient content offloading, good page caching, and quick rollback.

Cons: Complex pricing structure, setup can be complicated for beginners, and some users report having difficulties navigating the interface.

Performance: In one analysis of CDN throughput, Akamai was roughly 14% faster than CloudFront.

AWS CloudFront

AWS 어렵지 않아요 - CloudFront 편

Pros: Seamless integration with other AWS services, pay-as-you-go pricing model, secure content hosting at no extra fee.

Cons: Costs can add up quickly for high traffic sites, limited network compared to other CDNs, learning curve for newbie users.

Integration: If you are using other AWS services, then no other CDN can compete with AWS CloudFront.

Cloudflare

Cloudflare Review 2021 – A Real User’s Insights - Cloudzat

Pros: Integrated Cloudflare CDN in all plans, fast and reliable global content delivery, easy setup and management, improves website loading speed, protects your website from all kinds of attacks.

Cons: Convoluted user interface, relatively expensive.

In conclusion, Akamai is particularly strong for demanding packages like video streaming due to its international reach, superior capabilities, and strong safety. On the other hand, for businesses already invested in the AWS environment, CloudFront offers a cost-effective and easily managed solution for content delivery within its network coverage. Cloudflare is known for its integrated CDN in all plans and strong focus on security. The choice between the three depends on your specific needs and requirements.`,
  },
];
