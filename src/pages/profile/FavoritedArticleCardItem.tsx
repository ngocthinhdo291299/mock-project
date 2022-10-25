import { Avatar } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { articleApi } from "../../apis";
import { selectComments } from "../../redux/selector";
import { FETCH_COMMENTS_REQUESTED } from "../../redux/slice/articleSlice";
import { articleType } from "../../types";

interface FavoritedArticleCardItemProps {
  favoritedArticle: articleType;
}

const FavoritedArticleCardItem: React.FC<FavoritedArticleCardItemProps> = ({
  favoritedArticle,
}) => {
  const [comments, setComments] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const comments: any = await articleApi.getComments(favoritedArticle.slug);
      setComments(comments.comments);
    })();
  }, []);

  return (
    <div className="shadow-lg ">
      <div className="p-4">
        <Link to={`/${favoritedArticle.author.username}`}>
          <Avatar src={favoritedArticle.author.image} />
          <span className="ml-2"> {favoritedArticle.author.username}</span>
        </Link>
        <Link
          to={`/article/${favoritedArticle.slug}`}
          className="mt-4 block text-lg"
        >
          {favoritedArticle.description}
        </Link>
      </div>
      <div className="flex justify-between items-center py-2 px-5 bg-gray-300">
        <span className="text-base">
          <i className="fa-solid fa-comment"></i> {comments.length} comments
        </span>
        <button
          disabled
          className="active:scale-125 cursor-pointer transition-all duration-150"
        >
          <i
            className={`fa-solid fa-heart ${
              favoritedArticle.favorited ? "text-red-600" : ""
            }`}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default FavoritedArticleCardItem;
