import { Skeleton } from "../ui/skeleton";

export default function FeedLoadingComponent() {
  return (
    <div className="flex flex-col mt-10 py-4 lg:pb-6 gap-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[60px]" />
        </div>
      </div>
      <Skeleton className="h-6 w-[250px] xl:w-[400px]" />
      <Skeleton className="h-[160px] w-[340px] xl:w-[400px]" />
      <div className="flex">
        <Skeleton className="h-10 w-24" />
        <div className="flex ml-auto gap-7">
          <Skeleton className="h-10 w-6" />
          <Skeleton className="h-10 w-6" />
        </div>
      </div>
    </div>
  );
}
