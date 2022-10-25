import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectArticleBySlug } from "../../redux/selector";
import { FETCH_ARTICLE_BY_SLUG_REQUESTED } from "../../redux/slice/articleSlice";
import { FormSkeleton } from "../../skeleton";
import Editor from "../editor/Editor";

interface UpdateArticleProps {}

const UpdateArticle: React.FC<UpdateArticleProps> = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const articleBySlug = useSelector(selectArticleBySlug);

  useEffect(() => {
    dispatch(FETCH_ARTICLE_BY_SLUG_REQUESTED(slug));
  }, []);
  const data = {
    title: articleBySlug?.title || "",
    description: articleBySlug?.description || "",
    body: articleBySlug?.body || "",
    tagList: articleBySlug?.tagList || [],
  };
  if (!articleBySlug) {
    return <FormSkeleton title="Update Your Article" />;
  }
  return (
    <div>
      <Editor data={data} slug={articleBySlug.slug} isModeUpdate={true} />
    </div>
  );
};

export default UpdateArticle;
