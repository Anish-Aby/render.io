import { Skeleton } from "../ui/skeleton";

export default function BlogLoadingComponent() {
  return (
    <div className="flex flex-col mt-10 py-4 lg:pb-6 gap-4 w-11/12">
      <Skeleton className="h-[200px] w-full lg:h-[250px]" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-[250px] xl:w-[400px]" />
      <div className="flex items-center space-x-4">
        <Skeleton className="h-14 w-14 aspect-square rounded-full" />
        <div className="flex w-full">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[120px] ml-auto" />
        </div>
      </div>
      <Skeleton className="h-[500px] w-full lg:h-[500px]" />
    </div>
  );
}
