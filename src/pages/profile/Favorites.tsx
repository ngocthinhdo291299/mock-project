import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectFavoritedArticle,
  selectLoadingFavoritedArticle,
} from "../../redux/selector";
import { FETCH_FAVORITED_ARTICLE_REQUESTD } from "../../redux/slice/articleSlice";
import { PostCardSkeleton } from "../../skeleton";
import { articleType } from "../../types";
import FavoritedArticleCardItem from "./FavoritedArticleCardItem";
interface FavoritesProps {}

const Favorites: React.FC<FavoritesProps> = () => {
  const dispatch = useDispatch();
  const favoritedArticles = useSelector(selectFavoritedArticle);
  const loading = useSelector(selectLoadingFavoritedArticle);
  const { username } = useParams();

  useEffect(() => {
    dispatch(FETCH_FAVORITED_ARTICLE_REQUESTD(username));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-8 mt-6 ">
        {Array(4)
          .fill(0)
          .map((_) => (
            <div className="w-full sm:w-[calc(50%-1rem)]">
              <PostCardSkeleton />
            </div>
          ))}
      </div>
    );
  }
  if (favoritedArticles && favoritedArticles.length === 0) {
    return <p className="text-center mt-4">No articles are here... yet.</p>;
  }
  return (
    <div className="relative flex flex-wrap gap-8 mt-10 ">
      {favoritedArticles &&
        favoritedArticles.map(
          (favoritedArticle: articleType, index: number) => (
            <div key={index} className="w-[calc(50%-1rem)]">
              <FavoritedArticleCardItem favoritedArticle={favoritedArticle} />
            </div>
          )
        )}
    </div>
  );
};

export default Favorites;
