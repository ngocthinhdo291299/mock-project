import Skeleton from "react-loading-skeleton";
import "../sass/css/form.css";
interface FormSkeletonProps {
  title: string;
}

const FormSkeleton: React.FC<FormSkeletonProps> = ({ title }) => {
  return (
    <div className="my-form">
      <div className="container mt-12">
        <form>
          <h1 className="text-2xl">{title}</h1>
          <p className="w-full ">
            <Skeleton className="h-[40px] mb-3" />
            <Skeleton className="h-[40px]  mb-3" />
            <Skeleton className="h-[60px]  mb-3" />
            <Skeleton className="h-[40px]  mb-3" />
            <Skeleton className="h-[40px]  mb-3" />
          </p>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default FormSkeleton;
