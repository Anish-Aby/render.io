import Navbar from "../Navbar/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Markdown from "markdown-to-jsx";

const blog = {
  name: "Anish Aby",
  date: "Dec 7, 2023",
  readTime: "6 mins read",
  comments: "20",
  likes: "40",
  title: "Space exploration is coming to a shocking halt?",
  subHeading: "How Hashnode calculates feeds on scale and serverless",
  blogImage:
    "https://cdn.hashnode.com/res/hashnode/image/upload/v1699961744035/51aa7ebc-e811-44bd-97e1-ed00e3506fbc.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
  body: ` <p>We&nbsp;<a href="https://engineering.hashnode.com/the-art-of-feed-curating-our-approach-to-generating-personalized-feeds-that-match-users-interests" target="_blank" rel="noopener">previously explained</a>&nbsp;how we calculate the Hashnode Feed and select content and metadata for each user. We found that the feed now displays improved and personalized content. However, we did find two issues in the implementation:</p>
<ul>
<li>
<p><strong>Performance</strong>: The Feed calculation is not trivial; thus, it slows down the access to our main page.</p>
</li>
<li>
<p><strong>Security</strong>: Many expensive queries and aggregations are needed to gather all the data required for the calculation. Safeguarding our database from excessive usage is a must.</p>
</li>
</ul>
<p>Speeding up the page, keeping our databased safe, and showing the freshest content for you on the Hompage was the inspiration for building Feeds on steroids: a scalable and serverless architecture to pre-calculate feeds for recurring users 💊</p>
<p>&nbsp;</p>
<p><img class="image--center mx-auto" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1701676684074/b5095a33-6ce7-4119-8a9b-78acc6afe43a.png?auto=compress,format&amp;format=webp" alt="High level overview of Hashnode's scalable feed architecture" loading="lazy"></p>
<p>&nbsp;</p>
<p>To optimize page speed, we found that pre-calculating feeds for users is the best option. This means we don't have to calculate the feed every time a user visits our feed page. Instead, we can return the feed from the cache and make page loading times faster. A crucial enabler for this is using a cache. With the fast access a cache offers, we can directly load the feed from there to be presented for our users. The above image shows this in a very high abstraction. We are calculating feeds using data from our internal database and a cache for relevant metadata. The calculated data is then stored in a cache for quick access.</p>
<p>Let's take a look at how everything comes together in detail ⬇️</p>
<p>&nbsp;</p>
<h2 id="heading-pre-calculating-feeds-for-thousands-of-users-with-aws-step-functions" class="permalink-heading">Pre-calculating feeds for thousands of users with AWS Step Functions 😎</h2>
<p>&nbsp;</p>
<p><img class="image--center mx-auto" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1701675809464/e1fe24b7-4c14-4fd3-8499-7dad71d9abbb.png?auto=compress,format&amp;format=webp" alt="Detailed overview of Hashnode's scalable feed architecture" loading="lazy"></p>
<p>&nbsp;</p>
<p>We calculate the feed for each user based on internal Hashnode events. These events require a re-calculation of the feeds. An example here is publishing a new post on Hashnode.</p>
<ul>
<li>
<p><strong>Prepare the cache</strong>: Before we start calculating each feed, we must ensure that all data required is in the cache. The final calculation step is wholly based on the cache. This includes user metadata, relevant data for posts, and active users for whom we are pre-calculating. If data is unavailable in the cache or too old for usage, we pull fresh data from our internal database.</p>
</li>
<li>
<p><strong>Calculate the feed</strong>: We start the actual calculation when all data is prepared and ready in the cache. We use an AWS Step Function feature called distributed map execution to do this in parallel. We can calculate multiple feeds simultaneously and reduce execution time. Each calculation has its own AWS Lambda function.</p>
</li>
</ul>
<p>If each user's feed would be calculated on the fly, we would see longer loading times on Hashnode's main page. To do the calculation, we need a lot of data. We must get all the data from the database. This will affect other queries. Lastly, a simple approach like that seems wasteful. We are pulling in the same data again and again for the calculation without reusing it.</p>
<p>&nbsp;</p>
<p>The above architecture reference shows the feed pre-calculation process. We utilize a couple of services to achieve a performant recalculation on various triggers:</p>
<ul>
<li>
<p>AWS Lambda</p>
</li>
<li>
<p>AWS Step Functions</p>
</li>
<li>
<p>Redis Cache</p>
</li>
<li>
<p>Distributed Maps in Step Functions</p>
</li>
<li>
<p>Amazon EventBridge</p>
</li>
</ul>
<p>&nbsp;</p>
<p>Once an event that requires feed re-calculation reaches the AWS Step Function, we will run different checks and collect the necessary data. A new feed for each active user on our platform is then generated. We minimize database access and store necessary data in a cache for fast access. Utilizing our event-driven architecture allows us to react to different events within the system and keep the cache up-to-date.</p>
<p>Let's look at the core parts and what's happening there.</p>
<p>&nbsp;</p>
<h3 id="heading-preparing-data-in-the-cache" class="permalink-heading">Preparing data in the cache</h3>
<p>&nbsp;</p>
<p><img class="image--center mx-auto" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1701270335460/57af6b77-a4d0-454b-809b-f083e581d2ed.png?auto=compress,format&amp;format=webp" alt="Preparing user relevant data for the calculation" loading="lazy"></p>
<p>&nbsp;</p>
<p>When an event triggers an AWS Step Function, we must have all the required data for the calculation step. The first step is to check if the cache has valid data. If not, fill it. The main data for feed calculation are posts. The first AWS Lambda in the AWS Step Function execution will check if we have valid data in the cache for the posts we base our calculation on. Valid in this context refers to data that is not outdated and available in the cache.</p>
<p>Once this is resolved, we can go to the next ingredient for calculation: getting the active users. When no active user is found, we skip the further execution altogether.</p>
<p>Based on the active users, we can now check if the personalization component, the user's metadata, is available in the cache. If metadata is found, we can directly calculate the feed. Otherwise, we have to collect the metadata beforehand from the database and save it to the cache.</p>
<p>These last two steps are done by utilizing&nbsp;<a href="https://docs.aws.amazon.com/step-functions/latest/dg/use-dist-map-orchestrate-large-scale-parallel-workloads.html" target="_blank" rel="noopener">distributed maps</a>. One map for users whom we have found valid metadata in our cache. One for users where no metadata data was found, and we need to collect it before starting the actual calculation</p>
<p>&nbsp;</p>
<h3 id="heading-distributed-map-for-users-where-metadata-is-available" class="permalink-heading">Distributed map for users where metadata is available</h3>
<p>&nbsp;</p>
<p><img class="image--center mx-auto" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1701270466651/8c1223e0-ee2e-4a02-8679-39b606dd10ba.png?auto=compress,format&amp;format=webp" alt="Calculating the feed for users where metadata was found in the cache" loading="lazy"></p>
<p>We find valid metadata for a user. The previous steps of our AWS Step Function provided all the required data. We can now start calculating the user's feed directly. Notice how no database is involved in this step anymore.</p>
<p>&nbsp;</p>
<h3 id="heading-distributed-map-for-users-where-metadata-is-not-available" class="permalink-heading">Distributed map for users where metadata is not available</h3>
<p>&nbsp;</p>
<p><img class="image--center mx-auto" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1701270435343/37161cbd-b9f6-49d6-9ad8-ca9d5e870ca2.png?auto=compress,format&amp;format=webp" alt="Calculating the feed for users where no metadata was found in the cache" loading="lazy"></p>
<p>No metadata found for the user requires us to prepare it before starting the calculation. A preceding AWS Lambda function handles this before the actual calculation is done. The database is queried to collect the user's metadata, and the result is stored in our cache. Again, the calculation step does not require any database connection to do its job.</p>
<hr>
<p>The two distributed maps share the same final step of the feed calculation. Once succeeded, we save the result, the user's feed, in the cache for fast access via our APIs. To make the process faster and use less bandwidth, we use item batching in the AWS Step Function. This allows us to share post data with the items in the same batch. We would have to get the post data and metadata information for each user otherwise.</p>
<p><img class="image--center mx-auto" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1699864467563/5db1457e-34da-484f-acf3-36c71ef0753c.png?auto=compress,format&amp;format=webp" alt="Feed calculation execution duration" loading="lazy"></p>
<p>A typical AWS Step Function run has a duration of ~26 seconds - while calculating the feed for thousands of users 🚀</p>
<p>&nbsp;</p>
<h2 id="heading-getting-rid-of-stale-data-purging-and-re-calculating-feeds-on-a-period" class="permalink-heading">Getting rid of stale data - Purging and re-calculating feeds on a period</h2>
<p>&nbsp;</p>
<p>We decided to purge the whole cache regularly, even though we have implemented householding for our cache. We also have various steps in the AWS Step Function that validate cache data before the calculation is done.</p>
<p>A cron job runs the AWS Step Function every couple of hours to delete all data in the cache. This is a safety measure and reassurance that we only store essential data briefly. We can ignore events that may affect the feed for a longer time. The updates from these events will be included after the next purge. This is a nice bonus. This saves some implementation effort for low-priority events regarding feed re-calculation. The AWS Step Function will refill the cache when the feed is empty.</p>
<p>&nbsp;</p>
<h2 id="heading-final-words" class="permalink-heading">Final words</h2>
<p>&nbsp;</p>
<p>This post should give you a rough idea of calculating feeds on the scale and which services we apply. Are you interested in more feed-related content? If so, let us know in the comments - we have a couple more crips implementation details ready to be published 🙌</p>
<p>&nbsp;</p>
<p>Cheers 🙌</p>`,
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <article className="w-full flex flex-col items-center font-p1">
        <div className="w-11/12 min-h-svh">
          <div className="my-5">
            <img src={blog.blogImage} className="rounded-lg w-full" />
          </div>
          <div className="font-p2 text-2xl">{blog.title}</div>
          <div className="flex gap-4 items-center my-5">
            <Avatar className="h-14 aspect-square w-14">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h3 className="text-xl">{blog.name}</h3>
            <p className="opacity-50 text-lg">{blog.date}</p>
          </div>
          <div className="w-full text-lg font-primary leading-8">
            <Markdown>{blog.body}</Markdown>
          </div>
        </div>
      </article>
    </>
  );
}
