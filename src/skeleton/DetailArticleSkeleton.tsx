import { Skeleton } from "antd";

interface DetailArticleSkeletonProps {}

const DetailArticleSkeleton: React.FC<DetailArticleSkeletonProps> = () => {
  return (
    <div className="detail-form login-form p-10 mt-10">
      <div className="container p-5 flex-col md:flex-row flex" id="detail-body">
        <div className="w-full md:w-[40%]">
          <div className="p-5 mt-10">
            <Skeleton avatar />
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5 md:ml-10 w-full md:w-[60%]">
          <div className="flex justify-center">
            <Skeleton.Input />
          </div>
          <Skeleton avatar />
          <Skeleton avatar />
        </div>
      </div>
    </div>
  );
};

export default DetailArticleSkeleton;
