import CategoryButton from "./CategoryButton";

export default function UserFeedSelect() {
  return (
    <>
      <div className="feed-select-main-container">
        <CategoryButton isActive="active">Posts</CategoryButton>
        <CategoryButton>About</CategoryButton>
      </div>
    </>
  );
}
