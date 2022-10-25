import Skeleton from "react-loading-skeleton";

interface TagListSkeletonProps {}

const TagListSkeleton: React.FC<TagListSkeletonProps> = () => {
  return (
    <div className="list-category ">
      {Array(9)
        .fill(0)
        .map((tag) => (
          <p key={tag} className=" w-[30%] ">
            <Skeleton className=" h-[30px]" />
          </p>
        ))}
    </div>
  );
};

export default TagListSkeleton;
