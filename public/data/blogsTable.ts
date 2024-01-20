export const blogsTable = [
  {
    content: {
      time: 1705652596315,
      blocks: [
        {
          id: "P3_EbW9SoL",
          type: "paragraph",
          data: {
            text: 'We&nbsp;<a target="_blank" href="https://engineering.hashnode.com/the-art-of-feed-curating-our-approach-to-generating-personalized-feeds-that-match-users-interests">previously explained</a>&nbsp;how we calculate the Hashnode Feed and select content and metadata for each user. We found that the feed now displays improved and personalized content. However, we did find two issues in the implementation:',
          },
        },
        {
          id: "Jkliu-p-kk",
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Performance: The Feed calculation is not trivial; thus, it slows down the access to our main page.",
              "Security: Many expensive queries and aggregations are needed to gather all the data required for the calculation. Safeguarding our database from excessive usage is a must.",
            ],
          },
        },
        {
          id: "LgbNtDP0i9",
          type: "paragraph",
          data: {
            text: "Speeding up the page, keeping our databased safe, and showing the freshest content for you on the Hompage was the inspiration for building Feeds on steroids: a scalable and serverless architecture to pre-calculate feeds for recurring users 💊",
          },
        },
        {
          id: "i-m95mfhBj",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1701676684074/b5095a33-6ce7-4119-8a9b-78acc6afe43a.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "lQzHQCsfP7",
          type: "paragraph",
          data: {
            text: "To optimize page speed, we found that pre-calculating feeds for users is the best option. This means we don't have to calculate the feed every time a user visits our feed page. Instead, we can return the feed from the cache and make page loading times faster. A crucial enabler for this is using a cache. With the fast access a cache offers, we can directly load the feed from there to be presented for our users. The above image shows this in a very high abstraction. We are calculating feeds using data from our internal database and a cache for relevant metadata. The calculated data is then stored in a cache for quick access.",
          },
        },
        {
          id: "FCIycprY0G",
          type: "paragraph",
          data: {
            text: "Let's take a look at how everything comes together in detail ⬇️",
          },
        },
        {
          id: "bkiL1U9Led",
          type: "header",
          data: {
            text: "Pre-calculating feeds for thousands of users with AWS Step Functions 😎",
            level: 2,
          },
        },
        {
          id: "ACG39VvDrG",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1701675809464/e1fe24b7-4c14-4fd3-8499-7dad71d9abbb.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "7GW-9iKl_G",
          type: "paragraph",
          data: {
            text: "We calculate the feed for each user based on internal Hashnode events. These events require a re-calculation of the feeds. An example here is publishing a new post on Hashnode.",
          },
        },
        {
          id: "UCx7v2ecIu",
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Prepare the cache: Before we start calculating each feed, we must ensure that all data required is in the cache. The final calculation step is wholly based on the cache. This includes user metadata, relevant data for posts, and active users for whom we are pre-calculating. If data is unavailable in the cache or too old for usage, we pull fresh data from our internal database.",
              "Calculate the feed: We start the actual calculation when all data is prepared and ready in the cache. We use an AWS Step Function feature called distributed map execution to do this in parallel. We can calculate multiple feeds simultaneously and reduce execution time. Each calculation has its own AWS Lambda function.",
            ],
          },
        },
        {
          id: "R1ziqh5Psh",
          type: "paragraph",
          data: {
            text: "If each user's feed would be calculated on the fly, we would see longer loading times on Hashnode's main page. To do the calculation, we need a lot of data. We must get all the data from the database. This will affect other queries. Lastly, a simple approach like that seems wasteful. We are pulling in the same data again and again for the calculation without reusing it.",
          },
        },
        {
          id: "3s5DVnGt9U",
          type: "paragraph",
          data: {
            text: "The above architecture reference shows the feed pre-calculation process. We utilize a couple of services to achieve a performant recalculation on various triggers:",
          },
        },
        {
          id: "ab7CK6mLx8",
          type: "list",
          data: {
            style: "unordered",
            items: [
              "AWS Lambda",
              "AWS Step Functions",
              "Redis Cache",
              "Distributed Maps in Step Functions",
              "Amazon EventBridge",
            ],
          },
        },
        {
          id: "UXPoYU1BHx",
          type: "paragraph",
          data: {
            text: "Once an event that requires feed re-calculation reaches the AWS Step Function, we will run different checks and collect the necessary data. A new feed for each active user on our platform is then generated. We minimize database access and store necessary data in a cache for fast access. Utilizing our event-driven architecture allows us to react to different events within the system and keep the cache up-to-date.",
          },
        },
        {
          id: "URy98KmRnI",
          type: "paragraph",
          data: {
            text: "Let's look at the core parts and what's happening there.",
          },
        },
        {
          id: "wFEkxPogPo",
          type: "header",
          data: {
            text: "Preparing data in the cache",
            level: 3,
          },
        },
        {
          id: "sGOfTsZRLf",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1701270335460/57af6b77-a4d0-454b-809b-f083e581d2ed.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "Rex8LqdjfB",
          type: "paragraph",
          data: {
            text: "When an event triggers an AWS Step Function, we must have all the required data for the calculation step. The first step is to check if the cache has valid data. If not, fill it. The main data for feed calculation are posts. The first AWS Lambda in the AWS Step Function execution will check if we have valid data in the cache for the posts we base our calculation on. Valid in this context refers to data that is not outdated and available in the cache.",
          },
        },
        {
          id: "J-nwp3UxX7",
          type: "paragraph",
          data: {
            text: "Once this is resolved, we can go to the next ingredient for calculation: getting the active users. When no active user is found, we skip the further execution altogether.",
          },
        },
        {
          id: "g6jguqUh9c",
          type: "paragraph",
          data: {
            text: "Based on the active users, we can now check if the personalization component, the user's metadata, is available in the cache. If metadata is found, we can directly calculate the feed. Otherwise, we have to collect the metadata beforehand from the database and save it to the cache.",
          },
        },
        {
          id: "KYaklHv53X",
          type: "paragraph",
          data: {
            text: 'These last two steps are done by utilizing&nbsp;<a target="_blank" href="https://docs.aws.amazon.com/step-functions/latest/dg/use-dist-map-orchestrate-large-scale-parallel-workloads.html">distributed maps</a>. One map for users whom we have found valid metadata in our cache. One for users where no metadata data was found, and we need to collect it before starting the actual calculation',
          },
        },
        {
          id: "YEIPsl1YPG",
          type: "header",
          data: {
            text: "Distributed map for users where metadata is available",
            level: 3,
          },
        },
        {
          id: "6ZlwApQkmW",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1701270466651/8c1223e0-ee2e-4a02-8679-39b606dd10ba.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "nP_MAZI1qn",
          type: "paragraph",
          data: {
            text: "We find valid metadata for a user. The previous steps of our AWS Step Function provided all the required data. We can now start calculating the user's feed directly. Notice how no database is involved in this step anymore.",
          },
        },
        {
          id: "VvU-sYmG5N",
          type: "header",
          data: {
            text: "Distributed map for users where metadata is not available",
            level: 3,
          },
        },
        {
          id: "CrtwlFD5le",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1701270435343/37161cbd-b9f6-49d6-9ad8-ca9d5e870ca2.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "p8pL_yazTw",
          type: "paragraph",
          data: {
            text: "No metadata found for the user requires us to prepare it before starting the calculation. A preceding AWS Lambda function handles this before the actual calculation is done. The database is queried to collect the user's metadata, and the result is stored in our cache. Again, the calculation step does not require any database connection to do its job.",
          },
        },
        {
          id: "eb04bqM9-H",
          type: "paragraph",
          data: {
            text: "The two distributed maps share the same final step of the feed calculation. Once succeeded, we save the result, the user's feed, in the cache for fast access via our APIs. To make the process faster and use less bandwidth, we use item batching in the AWS Step Function. This allows us to share post data with the items in the same batch. We would have to get the post data and metadata information for each user otherwise.",
          },
        },
        {
          id: "H900Ec8IOY",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1699864467563/5db1457e-34da-484f-acf3-36c71ef0753c.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "y43kqPP4dE",
          type: "paragraph",
          data: {
            text: "A typical AWS Step Function run has a duration of ~26 seconds - while calculating the feed for thousands of users 🚀",
          },
        },
        {
          id: "JO5At4Zf_D",
          type: "header",
          data: {
            text: "Getting rid of stale data - Purging and re-calculating feeds on a period",
            level: 2,
          },
        },
        {
          id: "CvTqwWRfJ1",
          type: "paragraph",
          data: {
            text: "We decided to purge the whole cache regularly, even though we have implemented householding for our cache. We also have various steps in the AWS Step Function that validate cache data before the calculation is done.",
          },
        },
        {
          id: "1L6HFUq-TT",
          type: "paragraph",
          data: {
            text: "A cron job runs the AWS Step Function every couple of hours to delete all data in the cache. This is a safety measure and reassurance that we only store essential data briefly. We can ignore events that may affect the feed for a longer time. The updates from these events will be included after the next purge. This is a nice bonus. This saves some implementation effort for low-priority events regarding feed re-calculation. The AWS Step Function will refill the cache when the feed is empty.",
          },
        },
        {
          id: "mJHf3_4c-4",
          type: "header",
          data: {
            text: "Final words",
            level: 2,
          },
        },
        {
          id: "kDk8rHjXg9",
          type: "paragraph",
          data: {
            text: "This post should give you a rough idea of calculating feeds on the scale and which services we apply. Are you interested in more feed-related content? If so, let us know in the comments - we have a couple more crips implementation details ready to be published 🙌",
          },
        },
        {
          id: "seG2Uegq65",
          type: "paragraph",
          data: {
            text: "Cheers 🙌",
          },
        },
      ],
      version: "2.28.2",
    },
  },
  {
    content: {
      time: 1705723209281,
      blocks: [
        {
          id: "5x1uU4PZBk",
          type: "paragraph",
          data: {
            text: 'One essential feature of any blogging platform is the ability to schedule posts for publication. Hashnode&nbsp;<a target="_blank" href="https://townhall.hashnode.com/introducing-article-scheduling-feature-for-all-hashnode-blogs">introduced</a>&nbsp;this functionality in June 2022.',
          },
        },
        {
          id: "4cEaiJ8L2_",
          type: "paragraph",
          data: {
            text: "At that time, the entire feature was based on a CRON job. This CRON job managed all various states and published the post. The CRON job was running every minute to ensure that scheduled posts were published.",
          },
        },
        {
          id: "d0n3idknoq",
          type: "paragraph",
          data: {
            text: "There were certain cons associated with the CRON job:",
          },
        },
        {
          id: "ZnBohZ06mP",
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Unnecessary computation: The CRON job ran even if no posts were scheduled at that time.",
              "Observability: Each execution of the CRON job produced logs and traces. It was quite hard to understand if and how many posts were scheduled at a certain time.",
              "Error Handling: Error handling was quite hard. If one post failed to be published we couldn't let the whole processing Lambda fail. Alerting needed special functionalities to handle that.",
            ],
          },
        },
        {
          id: "qwhwot9RkX",
          type: "paragraph",
          data: {
            text: 'With the&nbsp;<a target="_blank" href="https://aws.amazon.com/blogs/compute/introducing-amazon-eventbridge-scheduler/">launch of EventBridge Scheduler</a>&nbsp;in 2022 we instantly knew that scheduling posts is a perfect use-case for that.',
          },
        },
        {
          id: "mZwnp4BIHu",
          type: "header",
          data: {
            text: "EventBridge Scheduler",
            level: 2,
          },
        },
        {
          id: "u5pGxAEExR",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1704987466311/ce7b0d1a-b34a-4b14-b42f-8184e7e94136.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "IhrkbzfKjy",
          type: "paragraph",
          data: {
            text: "EventBridge scheduler is a feature of EventBridge that allows users to schedule tasks at precise times. You can schedule a task that will be executed once at an exact time.",
          },
        },
        {
          id: "_sNBzTx3Hc",
          type: "paragraph",
          data: {
            text: "The same targets are supported as for EventBridge, such as:",
          },
        },
        {
          id: "ffIwMG2-5r",
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Lambda",
              "SQS",
              "SNS",
              "Step Functions",
              "... and many more!",
            ],
          },
        },
        {
          id: "MXQ7Dt36Et",
          type: "header",
          data: {
            text: "Scheduling Posts with EventBridge Scheduler",
            level: 2,
          },
        },
        {
          id: "dxsAeeFgR5",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1705318104814/2df1d43f-f273-469f-916b-71c410841539.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "cgxsLW867k",
          type: "paragraph",
          data: {
            text: "Let's see how we have implemented the scheduling of posts with the scheduler.",
          },
        },
        {
          id: "-_6T6-bKA3",
          type: "header",
          data: {
            text: "EventBridge Scheduling Basics",
            level: 3,
          },
        },
        {
          id: "v29e_e7eYD",
          type: "paragraph",
          data: {
            text: "Before we worked on any API integrations we first created a few resources we needed to share with our API:",
          },
        },
        {
          id: "zQVG1erOkm",
          type: "list",
          data: {
            style: "ordered",
            items: [
              "EventBridge Scheduling Group",
              "Lambda Consumer with DLQ (consumer errors)",
              "SQS Dead-Letter-Queue (server-side errors)",
              "IAM Role",
            ],
          },
        },
        {
          id: "HHHDHM614-",
          type: "paragraph",
          data: {
            text: '☝Hashnode uses two different CDK apps. One for all asynchronous workloads in plain&nbsp;CDK. And another one with&nbsp;<a target="_blank" href="https://sst.dev/">SST</a>for our synchronous APIs. Data needs to be shared via SSM parameters.',
          },
        },
        {
          id: "aKwC_nOS-1",
          type: "header",
          data: {
            text: "EventBridge Scheduling Group",
            level: 4,
          },
        },
        {
          id: "DVFyn6GC9H",
          type: "paragraph",
          data: {
            text: "For improving the overview of schedules it is recommended to create schedule groups. It is easier to filter your schedules based on these. We have created one group with the name:&nbsp;<code>SchedulePublishDraft</code>.",
          },
        },
        {
          id: "lzI5IboKz8",
          type: "paragraph",
          data: {
            text: "COPY",
          },
        },
        {
          id: "CHEO89zviK",
          type: "code",
          data: {
            code: "new CfnScheduleGroup(this, 'SchedulePublishDraft');\n",
          },
        },
        {
          id: "Lt86x1v77H",
          type: "paragraph",
          data: {
            text: "This group needs to be supplied once the schedule is created.",
          },
        },
        {
          id: "qaxXTjJ4Pb",
          type: "header",
          data: {
            text: "Lambda Consumer",
            level: 4,
          },
        },
        {
          id: "EbO57vfTVH",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1704878313368/5b6495a6-219b-4d57-b9a9-738f2631fcc0.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "JSnCzitKmt",
          type: "paragraph",
          data: {
            text: "Next, we need a Consumer for our EventBridge Schedule. The schedule is scheduled for a specific time. Once this time is reached a target consumer is called.",
          },
        },
        {
          id: "4Zcy93rnZ_",
          type: "paragraph",
          data: {
            text: "We use AWS Lambda for that. The Lambda function will be called&nbsp;asynchronously. The asynchronous call gives us the ability to use Lambda Destinations. You have two types of Lambda Destinations:",
          },
        },
        {
          id: "l_H8WHWJM3",
          type: "list",
          data: {
            style: "unordered",
            items: [
              "onSuccess: This is called once the Lambda succeeds",
              "onFailure: This is called once the Lambda fails",
            ],
          },
        },
        {
          id: "LaVa81edsJ",
          type: "paragraph",
          data: {
            text: "We make use of the&nbsp;<code>onFailure</code>&nbsp;destination. Once the Lambda function encounters some error and fails, we retry the event two times. If it still fails we send it to a Dead-Letter-Queue (DLQ).",
          },
        },
        {
          id: "Q8adqBAB8o",
          type: "paragraph",
          data: {
            text: "The Lambda function executes the business logic (publishing the post, and updating some database states).",
          },
        },
        {
          id: "GJmxSnEZ58",
          type: "paragraph",
          data: {
            text: "🚧Remember:Your EventBridge consumer needs to be idempotent. If not it can (and will happen) that your consumer is executed twice. Which could result in duplicated post publishes.",
          },
        },
        {
          id: "V2eYfS9rNX",
          type: "header",
          data: {
            text: "Scheduling DLQ (server-side errors)",
            level: 4,
          },
        },
        {
          id: "H-G9cg3gFK",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1704878120894/877ce59a-c6b4-44d8-b5ad-d3da86c63e78.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "psqqEJu1I3",
          type: "paragraph",
          data: {
            text: "There is a second DLQ we need to supply in our creation of the EventBridge schedule. This DLQ handles all&nbsp;server-side errors&nbsp;like missing IAM permissions or Lambda API outages.",
          },
        },
        {
          id: "r9ALhM_UiB",
          type: "paragraph",
          data: {
            text: "We now have two DLQs in place:",
          },
        },
        {
          id: "IMUxqc4c86",
          type: "list",
          data: {
            style: "ordered",
            items: [
              "The first one is for server-side errors. For example: Missing IAM policies or when the Lambda API is down",
              "The second one is for consumer errors. In case the Lambda function fails, the event will be retried two times and after that sent to a DLQ.",
            ],
          },
        },
        {
          id: "8TkGH6ClpF",
          type: "paragraph",
          data: {
            text: "In this section, we are talking about the&nbsp;first&nbsp;one. This one is needed to supply while creating the schedule.",
          },
        },
        {
          id: "_Kw8B6_q-3",
          type: "paragraph",
          data: {
            text: "We create this DLQ with CDK as well and share it via a parameter:",
          },
        },
        {
          id: "OTZcn-HpyL",
          type: "paragraph",
          data: {
            text: "COPY",
          },
        },
        {
          id: "IEIb2QlzOW",
          type: "code",
          data: {
            code: "\nconst dlqScheduler = new MonitoredDeadLetterQueue(this, 'SchedulerDlq');\n\nthis.scheduleDeadLetterArn = dlqScheduler.queueArn;\n\nnew StringParameter(this, 'EventBridgeSchedulerDLQArn', {\n  stringValue: this.scheduleDeadLetterArn,\n  parameterName: `/${envName}/infra/schedulePublishDraft/schedulerDeadLetterQueueArn`\n});\n",
          },
        },
        {
          id: "ivIimq-h-m",
          type: "paragraph",
          data: {
            text: "This gives us the ability to use the parameter in the second API CDK app.",
          },
        },
        {
          id: "04_cvncQAV",
          type: "header",
          data: {
            text: "IAM Role",
            level: 4,
          },
        },
        {
          id: "ATT3KXj4vY",
          type: "paragraph",
          data: {
            text: "While creating the schedule you need to supply an IAM Role ARN. This role is used for executing the schedule.",
          },
        },
        {
          id: "OOWpDJjIVv",
          type: "paragraph",
          data: {
            text: "This is the CDK code we are using:",
          },
        },
        {
          id: "1yntogNOSd",
          type: "paragraph",
          data: {
            text: "COPY",
          },
        },
        {
          id: "1N5epD6GJ5",
          type: "code",
          data: {
            code: "this.role = new Role(this, 'RevokeProAccessPublicationRole', {\n  assumedBy: new ServicePrincipal('scheduler.amazonaws.com')\n});\n\nthis.postPublishLambda.grantInvoke(this.role);\n\n\nnew StringParameter(this, 'TargetRoleArn', {\n  stringValue: this.role.roleArn,\n  parameterName: `/${envName}/infra/schedulePublishDraft/targetRoleArn`\n});\n",
          },
        },
        {
          id: "ZHpx4QC_J3",
          type: "paragraph",
          data: {
            text: "We create a role that can be assumed by the scheduler service. We then grant the invoke permissions for one Lambda to this role and save it as a string parameter in SSM.",
          },
        },
        {
          id: "H5iVFGyYiM",
          type: "header",
          data: {
            text: "CRUD Operations",
            level: 3,
          },
        },
        {
          id: "ugiMKsyc7E",
          type: "paragraph",
          data: {
            text: 'One of the main things we needed to think about is how we want to&nbsp;Create,&nbsp;Update, and&nbsp;Delete the schedules. Hashnode uses a&nbsp;<a target="_blank" href="https://gql.hashnode.com/">GraphQL API</a>. We have had several mutations for handling schedules already (yes the naming can be quite hard with posts and drafts...):',
          },
        },
        {
          id: "kFDxFRbY6D",
          type: "list",
          data: {
            style: "unordered",
            items: ["scheduleDraft", "reschedulePost", "cancelScheduledPost"],
          },
        },
        {
          id: "mZcsyx9gSm",
          type: "paragraph",
          data: {
            text: "These operations handled the creation of documents in our database. Each of these mutation need to handle the EventBridge schedule CRUD operation.",
          },
        },
        {
          id: "3uSjXdmWjd",
          type: "header",
          data: {
            text: "Schedule Drafts",
            level: 3,
          },
        },
        {
          id: "-lTEV91gk8",
          type: "paragraph",
          data: {
            text: "Scheduling a draft needs to create the EventBridge schedule. We have our own package in our monorepo called&nbsp;<code>@hashnode/scheduling</code>. This package abstracts the calls to EventBridge and allows us to type it more precisely for our needs.",
          },
        },
        {
          id: "KdmBtDksnG",
          type: "paragraph",
          data: {
            text: "For publishing a draft we only need to call the function&nbsp;<code>schedulePublishDraftScheduler()</code>&nbsp;and everything else is abstracted. The function will",
          },
        },
        {
          id: "IxCpjqWD4N",
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Parse incoming data with&nbsp;zod",
              "Creates the&nbsp;CreateScheduleCommand",
              "Sends the command to EventBridge to create the schedule",
            ],
          },
        },
        {
          id: "dPjy79_cfq",
          type: "paragraph",
          data: {
            text: "The create command looks like this:",
          },
        },
        {
          id: "svDAp6SvuA",
          type: "paragraph",
          data: {
            text: "COPY",
          },
        },
        {
          id: "rVYq1aBAjc",
          type: "code",
          data: {
            code: "const command = new CreateScheduleCommand({\n  Name: createName({\n    draftId\n  }),\n  GroupName: groupName,\n  ScheduleExpression: `at(${formattedDate})`,\n  ScheduleExpressionTimezone: 'UTC',\n  Target: {\n    Arn: targetArn,\n    RoleArn: targetRoleArn,\n    Input: JSON.stringify(schedulerPayload),\n    DeadLetterConfig: {\n      Arn: deadLetterArn\n    }\n  },\n  FlexibleTimeWindow: { Mode: 'OFF' },\n  ActionAfterCompletion: 'DELETE'\n});\n",
          },
        },
        {
          id: "WGJCFSciCw",
          type: "paragraph",
          data: {
            text: "The name of each schedule should be unique (no drafts can be scheduled twice). The name follows this pattern:",
          },
        },
        {
          id: "g0t9BSdkdS",
          type: "paragraph",
          data: {
            text: "COPY",
          },
        },
        {
          id: "65E3jepstK",
          type: "code",
          data: {
            code: "`SchedulePublishDraft-${draftId.toString()}`\n",
          },
        },
        {
          id: "VZZtmHh6Wf",
          type: "paragraph",
          data: {
            text: "The&nbsp;<code>Target</code>&nbsp;input object shows you all the data we have created before:",
          },
        },
        {
          id: "_cJmt2f-w1",
          type: "list",
          data: {
            style: "ordered",
            items: [
              "Arn:&nbsp;ARN of the Lambda function that executes the business logic",
              "RoleArn:&nbsp;The ARN of the Role",
              "DeadLetterConfig.Arn:&nbsp;The ARN of the DLQ for server-side errors",
            ],
          },
        },
        {
          id: "5YNLAtu2YC",
          type: "paragraph",
          data: {
            text: "We also set the flag&nbsp;<code>ActionAfterCompletion</code>&nbsp;to&nbsp;<code>DELETE</code>&nbsp;to make sure each schedule is removed after it runs successfully.",
          },
        },
        {
          id: "OvXU0w3Bha",
          type: "header",
          data: {
            text: "Reschedule Drafts &amp; Cancel Schedules",
            level: 3,
          },
        },
        {
          id: "644uQHB3Gy",
          type: "paragraph",
          data: {
            text: "Rescheduling and canceling scheduled drafts follows the same procedure as creating them. In rescheduling, we make sure that the date is valid. We update the schedule.",
          },
        },
        {
          id: "q27xkmH4h-",
          type: "paragraph",
          data: {
            text: "For canceling schedules we simply remove the schedule from EventBridge.",
          },
        },
        {
          id: "R3Jm4NuIwV",
          type: "header",
          data: {
            text: "Results after that",
            level: 2,
          },
        },
        {
          id: "ZyJ4SCu4RL",
          type: "paragraph",
          data: {
            text: "We've deployed everything on production without any issues. A very minimal migration was needed to create schedules for all existing drafts.",
          },
        },
        {
          id: "-aXA0ZxySh",
          type: "paragraph",
          data: {
            text: "Now, if one post publish fails we get alerted immediately with exactly the post that failed.",
          },
        },
        {
          id: "M57wb-giOc",
          type: "paragraph",
          data: {
            text: "The development and integration of using EventBridge Schedules for use cases like this are straightforward. The benefits of simplicity we have are immense.",
          },
        },
        {
          id: "X0s5YMZbJM",
          type: "header",
          data: {
            text: "Summary",
            level: 2,
          },
        },
        {
          id: "YT3E2-tv0-",
          type: "paragraph",
          data: {
            text: "This post should show you how easy it can be to leverage the managed services of AWS for features like that. The scheduling stack costs 1ct per month at the moment.",
          },
        },
        {
          id: "ZuQM7NXQI7",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1704879242633/7505d1dc-fffc-49af-b3dc-b1e376ffe03a.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "VLDf3lbeUU",
          type: "paragraph",
          data: {
            text: "One alternative approach for tackling this issue of the CRON job would have been to use SQS and partial batch failures. However, the EventBridge scheduling approach is much more simple.&nbsp;And simple is king.",
          },
        },
        {
          id: "OCJGKegOTQ",
          type: "header",
          data: {
            text: "Resources",
            level: 2,
          },
        },
        {
          id: "LRcTHKTPr3",
          type: "paragraph",
          data: {
            text: '<a target="_blank" href="https://hashnode.com/">Hashnode</a>',
          },
        },
        {
          id: "w1O7fbK5SD",
          type: "paragraph",
          data: {
            text: '<a target="_blank" href="https://discord.gg/hashnode">Join our Discord Server</a>',
          },
        },
      ],
      version: "2.28.2",
    },
  },
  {
    content: {
      time: 1705723428890,
      blocks: [
        {
          id: "pWcEnyVQs5",
          type: "header",
          data: {
            text: "Handling Events the React way:",
            level: 2,
          },
        },
        {
          id: "NrFqNnBWBA",
          type: "paragraph",
          data: {
            text: "React lets you add&nbsp;event handlers&nbsp;to your JSX. Event handlers are your own functions that will be triggered in response to interactions like clicking, hovering, focusing form inputs, and so on. For this concept about responding to events I will be using the React documentation.",
          },
        },
        {
          id: "kpEazg2CpN",
          type: "paragraph",
          data: {
            text: "First I am going to create a simple steps component to explain a bit.🙂👇",
          },
        },
        {
          id: "YSLrYxODnF",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1705531964236/fcee4f83-cc55-4ac4-9594-b0824e706336.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "kDJ8OQUfkz",
          type: "header",
          data: {
            text: "Adding event handlers:",
            level: 2,
          },
        },
        {
          id: "ssxhGQw9m-",
          type: "paragraph",
          data: {
            text: "To add an event handler, you will first define a function and then pass it as props to the appropriate JSX tag. For example, the previous and next buttons in the image below have no functionality. Let's change that in three steps! 💪 First, this is what our&nbsp;<code>&lt;button&gt;</code>&nbsp;JSX file looks like, with only the&nbsp;<code>className</code>&nbsp;and&nbsp;inline styles&nbsp;at Line 19 and 25 👇.\"",
          },
        },
        {
          id: "WE3b5fDkDL",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1705532834048/b4a7cf29-be55-458e-8c6e-265bee3e791d.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "iyIwsykxJg",
          type: "paragraph",
          data: {
            text: "So three steps :",
          },
        },
        {
          id: "vWNIG5iIt5",
          type: "list",
          data: {
            style: "ordered",
            items: [
              "Create two functions called&nbsp;handlePrevious&nbsp;and&nbsp;handleNext&nbsp;inside&nbsp;the App component.",
              "Implement a logic inside that function (use&nbsp;alert&nbsp;to show the message for previous and next respectively).",
              "And lastly, add&nbsp;onClick={handlePrevious}&nbsp;and&nbsp;onClick={handleNext}&nbsp;to the&nbsp;&lt;button&gt;&nbsp;JSX.",
            ],
          },
        },
        {
          id: "xd24I4XFxF",
          type: "paragraph",
          data: {
            text: "See step 1, 2 and 3👇👌.",
          },
        },
        {
          id: "EfbHUDHjsP",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1705533751196/f5daf102-53b4-4466-a0d5-0b02519bd4d8.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "Edl5jbd8FJ",
          type: "paragraph",
          data: {
            text: "See results when I click on the previous button👇",
          },
        },
        {
          id: "otS0lRD7Ar",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1705533832398/ace30166-8ee3-4182-90f6-3126505c1758.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "CDj3ABnSvx",
          type: "paragraph",
          data: {
            text: "Here I defined the&nbsp;<code>handlePrevious</code>&nbsp;and&nbsp;<code>handleNext</code>&nbsp;function and then passed it as props to&nbsp;<code>&lt;button&gt;</code>&nbsp;. Alternatively you can define the event handler inside of the JSX 👇",
          },
        },
        {
          id: "5EfLK8Q3sZ",
          type: "paragraph",
          data: {
            text: "<code>&lt;button onClick={function handlePrevious() {</code>",
          },
        },
        {
          id: "CQF8kCgcL_",
          type: "paragraph",
          data: {
            text: "<code>alert('Previous');</code>",
          },
        },
        {
          id: "DE4MyHq1Hf",
          type: "paragraph",
          data: {
            text: "<code>}}&gt;</code>",
          },
        },
        {
          id: "kftLgWMPZ6",
          type: "paragraph",
          data: {
            text: "Or with the arrow function👇👇",
          },
        },
        {
          id: "zTsP0sN9C8",
          type: "paragraph",
          data: {
            text: "<code>&lt;button onClick={() =&gt; {alert('Previous')}}&gt;</code>",
          },
        },
        {
          id: "9PH5nsGolt",
          type: "paragraph",
          data: {
            text: "Note: All of these styles are equivalent. Inline event handlers are convenient for short functions.",
          },
        },
        {
          id: "IS8afyWZhl",
          type: "header",
          data: {
            text: "Things to take note of when adding event handlers:",
            level: 3,
          },
        },
        {
          id: "RNdDxKIG4w",
          type: "paragraph",
          data: {
            text: "Functions passed to event handlers must be passed, not called. Let's create two examples and the first will be what passing a function looks like and the second will be calling a function ❌👇",
          },
        },
        {
          id: "ks9WJj07-Z",
          type: "paragraph",
          data: {
            text: "First ✔&nbsp;-&nbsp;Passing function&nbsp;:&nbsp;<code>&lt;button onClick={handlePrevious}&gt;</code>",
          },
        },
        {
          id: "ARZYHM2bBs",
          type: "paragraph",
          data: {
            text: "Second❌&nbsp;-&nbsp;Calling function&nbsp;:&nbsp;<code>&lt;button onClick={handlePrevious()}&gt;</code>",
          },
        },
        {
          id: "U_lIQbi4zr",
          type: "paragraph",
          data: {
            text: "Now the difference between these two is that In the first example, the&nbsp;<code>handlePrevious</code>&nbsp;function is passed as an&nbsp;<code>onClick</code>&nbsp;event handler. This tells React to remember it and only call your function when the user clicks the button.",
          },
        },
        {
          id: "hHRJKYMDx9",
          type: "paragraph",
          data: {
            text: 'In the second example, the&nbsp;<code>()</code>&nbsp;at the end of&nbsp;<code>handlePrevious()</code>&nbsp;fires the function&nbsp;immediately&nbsp;during rendering, without any clicks. This is because JavaScript inside the JSX&nbsp;<code>{</code>&nbsp;and&nbsp;<a target="_blank" href="https://react.dev/learn/javascript-in-jsx-with-curly-braces"><code>}</code></a>&nbsp;executes right away.',
          },
        },
        {
          id: "MsmsXXYtkQ",
          type: "paragraph",
          data: {
            text: "Remember here👆👆 we already defined the function before passing it. So now what if we want to try other alternative like defining the function in the JSX🤔🤔💭. 👇",
          },
        },
        {
          id: "nMvX9zxX6R",
          type: "paragraph",
          data: {
            text: "Wrong❌&nbsp;- This alert fires when the component renders, not when clicked!",
          },
        },
        {
          id: "wV7xYlbwX0",
          type: "paragraph",
          data: {
            text: "<code>&lt;button onClick={alert('Previous')}&gt;</code>",
          },
        },
        {
          id: "zKCgNYX_49",
          type: "paragraph",
          data: {
            text: "Correct&nbsp;✔- If you want to define your event handler inline, wrap it in an anonymous function like so👇.",
          },
        },
        {
          id: "qTE6iP-Q4C",
          type: "paragraph",
          data: {
            text: "<code>&lt;button onClick={() =&gt; alert('Previous')}&gt;</code>",
          },
        },
        {
          id: "lk94ctHsGX",
          type: "paragraph",
          data: {
            text: "In Conclusion:",
          },
        },
        {
          id: "wVioHwAlwQ",
          type: "list",
          data: {
            style: "unordered",
            items: [
              "&lt;button onClick={handlePrevious}&gt;&nbsp;passes the&nbsp;handlePrevious&nbsp;function.✔",
              "&lt;button onClick={() =&gt; alert('handleNext')}&gt;&nbsp;passes the&nbsp;() =&gt; alert('handleNext')&nbsp;function.✔",
              "There are also different event handlers like&nbsp;onMouseOver&nbsp;and&nbsp;onMouseOut, among others.",
            ],
          },
        },
        {
          id: "5pvNqc33rn",
          type: "header",
          data: {
            text: "Passing event handlers as props",
            level: 3,
          },
        },
        {
          id: "RBuOrOLi5l",
          type: "paragraph",
          data: {
            text: "Just as we pass props from parent to child components, we can also pass event handlers. Now, I'll try to simplify this because React documentation almost made my brain vanish! 😢🤣",
          },
        },
        {
          id: "zgjb2PlPev",
          type: "paragraph",
          data: {
            text: 'Let\'s say we want to move the previous and next button elements from the&nbsp;<code>App</code>&nbsp;component and create a separate component for them. However, we still want to trigger&nbsp;<code>alert("previous")</code>&nbsp;when clicking on the previous button and&nbsp;<code>alert("next")</code>&nbsp;when clicking on the next button. 👇👇 Now, remember our previous steps. 👇"',
          },
        },
        {
          id: "fettUzrwCb",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1705540876890/6fa8d892-572b-4bf3-b7a3-9eed1653a8e4.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "zv1ht5mcVJ",
          type: "paragraph",
          data: {
            text: "Since we've extracted the button JSX with the event handler from step 3 and created a new component for both buttons, we now need to figure out how to pass the function created in step 1, along with the logic added to the function in step 2, to the new components from the&nbsp;<code>App</code>&nbsp;component. Are you following? 🤔 Take a look at the new components I've created and how I've used them in the&nbsp;<code>App</code>&nbsp;component, passing the event handlers as props. 👇👇",
          },
        },
        {
          id: "5adNe4aUyt",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1705540481511/049a0347-58fb-4ed7-a8d8-c1cdf3f5b5b1.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "11CHYwzlGA",
          type: "paragraph",
          data: {
            text: "This still works fine ✌ like when the&nbsp;<code>&lt;button&gt;</code>&nbsp;was still in the App component.👇",
          },
        },
        {
          id: "RR7sPtYnc4",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1705541255746/91cac810-6c8c-4399-b541-1da8e36ba4a9.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "Dkk3SK66Pb",
          type: "header",
          data: {
            text: "Naming event handler props",
            level: 3,
          },
        },
        {
          id: "WthfL0No5z",
          type: "paragraph",
          data: {
            text: "When it comes to naming event handler props in React, it's essential to follow a convention that is clear, descriptive, and consistent. This helps improve code readability and maintainability. Choose names that clearly indicate the purpose or action of the event. For example, if the event is handling a button click, a prop like&nbsp;<code>onClick</code>&nbsp;is more descriptive than something generic like&nbsp;<code>handlePrevious</code>. So, on lines 25 and 26, I may have playfully violated this rule a bit! 🤣👇👇",
          },
        },
        {
          id: "gOwcg8hRhZ",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1705543454704/d82c6930-25a1-410a-b99f-c7539e2e0b5f.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "FDQqbFidyU",
          type: "paragraph",
          data: {
            text: "Time to fix this🙆‍♀️👇. I hope It's right 🤔 at Line 25 and 26.",
          },
        },
        {
          id: "Q4N71srtIh",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1705543636620/e45d1a42-1d1b-4d71-a7e7-ce774aa1c731.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "XFUnVOEIN9",
          type: "paragraph",
          data: {
            text: "Other rules include starting the event handler prop name with 'on' to clearly indicate that it represents an event, using descriptive names, and following the camelCase convention for event handler prop names.",
          },
        },
        {
          id: "Jsg_ax68yM",
          type: "paragraph",
          data: {
            text: "Tomorrow, I'll try to make the Steps component functional. Wish me luck! 🎉🥰",
          },
        },
        {
          id: "qm-dMVuxuu",
          type: "paragraph",
          data: {
            text: "Thanks for reading. I'm going to learn some more CSS now. 🙆‍♀️🎉 Have a great day!.",
          },
        },
      ],
      version: "2.28.2",
    },
  },
  {
    content: {
      time: 1705723576845,
      blocks: [
        {
          id: "-9Blt0oYsI",
          type: "paragraph",
          data: {
            text: "In a NextJS app, when you visit a URL that is not available in your project, you will be redirected to a 404 page. This page comes default without any setup whatsoever. For many developers, this is quite enough but for those looking to add a custom look or maybe even have a button to redirect the user to another page, In this article, I'll walk you through the process on how to create a custom 404 page in NextJS.",
          },
        },
        {
          id: "-i_7cvvmF5",
          type: "paragraph",
          data: {
            text: 'According to the&nbsp;<a target="_blank" href="https://nextjs.org/docs/advanced-features/custom-error-page#404-page">Next docs</a>, a 404 page may be accessed very often, so server-rendering this page for every visit increases the load of the Next.js server. This can result in increased costs and slow experiences.',
          },
        },
        {
          id: "M00JR_rPAk",
          type: "paragraph",
          data: {
            text: "To avoid the above pitfalls, Next.js provides a static 404 page by default.",
          },
        },
        {
          id: "QGicpIvWZw",
          type: "paragraph",
          data: {
            text: "Here's a screenshot of what that page looks like:",
          },
        },
        {
          id: "TleGqqCUxt",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1658087660055/3SiS8ENBw.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "qozSFwILjx",
          type: "paragraph",
          data: {
            text: "There isn't much happening on this page as you can see, except that the color theme is dynamic, so if you're on dark mode, this page would be dark and vice-versa.",
          },
        },
        {
          id: "0i1lDRhNUQ",
          type: "header",
          data: {
            text: "Customizing the 404 page",
            level: 2,
          },
        },
        {
          id: "1sLYw4g_YX",
          type: "paragraph",
          data: {
            text: "Here's the&nbsp;TLDR&nbsp;version",
          },
        },
        {
          id: "UMv8kA0o5N",
          type: "paragraph",
          data: {
            text: "To create a custom 404 page create a&nbsp;<code>404.js</code>&nbsp;file inside the&nbsp;<code>pages</code>&nbsp;directory of your project. This automatically replaces the default 404 page that comes built-in. This page works the same way as a regular page in a NextJS app, so you can customize it anyhow you want, which is what we'll be doing in the next section.",
          },
        },
        {
          id: "jH_zXpC6la",
          type: "paragraph",
          data: {
            text: "Since we've created our&nbsp;<code>404.js</code>&nbsp;file, copy the markup below and paste it inside the file.",
          },
        },
        {
          id: "YPzD9HjRoq",
          type: "paragraph",
          data: {
            text: "COPYCOPY",
          },
        },
        {
          id: "MYIQSjeiSL",
          type: "code",
          data: {
            code: '// pages/404.js\nimport Head from "next/head";\nimport Link from "next/link";\nimport Image from "next/image";\nimport styles from "../styles/Error.module.css";\nimport ErrorImage from "../public/error.svg";\n\nexport default function Error() {\n  return (\n    <>\n      <Head>\n        <title>Oops! Page not found</title>\n      </Head>\n\n      <main className={styles.errorContainer}>\n        <Image\n          className={styles.image}\n          src={ErrorImage}\n          width={640}\n          height={220}\n          alt="error image"\n        />\n        <h1>404</h1>\n        <p>Opps! This page is lost in space.</p>\n\n        <Link href="/">\n          <a className={styles.btn}>Return home</a>\n        </Link>\n      </main>\n    </>\n  );\n}\n',
          },
        },
        {
          id: "MHpM7Obh-r",
          type: "paragraph",
          data: {
            text: "First, we imported a few components we'll be needing.",
          },
        },
        {
          id: "bkhbiWgY2I",
          type: "list",
          data: {
            style: "unordered",
            items: [
              'Head component from&nbsp;"next/head"&nbsp;for adding a title that will show up on the browser tab.',
              'Link component from&nbsp;"next/link"&nbsp;for wrapping our URL route to the homepage.',
              'Next\'s default&nbsp;Image&nbsp;component from&nbsp;"next/image"&nbsp;for declaring images.',
              "Our CSS file of course to style the error page and finally our hovering astronaut image.",
            ],
          },
        },
        {
          id: "2Mx1jYXGWm",
          type: "paragraph",
          data: {
            text: "Now in other to style this&nbsp;<code>404</code>&nbsp;page, we'll create the&nbsp;<code>Error.module.css</code>&nbsp;file we imported earlier into our&nbsp;<code>404</code>&nbsp;file inside the styles directory. Once created, paste the the following code:",
          },
        },
        {
          id: "zITnfyq9bk",
          type: "paragraph",
          data: {
            text: "COPYCOPY",
          },
        },
        {
          id: "u_J7qyBkKD",
          type: "code",
          data: {
            code: "/* styles/Error.module.css*/\n.errorContainer {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  max-width: 1200px;\n  min-height: 100vh;\n  margin: 0 auto;\n  padding: 1.5rem;\n}\n\n.errorContainer h1 {\n  font-size: 5rem;\n  font-weight: 700;\n  margin: 2rem 0 1rem;\n}\n\n.errorContainer p {\n  font-size: 1.3rem;\n  margin-bottom: 0.5rem;\n}\n\n.btn {\n  color: blue;\n  text-decoration: underline;\n}\n",
          },
        },
        {
          id: "UOv0aJM_eW",
          type: "paragraph",
          data: {
            text: "Here's a screenshot of what our&nbsp;<code>404</code>&nbsp;page looks like.",
          },
        },
        {
          id: "D8rQFKUdUd",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1658160597796/hOALK_4PO.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "vMy8Z3JfhX",
          type: "paragraph",
          data: {
            text: "And then with a little bit of animation, we can make the static image come alive.",
          },
        },
        {
          id: "yo6C6Y80CY",
          type: "paragraph",
          data: {
            text: "COPYCOPY",
          },
        },
        {
          id: "rpqcnLDRl-",
          type: "code",
          data: {
            code: "/* styles/Error.module.css*/\n\n.image {\n  animation: animate infinite 4s alternate ease-in-out;\n  transform-origin: 50% 50% 0px;\n}\n\n@keyframes animate {\n  from {\n    transform: translate3d(10px, -40px, 0px) rotate(0deg);\n  }\n\n  to {\n    transform: translate3d(25px, 10px, 10px) rotate(-5deg);\n  }\n}\n",
          },
        },
        {
          id: "81zb3XJXdq",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1658160236520/ydQTsSFbr.gif?auto=format,compress&amp;gif-q=60&amp;format=webm",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "cVJ0JAXOYH",
          type: "paragraph",
          data: {
            text: 'Inspiration for this 404 page is gotten from&nbsp;<a target="_blank" href="https://explorers.netlify.com/youareverygoodlooking?utm_source=blog&amp;utm_medium=404-cs&amp;utm_campaign=devex">Netlify\'s custom 404 page</a>',
          },
        },
        {
          id: "Jf7Rh6TCCG",
          type: "header",
          data: {
            text: "Conclusion",
            level: 2,
          },
        },
        {
          id: "cl5ikbOnfL",
          type: "paragraph",
          data: {
            text: "Having a custom 404 page in your app is not mandatory, and most developers just like to stick to the default. However, there are a few upsides to customizing it like, deciding where you want your visitors to go next, dropping pieces of information for your visitors to avoid losing traffic to your site, and even for style consistency.",
          },
        },
        {
          id: "uafxeS-sCA",
          type: "paragraph",
          data: {
            text: "The next time you start working on a NextJS app, consider customizing your&nbsp;<code>404</code>&nbsp;page and you'll be glad you did. Hope you got some insights from this article? if you did, share and follow me for similar content and I'll see you in another article. Bye.",
          },
        },
        {
          id: "0M7qV7WbrP",
          type: "paragraph",
          data: {
            text: '<a target="_blank" href="https://github.com/Evavic44/nextjs-custom-404">Code File</a>',
          },
        },
      ],
      version: "2.28.2",
    },
  },
  {
    content: {
      time: 1705723754246,
      blocks: [
        {
          id: "KCpmi4CXnx",
          type: "paragraph",
          data: {
            text: "In this article you’ll learn How React Developer can save time and effort by using design patterns. Its Provide a quick approach to find problems using tested and trusted solutions which is helps React Developers create maintainable, scalable and efficient application. in this article. I will explain React Design patterns and explain how they might improve the development of React application",
          },
        },
        {
          id: "--Y2zPa2Bh",
          type: "header",
          data: {
            text: "The Design Patten That I will cover in this article this following:",
            level: 3,
          },
        },
        {
          id: "cqUU3VPd3Z",
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Singleton Pattern",
              "Proxy Pattern",
              "Factory Pattern",
              "Observer Pattern",
              "Mixin Pattern",
              "Module Pattern",
              "High Order Component",
              "Compound Component",
            ],
          },
        },
        {
          id: "Nolpzif92M",
          type: "header",
          data: {
            text: "Perquisites",
            level: 2,
          },
        },
        {
          id: "VU5FP7HLwA",
          type: "list",
          data: {
            style: "ordered",
            items: [
              "Basic of Html CSS JavaScript",
              "Basic Understand of ReactJS",
              "Basic understanding of State Management context Apis and Hooks like use State, use Effects",
            ],
          },
        },
        {
          id: "Lepk3ueJhj",
          type: "header",
          data: {
            text: "Singleton",
            level: 3,
          },
        },
        {
          id: "7iZPWcXuBL",
          type: "paragraph",
          data: {
            text: "The Singleton pattern ensures that a class has only one instance and provides a global point of access to it. This pattern can be useful in React for services that should have a single shared instance, like an API service.",
          },
        },
        {
          id: "9ViNUbpk3g",
          type: "paragraph",
          data: {
            text: "Example",
          },
        },
        {
          id: "0LcVICgBX6",
          type: "paragraph",
          data: {
            text: "COPYCOPY",
          },
        },
        {
          id: "ajOhzEX1a9",
          type: "code",
          data: {
            code: "const useSingleton = (() => {\n    let instance;\n\n    return () => {\n        if (!instance) {\n            instance = {\n                fetchData: () => {\n                    // fetch data from the API\n                }\n            };\n        }\n        return instance;\n    };\n})();\n\n// Usage in a component\nconst MyComponent = () => {\n    const apiClient = useSingleton();\n\n    // Use the Api Client for fetching data\n};\n",
          },
        },
        {
          id: "u0ygDc7Qgm",
          type: "header",
          data: {
            text: "Proxy Design Patten",
            level: 3,
          },
        },
        {
          id: "3RL7b-8G4J",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1705643325265/af0c8480-d869-42c0-b1fc-11e9f1b943d5.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "RzrT8iYloQ",
          type: "paragraph",
          data: {
            text: "The Proxy Pattern acts as a middleman or intermediary for another object, managing or controlling access to it. Think of a proxy pattern like having a personal assistant. When someone wants to schedule a meeting with you, they go through your assistant first. The assistant manages your schedule, filters requests based on your preferences, and only lets certain requests through. Similarly, in programming, the proxy pattern controls interactions with an object, adding extra logic or restrictions.",
          },
        },
        {
          id: "jlUnWT5Jc5",
          type: "paragraph",
          data: {
            text: "In React Functional Components:&nbsp;In the context of React, a proxy can be used to control or modify the properties (props) passed to a component, or to add additional rendering logic.",
          },
        },
        {
          id: "wtjya38t7V",
          type: "paragraph",
          data: {
            text: "For example,",
          },
        },
        {
          id: "boA0qRuNCz",
          type: "list",
          data: {
            style: "unordered",
            items: [
              "We create a&nbsp;useState&nbsp;hook to hold the&nbsp;person&nbsp;object.",
              "We use&nbsp;useEffect&nbsp;to set up the proxy once the component mounts.",
              "Inside the&nbsp;useEffect, we define the proxy with the given get and set traps.",
              "We demonstrate interacting with the proxy by changing the name and logging the age.",
              "Finally, we update the state with the proxy. This will re-render the component, reflecting any changes.",
            ],
          },
        },
        {
          id: "9lydc_-GnO",
          type: "paragraph",
          data: {
            text: "COPYCOPY",
          },
        },
        {
          id: "BHKEs-R8qK",
          type: "code",
          data: {
            code: "import React, { useState, useEffect } from 'react';\n\nfunction PersonComponent() {\n  const [person, setPerson] = useState({\n    name: \"John Doe\",\n    age: 42,\n    nationality: \"American\"\n  });\n\n  useEffect(() => {\n    const handler = {\n      get: (obj, prop) => {\n        console.log(`The value of ${prop} is ${obj[prop]}`);\n        return Reflect.get(obj, prop);\n      },\n      set: (obj, prop, value) => {\n        console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);\n        return Reflect.set(obj, prop, value);\n      }\n    };\n\n    const personProxy = new Proxy(person, handler);\n\n    // Example of interacting with the proxy\n    personProxy.name = 'Jane Doe';\n    console.log(personProxy.age);\n\n    // Update the state with the proxy to trigger re-render\n    setPerson(personProxy);\n\n  }, []);\n\n  return (\n    <div>\n      <h1>Person Details</h1>\n      <p>Name: {person.name}</p>\n      <p>Age: {person.age}</p>\n      <p>Nationality: {person.nationality}</p>\n    </div>\n  );\n}\n\nexport default PersonComponent;\n",
          },
        },
        {
          id: "XO60yywmJj",
          type: "header",
          data: {
            text: "Factory Pattern",
            level: 3,
          },
        },
        {
          id: "OC7RO3wUGy",
          type: "paragraph",
          data: {
            text: "The Factory Pattern is akin to a manufacturing factory which produces different types of products. In a real-world scenario, think of a car manufacturing factory that can produce various models of cars. The factory decides which type of car to produce based on the specifications given. Similarly, in programming, the Factory Pattern provides a way to create objects without specifying the exact class of object that will be created. This is useful when the creation logic of a class is complex or when it needs to be decoupled from the user.",
          },
        },
        {
          id: "i-oUZZMz7c",
          type: "paragraph",
          data: {
            text: "In React Functional Components:&nbsp;In React, the Factory Pattern can be used to dynamically create different components based on certain conditions or inputs. For example, you might have a component that needs to display different types of user interfaces depending on user type or preferences.",
          },
        },
        {
          id: "UKUQub8hOr",
          type: "paragraph",
          data: {
            text: "COPYCOPY",
          },
        },
        {
          id: "e_If4pWJdm",
          type: "code",
          data: {
            code: "const UserAdminComponent = () => <div>Admin Interface</div>;\nconst UserGuestComponent = () => <div>Guest Interface</div>;\nconst UserMemberComponent = () => <div>Member Interface</div>;\n\nconst UserComponentFactory = ({ userType }) => {\n    switch (userType) {\n        case 'admin':\n            return <UserAdminComponent />;\n        case 'guest':\n            return <UserGuestComponent />;\n        case 'member':\n            return <UserMemberComponent />;\n        default:\n            return <div>Invalid user type</div>;\n    }\n};\n\n// Usage\n<UserComponentFactory userType=\"admin\" />\n<UserComponentFactory userType=\"guest\" />\n<UserComponentFactory userType=\"member\" />\n",
          },
        },
        {
          id: "FavA1BYZSp",
          type: "header",
          data: {
            text: "Observer Pattern",
            level: 3,
          },
        },
        {
          id: "uZvBUQ3ARH",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1705658314088/0b4e9434-4b4e-4600-873c-a5ac194e73e2.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "kmba071-OK",
          type: "paragraph",
          data: {
            text: "The Observer Pattern is like subscribing to a magazine or newsletter. When you subscribe to a magazine, you receive new issues whenever they are published. You don't have to actively check for new issues; the magazine publisher notifies you when a new issue is available. Similarly, in programming, the Observer Pattern establishes a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.",
          },
        },
        {
          id: "b81gsY_UWZ",
          type: "paragraph",
          data: {
            text: "In React Functional Components:&nbsp;In React, the Observer Pattern can be implemented using state and effect hooks to create components that observe changes in other components' states.",
          },
        },
        {
          id: "zgBiWT6Yae",
          type: "paragraph",
          data: {
            text: "COPYCOPY",
          },
        },
        {
          id: "6j-ds-ljhz",
          type: "code",
          data: {
            code: "import React, { useState } from 'react';\n\nconst Subject = () => {\n  const [data, setData] = useState('Initial Data');\n\n  return (\n    <div>\n      <button onClick={() => setData('New Data')}>Change Data</button>\n      <Observer data={data} />\n    </div>\n  );\n};\n\nconst Observer = ({data }) => <div>Observed Data: {data}</div>;\n\n// Usage\n<Subject />;\n",
          },
        },
        {
          id: "jXGa0K0k4z",
          type: "paragraph",
          data: {
            text: 'In this example, Subject maintains the state of data, and Observer component observes changes in data. When the "Change Data" button is clicked in the Subject component, it updates the data state value. As a result, the Observer component automatically reflects the updated data without any explicit notification.',
          },
        },
        {
          id: "-uIHz0kaVF",
          type: "paragraph",
          data: {
            text: "This pattern is particularly useful when you have components that need to react to changes in another component's state or data. It helps in creating loosely coupled components where they can react to changes without needing direct knowledge of how those changes occurred.",
          },
        },
        {
          id: "1e9dM9IetO",
          type: "paragraph",
          data: {
            text: "Implementing the Observer Pattern in React functional components allows for efficient management of component communication and ensures that UI updates are automatically triggered when relevant data changes occur",
          },
        },
        {
          id: "1Zs5DlPNJT",
          type: "header",
          data: {
            text: "Mixin Pattern",
            level: 3,
          },
        },
        {
          id: "ktxMSNYq3H",
          type: "paragraph",
          data: {
            text: "A&nbsp;mixin&nbsp;is an object that we can use in order to add reusable functionality to another object or class, without using inheritance. We can’t use mixins on their own: their sole purpose is to&nbsp;add functionality&nbsp;to objects or classes without inheritance.",
          },
        },
        {
          id: "eTg7JsB0A7",
          type: "paragraph",
          data: {
            text: "The Mixin Pattern can be implemented using object composition to combine the properties and methods of multiple objects into a single object. Here's an example of how you can achieve this:",
          },
        },
        {
          id: "Hge6u46FtR",
          type: "paragraph",
          data: {
            text: "COPYCOPY",
          },
        },
        {
          id: "GiskVG3OUa",
          type: "code",
          data: {
            code: "// Define mixins as separate objects\nconst canEat = {\n  eat: function() {\n    console.log('Eating');\n  }\n};\n\nconst canSleep = {\n  sleep: function() {\n    console.log('Sleeping');\n  }\n};\n\n// Create a target object\nconst animal = {};\n\n// Apply mixins to the target object\nObject.assign(animal, canEat, canSleep);\n\n// Now 'animal' has both eat and sleep methods\nanimal.eat(); // Output: Eating\nanimal.sleep(); // Output: Sleeping\nCopy\n",
          },
        },
        {
          id: "ZPwipHxkgi",
          type: "paragraph",
          data: {
            text: "In this example,&nbsp;canEat&nbsp;and&nbsp;canSleep&nbsp;are two separate&nbsp;mixins&nbsp;containing the eat and sleep methods, respectively. By using&nbsp;Object.assign,&nbsp;these&nbsp;mixins&nbsp;are applied to the animal object, allowing it to exhibit combined behaviors.",
          },
        },
        {
          id: "UbPEW8hyat",
          type: "header",
          data: {
            text: "Module Pattern",
            level: 3,
          },
        },
        {
          id: "tA3cdtLkjt",
          type: "paragraph",
          data: {
            text: "When Our application and codebase grow, it becomes increasingly important to keep your code maintainable and separated. The module pattern allows you to split up your code into smaller, reusable pieces.",
          },
        },
        {
          id: "Dx7ry1Xeyt",
          type: "paragraph",
          data: {
            text: "Besides being able to split your code into smaller reusable pieces, modules allow you to keep certain values within your file&nbsp;private. Declarations within a module are scoped (encapsulated) to that module, by default. If we don’t explicitly export a certain value, that value is not available outside that module. This reduces the risk of name collisions for values declared in other parts of your codebase, since the values are not available on the global scale.",
          },
        },
        {
          id: "uYKUYnxBGe",
          type: "header",
          data: {
            text: "High Order Component",
            level: 3,
          },
        },
        {
          id: "naMVIzPA24",
          type: "paragraph",
          data: {
            text: "A Higher-Order Component (HOC) in React is a pattern where a function takes a component and returns a new component with additional functionality. It is used to share code between components, and it's a powerful pattern for code reuse, logic abstraction, and composition.",
          },
        },
        {
          id: "YWmFi54Lb9",
          type: "paragraph",
          data: {
            text: "Example:&nbsp;Here's an example of a simple HOC that adds some additional props to the wrapped component:",
          },
        },
        {
          id: "cv-zYPwr9f",
          type: "paragraph",
          data: {
            text: "COPYCOPY",
          },
        },
        {
          id: "fmqoWegnyg",
          type: "code",
          data: {
            code: 'import React from \'react\';\n\nconst withExtraProps = (WrappedComponent) => {\n  return (props) => {\n    return <WrappedComponent {...props} extraProp="This is an extra prop" />;\n  };\n};\n\nconst DisplayComponent = (props) => {\n  return (\n    <div>\n      <p>Regular Prop: {props.regularProp}</p>\n      <p>Extra Prop: {props.extraProp}</p>\n    </div>\n  );\n};\n\nconst EnhancedDisplayComponent = withExtraProps(DisplayComponent);\n\n// Usage\n<EnhancedDisplayComponent regularProp="Hello, World!" />\nCopy\n',
          },
        },
        {
          id: "9a5vhuYr1v",
          type: "paragraph",
          data: {
            text: "In this example, withExtraProps is a higher-order component that takes DisplayComponent as an argument and returns an enhanced version of it. The enhanced version includes an extra prop that is passed down to the original DisplayComponent.",
          },
        },
        {
          id: "Z5EdOAWniU",
          type: "paragraph",
          data: {
            text: "By using HOCs, you can encapsulate common functionalities and apply them to multiple components without repeating the same code. This pattern promotes reusability and helps in keeping the components focused on their specific responsibilities.",
          },
        },
        {
          id: "vUtL6zAo6E",
          type: "paragraph",
          data: {
            text: "Implementing HOCs in React allows for cleaner, more maintainable code by separating concerns and promoting code reuse across different parts of your application.",
          },
        },
        {
          id: "hMiHSefEaF",
          type: "header",
          data: {
            text: "Compound Component",
            level: 3,
          },
        },
        {
          id: "X5LSNRaOOV",
          type: "paragraph",
          data: {
            text: "The compound component design pattern in React allows the creation of components that work together to form a cohesive unit. This pattern is used to compose components that share state and functionality, enabling a more intuitive and flexible API for the end user.",
          },
        },
        {
          id: "sw3ZEooj4m",
          type: "header",
          data: {
            text: "Example of Compound Components:",
            level: 3,
          },
        },
        {
          id: "nlQfrHkw9-",
          type: "paragraph",
          data: {
            text: "COPYCOPY",
          },
        },
        {
          id: "nxXt_V_2Py",
          type: "code",
          data: {
            code: "import React, { useState } from 'react';\n\nconst Toggle = ({ children }) => {\n  const [on, setOn] = useState(false);\n\n  const toggle = () => {\n    setOn((prev) => !prev);\n  };\n\n  return React.Children.map(children, (child) => {\n    if (typeof child.type === 'string') {\n      return child;\n    }\n\n    return React.cloneElement(child, { on, toggle });\n  });\n};\n\nconst ToggleOn = ({ on, children }) => (on ? children : null);\nconst ToggleOff = ({ on, children }) => (on ? null : children);\nconst ToggleButton = ({ on, toggle }) => <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>;\n\n// Usage\n<Toggle>\n  <ToggleOn>The button is on</ToggleOn>\n  <ToggleOff>The button is off</ToggleOff>\n  <ToggleButton />\n</Toggle>;\nCopy\n",
          },
        },
        {
          id: "0NuXmiR5Ed",
          type: "paragraph",
          data: {
            text: "In this example,&nbsp;<code>Toggle</code>&nbsp;acts as a container for other components (<code>ToggleOn</code>,&nbsp;<code>ToggleOff</code>, and&nbsp;<code>ToggleButton</code>). The state is managed at the&nbsp;<code>Toggle</code>&nbsp;level and shared with its child components. When the button is clicked, it toggles its state and updates the visibility of the&nbsp;<code>ToggleOn</code>&nbsp;and&nbsp;<code>ToggleOff</code>&nbsp;components accordingly.",
          },
        },
        {
          id: "tDXELEG0Jq",
          type: "paragraph",
          data: {
            text: "By using compound components, you can create reusable and composable APIs that offer a more intuitive way for users to interact with your components. This pattern promotes encapsulation of related functionality within a single unit while providing flexibility for customization.",
          },
        },
        {
          id: "gCC318lVrr",
          type: "header",
          data: {
            text: "Rendering Patterns",
            level: 2,
          },
        },
        {
          id: "HhED0cx2nH",
          type: "list",
          data: {
            style: "ordered",
            items: [
              "Client-Side Rendering",
              "Server-Side Rendering",
              "Static Side Rendering",
              "Progressive Hydrate",
            ],
          },
        },
        {
          id: "oZY0X2PK7r",
          type: "header",
          data: {
            text: "Client-Side Rendering",
            level: 3,
          },
        },
        {
          id: "MMh04NY5Hk",
          type: "paragraph",
          data: {
            text: "In CSR, JavaScript handles the rendering of your page in the browser. After the initial loading of the HTML and JavaScript, the React app takes over, manipulating the DOM as needed. This approach offers dynamic user experience but can lead to longer initial load times and lower SEO if not managed correctly.",
          },
        },
        {
          id: "yo_im1ULHQ",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1705640423471/7da79f0d-47b2-47f4-8b7b-dfa8ddba3738.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "CqTZWgC5iS",
          type: "header",
          data: {
            text: "Server-Side Rendering",
            level: 3,
          },
        },
        {
          id: "pAAu0MzaIu",
          type: "paragraph",
          data: {
            text: "In SSR, react components are rendered to HTML on the server, and the rendered HTML is sent to the client. This means the page is ready to be viewed as soon as it loads.",
          },
        },
        {
          id: "RRW8tNOF86",
          type: "paragraph",
          data: {
            text: "SSR enhances SEO and improves the initial load time, as the content is readily available for indexing and viewing. However, it can increase server load and complexity.",
          },
        },
        {
          id: "vgVtlUfIUG",
          type: "image",
          data: {
            url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1705640585382/cfa10c32-0ca8-4c12-8064-65715013ae43.png?auto=compress,format&amp;format=webp",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "ftMFtm8o3y",
          type: "paragraph",
          data: {
            text: "Also known as static site generation, this approach pre-renders pages during the build process. Each page is a pre-built static HTML file, often rehydrated into a React app on the client-side.Also known as static site generation, this approach pre-renders pages during the build process. Each page is a pre-built static HTML file, often rehydrated into a React app on the client-side.",
          },
        },
        {
          id: "tJwdCpKtbn",
          type: "paragraph",
          data: {
            text: "It offers blazing-fast loading times and excellent SEO since pages are pre-rendered. However, it's not ideal for highly dynamic content. Best for websites with content that doesn't change often, like documentation or portfolio sites.",
          },
        },
        {
          id: "weZXNZi723",
          type: "header",
          data: {
            text: "Progressive hydration",
            level: 3,
          },
        },
        {
          id: "00W2eqZ1sP",
          type: "paragraph",
          data: {
            text: "Progressive Hydration works as follows: Initially, when you open the website, the server provides a fully-rendered HTML page, allowing you to immediately see content like articles and images. This server-prepared content ensures quick loading and is easily indexed by search engines. As you interact with the page, such as clicking on an article or scrolling, React starts adding interactivity to this static content, a process known as 'hydration'. For instance, clicking an article might expand it or load the comments section, all happening client-side with React's help. This technique offers a fast initial load from the server-side rendering, coupled with a rich, interactive user experience provided by client-side React, balancing both speed and interactivity.",
          },
        },
        {
          id: "0UjsJt-Ou0",
          type: "image",
          data: {
            url: "https://res.cloudinary.com/ddxwdqwkr/image/upload/f_auto/v1614961731/patterns.dev/progressive-rehydration.jpg",
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
          },
        },
        {
          id: "MYLJaS_aWS",
          type: "paragraph",
          data: {
            text: "Congratulations on successfully Reading my Article Now You have Basic understanding of Design Patten that how that work in React Ecosystem",
          },
        },
        {
          id: "X5p8O8juKt",
          type: "paragraph",
          data: {
            text: "I hope you learned something from this blog. If you have, don't forget to drop a like, follow me on Hashnode, and subscribe to my Hashnode newsletter so that you don't miss any future posts. If you have any questions or feedback, feel free to leave a comment below. Thanks for reading and have a great day!",
          },
        },
        {
          id: "gq9FEy5FpJ",
          type: "paragraph",
          data: {
            text: "If you want to Learn About Design Patten in Details You Can check here 👇",
          },
        },
        {
          id: "PmI9tM0Avj",
          type: "paragraph",
          data: {
            text: '<a target="_blank" href="https://www.patterns.dev/">Patterns.dev</a>',
          },
        },
      ],
      version: "2.28.2",
    },
  },
  {
    content: {
      time: 1705723996748,
      blocks: [
        {
          id: "IKraV9QVb6",
          type: "header",
          data: {
            text: "Introduction:",
            level: 2,
          },
        },
        {
          id: "4W0G8LAPDz",
          type: "paragraph",
          data: {
            text: 'ORIGINAL DOCUMENT LINK:&nbsp;<a target="_blank" href="https://www.linkedin.com/posts/aman-devops_kubernetes-notes-activity-7147149465307561984-7rA8?utm_source=share&amp;utm_medium=member_desktop">must checkout 💻</a>',
          },
        },
        {
          id: "ksAdlsXicg",
          type: "paragraph",
          data: {
            text: "Aman Pathak on LinkedIn: Kubernetes Notes | 33 comments",
          },
        },
        {
          id: "4nbGpCd8FX",
          type: "paragraph",
          data: {
            text: "🚀 Embark on a Kubernetes Journey in 2024! 🌐 Hey DevOps Enthusiasts and Kubernetes Aficionados! 🚀 Dive into the fascinating world of Kubernetes wi...",
          },
        },
        {
          id: "QUpU8KLagO",
          type: "paragraph",
          data: {
            text: "www.linkedin.com",
          },
        },
        {
          id: "qa3G4Z14Fb",
          type: "paragraph",
          data: {
            text: "Embarking on the quest to understand Kubernetes, I stumbled upon a treasure trove of knowledge curated by Aman Pathak. These comprehensive documents not only simplified the complexities of Kubernetes but also transformed the learning experience into a thrilling adventure. 🚀 Let's embark on a journey through the rich content that left me enlightened and empowered.",
          },
        },
        {
          id: "HLXQCFQ9i9",
          type: "header",
          data: {
            text: "Kubernetes Unveiled 🌟",
            level: 2,
          },
        },
        {
          id: "xAmXi9BfQY",
          type: "header",
          data: {
            text: "Kubernetes Introduction:",
            level: 3,
          },
        },
        {
          id: "V40q32sSk_",
          type: "paragraph",
          data: {
            text: "The journey begins with an insightful exploration of Kubernetes, unraveling the mysteries of monolithic vs. microservices architecture, the architecture itself, and the distinctive features that make Kubernetes a force to be reckoned with. 🏛️",
          },
        },
        {
          id: "CdjlqWnpPa",
          type: "header",
          data: {
            text: "Master-Slave Dance:",
            level: 3,
          },
        },
        {
          id: "tke_eVNCMv",
          type: "paragraph",
          data: {
            text: "Diving deep into the Master and Worker nodes, Aman Pathak paints a vivid picture of the Kubernetes architecture. From API servers to etcd, controller managers to schedulers, the analogy of a Shopping Mall clarifies the intricate relationships within this dynamic ecosystem. 👥💡",
          },
        },
        {
          id: "t0xh5h3KZ8",
          type: "header",
          data: {
            text: "Minikube Magic:",
            level: 3,
          },
        },
        {
          id: "5nTkF5Phq5",
          type: "paragraph",
          data: {
            text: "Hands-on experience is key, and the guide seamlessly leads us through setting up Minikube on our local machines. The step-by-step walkthrough, including the creation of the first pod, transforms the theoretical knowledge into practical mastery. 🛠️✨",
          },
        },
        {
          id: "MCUMF7k57g",
          type: "header",
          data: {
            text: "Kubeconfig Chronicles:",
            level: 3,
          },
        },
        {
          id: "rWQ0JTkqDo",
          type: "paragraph",
          data: {
            text: "Decoding kubeconfig files, service files, and deployment files becomes a breeze with Aman's lucid explanations. The real-world demonstrations provide a solid foundation for understanding these critical components. 📄🕵️‍♂️",
          },
        },
        {
          id: "97aGHZjM4t",
          type: "header",
          data: {
            text: "Kubernetes Orchestration Symphony 🎶",
            level: 2,
          },
        },
        {
          id: "kzW3GqkDcy",
          type: "header",
          data: {
            text: "Labels, Selectors, and Node Selectors:",
            level: 3,
          },
        },
        {
          id: "ty6iwlwPWS",
          type: "paragraph",
          data: {
            text: "Navigating the realms of labels, selectors, and node selectors is made easy with engaging content and hands-on exercises. Aman's narrative style brings clarity to concepts that might otherwise seem daunting. 🏷️🧭",
          },
        },
        {
          id: "2IKITyRjWc",
          type: "header",
          data: {
            text: "Replication Controllers and Sets:",
            level: 3,
          },
        },
        {
          id: "jxxoq-yYI-",
          type: "paragraph",
          data: {
            text: "The journey delves into replication controllers and replica sets, offering practical insights through hands-on exercises. This not only demystifies these concepts but also equips readers with practical skills. 👥🔄",
          },
        },
        {
          id: "1P3oNXohpl",
          type: "header",
          data: {
            text: "Deployment Object in Kubernetes:",
            level: 3,
          },
        },
        {
          id: "D6SK5VTKby",
          type: "paragraph",
          data: {
            text: "Unveiling the power of deployment objects, Aman illustrates their use cases with hands-on exercises, making it crystal clear why they are a cornerstone of Kubernetes orchestration. 🚀🏹",
          },
        },
        {
          id: "FU9EhZmUYr",
          type: "header",
          data: {
            text: "Networking Odyssey 🌐",
            level: 2,
          },
        },
        {
          id: "iHVzLI2INl",
          type: "header",
          data: {
            text: "Kubernetes Networking (Services):",
            level: 3,
          },
        },
        {
          id: "sJ95wlK95W",
          type: "paragraph",
          data: {
            text: "From Cluster IP to NodePort, LoadBalancer to ExternalName, the guide explores Kubernetes networking in-depth. Hands-on exercises demonstrate how these services facilitate seamless communication within the cluster. 🕸️🤝",
          },
        },
        {
          id: "9QpwIsXAIE",
          type: "header",
          data: {
            text: "Advanced Networking: CNI and Calico:",
            level: 3,
          },
        },
        {
          id: "J1JCyWjHjk",
          type: "paragraph",
          data: {
            text: "Navigating advanced networking concepts such as Calico CNI becomes an adventure with Aman's guide. Real-time examples and hands-on exercises pave the way for a deeper understanding of Kubernetes networking. 🚥🔗",
          },
        },
        {
          id: "PSxaKF18gB",
          type: "header",
          data: {
            text: "Volumes and Liveness Probes:",
            level: 3,
          },
        },
        {
          id: "yw5VTvncqJ",
          type: "paragraph",
          data: {
            text: "The journey through volumes and liveness probes is guided by Aman's expertise. Hands-on exercises with EmptyDir, hostPath, Persistent Volume, and LivenessProbe illuminate the path to effective Kubernetes application management. 🗂️💓",
          },
        },
        {
          id: "G2Gh_rKG2v",
          type: "header",
          data: {
            text: "Secrets and Configurations 🤫",
            level: 2,
          },
        },
        {
          id: "CtMsfAeBx1",
          type: "header",
          data: {
            text: "ConfigMaps &amp; Secrets:",
            level: 3,
          },
        },
        {
          id: "jRgY6mG0e5",
          type: "paragraph",
          data: {
            text: "Secrets and ConfigMaps, often mysterious entities, are demystified with hands-on exercises. From creating them to integrating them into applications, Aman provides a roadmap for secure and efficient configuration management. 🤐🔐",
          },
        },
        {
          id: "mu045JQ9i7",
          type: "header",
          data: {
            text: "Kubernetes Jobs:",
            level: 3,
          },
        },
        {
          id: "ubaW3RFd2V",
          type: "paragraph",
          data: {
            text: "Aman introduces the concept of Kubernetes Jobs, unveiling their use cases and key features. Hands-on exercises ensure a thorough understanding of how Jobs play a crucial role in managing containerized applications. 🛠️💼",
          },
        },
        {
          id: "HzkCvK7r3R",
          type: "header",
          data: {
            text: "InitContainer Initiatives:",
            level: 3,
          },
        },
        {
          id: "4tqY6_ja-a",
          type: "paragraph",
          data: {
            text: "The initiation into InitContainers is seamless with Aman's guidance. Exploring use cases and hands-on exercises empowers readers to leverage InitContainers for enhanced application lifecycle management. 🚀🌱",
          },
        },
        {
          id: "_8C6-uGKC0",
          type: "header",
          data: {
            text: "Beyond the Basics 🚀",
            level: 2,
          },
        },
        {
          id: "Zstp4yEAab",
          type: "header",
          data: {
            text: "Kubernetes Namespace:",
            level: 3,
          },
        },
        {
          id: "tLozuVPqyX",
          type: "paragraph",
          data: {
            text: "When to consider Kubernetes namespaces? Aman provides a detailed guide, supplemented by hands-on exercises, offering insights into the effective use of namespaces for cluster organization. 🏰🌐",
          },
        },
        {
          id: "u8rRTxz_4V",
          type: "header",
          data: {
            text: "Resource Quota Realities:",
            level: 3,
          },
        },
        {
          id: "eDWZ2-ma4o",
          type: "paragraph",
          data: {
            text: "Aman sheds light on resource quotas, deciphering the intricacies of limits and requests. Hands-on exercises guide readers on how to effectively manage resource allocations within a Kubernetes cluster. ⚖️💡",
          },
        },
        {
          id: "crUPSD2crz",
          type: "header",
          data: {
            text: "Helm – The Sailing Companion:",
            level: 3,
          },
        },
        {
          id: "Tfsz71pLNg",
          type: "paragraph",
          data: {
            text: "Navigating the seas of Kubernetes becomes smoother with Helm. Aman introduces Helm and its functionalities, making it an indispensable tool for Kubernetes application deployment. 🌊🔧",
          },
        },
        {
          id: "cgT5s0I12-",
          type: "header",
          data: {
            text: "Scaling Heights 📈",
            level: 2,
          },
        },
        {
          id: "uMbk73jwZH",
          type: "header",
          data: {
            text: "Kubernetes Autoscaling:",
            level: 3,
          },
        },
        {
          id: "GRBONrxzG8",
          type: "paragraph",
          data: {
            text: "Scaling applications dynamically is explored with Kubernetes autoscaling. Aman walks us through the types of autoscaling and the key features of Horizontal Pod Autoscaler, followed by hands-on exercises that provide a practical understanding of this powerful feature. 🚀⚙️",
          },
        },
        {
          id: "7pUjfZjTtt",
          type: "header",
          data: {
            text: "Multi-Cluster Kubernetes with HAProxy:",
            level: 3,
          },
        },
        {
          id: "A9QnE6mPhg",
          type: "paragraph",
          data: {
            text: "HAProxy becomes the guiding star in the exploration of multi-cluster Kubernetes setups. Aman's demonstration showcases how to achieve high availability and load balancing, creating a robust Kubernetes infrastructure. 🌐🌐",
          },
        },
        {
          id: "MOn2ynlRJL",
          type: "header",
          data: {
            text: "Kubernetes Ingress Exploration:",
            level: 3,
          },
        },
        {
          id: "5Vhbj9hg16",
          type: "paragraph",
          data: {
            text: "Exploring Kubernetes Ingress becomes an exciting venture with Aman. Path-based and host-based routing are demystified through hands-on exercises, providing a solid understanding of Ingress controllers. 🌐🗺️",
          },
        },
        {
          id: "3t52CpTeX0",
          type: "header",
          data: {
            text: "Advanced Kubernetes Realms 🚀",
            level: 2,
          },
        },
        {
          id: "xwqI70i0DL",
          type: "header",
          data: {
            text: "StatefulSets Saga:",
            level: 3,
          },
        },
        {
          id: "rw1R6TYPct",
          type: "paragraph",
          data: {
            text: "The saga of StatefulSets unfolds with Aman's guidance. From differentiating between stateful and stateless applications to exploring the key features of StatefulSets, hands-on exercises empower readers to manage stateful workloads efficiently. 🏰🔄",
          },
        },
        {
          id: "KMyoxjcAEB",
          type: "header",
          data: {
            text: "DaemonSet Delight:",
            level: 3,
          },
        },
        {
          id: "q8m_IdTKPj",
          type: "paragraph",
          data: {
            text: "Delving into DaemonSets, Aman outlines their key features and explores various use cases. Hands-on exercises provide a clear understanding of how DaemonSets ensure specific pods run on every node in a cluster. 👹🚀",
          },
        },
        {
          id: "R7DbjpKJmA",
          type: "header",
          data: {
            text: "Network Policies Narratives:",
            level: 3,
          },
        },
        {
          id: "oHHF8Y25CM",
          type: "paragraph",
          data: {
            text: "Aman unfolds the narratives of Kubernetes Network Policies, exploring key features and real-world use cases. Readers are equipped with the knowledge to secure and segment their applications within the cluster. 🕸️🛡️",
          },
        },
        {
          id: "2cGz9E2PZV",
          type: "header",
          data: {
            text: "Operators – The Kubernetes Maestros:",
            level: 3,
          },
        },
        {
          id: "r71H4uRDJn",
          type: "paragraph",
          data: {
            text: "The Kubernetes Maestros, known as Operators, are introduced by Aman. Unraveling their features and functionalities, Aman illustrates how Custom Resource Definitions and Custom Controllers empower users to extend Kubernetes capabilities. 🎭🚀",
          },
        },
        {
          id: "C9eDPBeLcQ",
          type: "header",
          data: {
            text: "Conclusion 🌟",
            level: 2,
          },
        },
        {
          id: "ZdKVhJTHP8",
          type: "paragraph",
          data: {
            text: "In conclusion, the journey through Aman Pathak's Kubernetes documentation has been nothing short of transformative. The immersive experience, coupled with hands-on exercises, has left me equipped with the skills and knowledge to navigate the intricate landscapes of Kubernetes confidently. Aman's ability to convey complex concepts in a relatable manner has made this learning journey truly exceptional. 🚀💻",
          },
        },
        {
          id: "rGU7zKJWid",
          type: "paragraph",
          data: {
            text: "To anyone venturing into the world of Kubernetes, I wholeheartedly recommend following Aman Pathak's documentation for an enlightening and empowering experience. Happy learning! 🌐📚",
          },
        },
      ],
      version: "2.28.2",
    },
  },
];
