// import Skeleton from "react-loading-skeleton";

import { Skeleton } from "antd";

interface ArticleCardSkeletonProps {}

const ArticleCardSkeleton: React.FC<ArticleCardSkeletonProps> = () => {
  return (
    <div className={` px-2 py-5 w-full shadow-xl`}>
      <Skeleton avatar paragraph={{ rows: 2 }} />
    </div>
  );
};

export default ArticleCardSkeleton;
