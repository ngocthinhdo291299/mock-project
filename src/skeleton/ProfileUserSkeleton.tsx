import Skeleton from "react-loading-skeleton";
import { Skeleton as SkeletonAntd } from "antd";
interface ProfileUserSkeletonProps {}

const ProfileUserSkeleton: React.FC<ProfileUserSkeletonProps> = () => {
  return (
    <div className="px-8 md:px-20">
      <div className="favorited-article relative max-w-[1100px]  m-auto mt-20">
        <div className="w-full h-[300px] absolute">
          <img
            className="h-full w-full absolute object-cover"
            src="https://img1.kienthucvui.vn/uploads/2020/08/02/hinh-nen-mau-trang-dep-nhat-full-hd_030746842.jpg"
            alt=""
          />
        </div>
        <div className="flex-col items-center relative flex top-40 ">
          <div className=" w-[18.75rem] z-40 relative   ">
            <div className="relative">
              <SkeletonAntd.Image style={{ width: "200px", height: "210px" }} />
            </div>
          </div>
          <div className=" z-50  relative top-4  w-full   ">
            <div className="w-32 m-auto md:m-0 ">
              <h3 className=" text-2xl text-black ">
                <Skeleton />
              </h3>
              <p>
                <Skeleton />
              </p>
            </div>
            <div className=" border-b flex w-full mt-5  gap-x-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserSkeleton;
