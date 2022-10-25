import { useSelector } from "react-redux";
import {
  selectArticleByAuthor,
  selectLoadingArticleByAuthor,
} from "../../redux/selector";
import { PostCardSkeleton } from "../../skeleton";
import { articleType } from "../../types";
import FavoritedArticleCardItem from "./FavoritedArticleCardItem";

interface ArticleByAuthorProps {}

const ArticleByAuthor: React.FC<ArticleByAuthorProps> = () => {
  const articleByAuthor = useSelector(selectArticleByAuthor);
  const loading = useSelector(selectLoadingArticleByAuthor);

  if (loading) {
    <div className="flex flex-wrap gap-8 mt-6">
      {Array(4)
        .fill(0)
        .map((_) => (
          <div className="w-full sm:w-[calc(50%-1rem)]">
            <PostCardSkeleton />
          </div>
        ))}
    </div>;
  }
  if (articleByAuthor && articleByAuthor.length <= 0) {
    return <p className="text-center mt-4">No articles are here... yet.</p>;
  }
  return (
    <div className="flex flex-wrap gap-8 mt-10">
      {articleByAuthor &&
        articleByAuthor.map((article: articleType, index: number) => (
          <div key={index} className=" w-full sm:w-[calc(50%-1rem)] ">
            <FavoritedArticleCardItem favoritedArticle={article} />
          </div>
        ))}
    </div>
  );
};

export default ArticleByAuthor;
