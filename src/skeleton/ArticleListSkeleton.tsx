import { Skeleton } from "antd";

interface ArticleListSkeletonProps {}

const ArticleListSkeleton: React.FC<ArticleListSkeletonProps> = () => {
  return (
    <div>
      {Array(3)
        .fill(0)
        .map((_) => (
          <>
            <div className="flex gap-x-5 mb-5">
              <Skeleton avatar />{" "}
              <Skeleton.Image style={{ width: "220px", height: "150px" }} />
            </div>
          </>
        ))}
    </div>
  );
};

export default ArticleListSkeleton;
