import { Avatar } from "antd";
import { useSelector } from "react-redux";
import "./ArticleList.scss";
import { selectArticleFeed } from "../../redux/selector";
import { Link } from "react-router-dom";
import PostCartSkeleton from "../../skeleton/ArticleCardSkeleton";
import moment from "moment";
interface ArticleListProps {}

const ArticleList: React.FC<ArticleListProps> = () => {
  let articles = useSelector(selectArticleFeed);

  if (articles.length <= 0) {
    return (
      <div className="article-list-wrapper">
        <div className="flex flex-wrap w-full gap-8">
          {Array(6)
            .fill(0)
            .map((_) => (
              <div className=" w-full sm:w-[calc(50%-1rem)] md:w-[calc(33%-1.3rem)] ">
                <PostCartSkeleton />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="article-list-wrapper">
        <h3 className="top-text  font-bold mb-5">
          <i className="fa-solid fa-fire mr-2 text-red-500"></i>Popular on
          TECHLover
        </h3>
        <div className="list-wrapper">
          {articles.map((article, index: number) => (
            <div key={index} className="article-wrapper">
              <span className="number-order">0{index + 1}</span>
              <div className="article-form">
                <div className="article-top">
                  <div className="user">
                    <Link to={`/${article.author.username}`}>
                      <Avatar
                        src={article.author.image}
                        alt=""
                        className="avatar"
                      />
                    </Link>
                    <Link to={`/${article.author.username}`}>
                      <span className="name text-xs">
                        {article.author.username}
                      </span>
                    </Link>
                  </div>
                </div>
                <Link
                  to={`/article/${article.slug}`}
                  className="article-content "
                >
                  <p className="title">{article.title}</p>
                  <p>{article.description}</p>
                </Link>
                <div>
                  <p className="post-time text-gray-400">
                    {moment(article.createdAt).format("LL")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </>
  );
};

export default ArticleList;
