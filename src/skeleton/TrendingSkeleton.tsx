import Skeleton from "react-loading-skeleton";

interface TrendingSkeletonProps {}

const TrendingSkeleton: React.FC<TrendingSkeletonProps> = () => {
  return (
    <div className="trending-wrapper">
      <div className="post-wrapper">
        <Skeleton className="post-img" />
        <div className="post-info" style={{ width: "700px" }}>
          <strong>
            <Skeleton />
          </strong>
          <span>
            <Skeleton />
          </span>
          <h2 className="post-title">
            <Skeleton />
          </h2>
          <p className="post-des">
            <Skeleton />
          </p>
          <div className="post-user">
            <Skeleton className="user-img" />
            <div>
              <strong>
                <Skeleton style={{ width: "100px" }} />
              </strong>
              {/* <p className="user-position">{article.author.}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSkeleton;
