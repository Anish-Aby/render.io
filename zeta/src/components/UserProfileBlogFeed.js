import ContentDivider from "./ContentDivider";
import UserFeaturedPost from "./UserFeaturedPost";
import UserFeedSelect from "./UserFeedSelect";
import UserProfileCard from "./UserProfileCard";
import UserProfileOtherPosts from "./UserProfileOtherPosts";

export default function UserProfileBlogFeed() {
  return (
    <>
      <div className="user-profile-blog-feed-main-container">
        <div className="profile-feed-padding">
          <UserProfileCard />
          <UserFeedSelect isActive={"active"} />
          <UserFeaturedPost />
          <ContentDivider>Other Posts</ContentDivider>
          <UserProfileOtherPosts />
        </div>
      </div>
    </>
  );
}
