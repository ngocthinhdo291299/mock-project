import { Avatar } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { articleApi } from "../../apis";
import { imageList } from "../../constants";
import { useCloseSroll } from "../../hooks";
import { selectTagList } from "../../redux/selector";
import ArticleListSkeleton from "../../skeleton/ArticleListSkeleton";
import { articleType } from "../../types";

interface ModalProps {
  onClose: (event: any) => void;
  currentTag: string;
  setCurrentTag: any;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  currentTag,
  setCurrentTag,
}) => {
  const [articleByTag, setArticleByTag] = useState<articleType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const tagList = useSelector(selectTagList);

  useCloseSroll();
  useEffect(() => {
    async function fetchArticleByTag() {
      try {
        setLoading(true);
        const { articles }: any = await articleApi.filterByTag(currentTag);
        setLoading(false);
        setArticleByTag(articles);
      } catch (error) {}
    }
    fetchArticleByTag();
  }, [currentTag]);

  return (
    <div className="fixed flex md:flex-row flex-col top-0 left-0 p-10 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] z-50 ">
      <div className="relative h-full p-10 flex-col-reverse  md:flex-row flex justify-end w-full overflow-auto bg-white">
        <i
          onClick={onClose}
          className="absolute fa-solid fa-circle-xmark right-4 top-4 text-2xl cursor-pointer"
        ></i>

        {loading ? (
          <div className="w-full">
            <ArticleListSkeleton />
          </div>
        ) : (
          <>
            {articleByTag.length > 0 && (
              <div className="w-full">
                {articleByTag.map((article: articleType, index: number) => (
                  <div className="flex justify-between mb-10">
                    <div className="w-[60%]">
                      <div className="user">
                        <Link to={`/${article.author.username}`}>
                          <Avatar
                            src={article.author.image}
                            alt=""
                            className="avatar"
                          />
                        </Link>
                        <Link to={`/${article.author.username}`}>
                          <span className="name">
                            {article.author.username}
                          </span>
                        </Link>
                      </div>
                      <Link
                        to={`/article/${article.slug}`}
                        className="article-content"
                      >
                        <h2 className="title">{article.title}</h2>
                        <p className="des">{article.description}</p>
                      </Link>
                      <div className="end-post-text">
                        <p className="post-time">
                          {moment(article.createdAt).format("LL")}
                        </p>
                        {/* <span>·</span> */}
                        {/* <p className="tag">Humor</p> */}
                      </div>
                    </div>
                    <Link to={`/article/${article.slug}`} className="w-[40%]">
                      <img src={imageList[index]} alt="" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        <div className=" bg-white rounded-sm  max-h-[200px] md:ml-5 md:mt-4 md:p-5 md:max-w-[350px] mb-5 pb-5 md:pb-0  border-b border-black md:border-none">
          <div className="">
            <p className="top-text ">DISCOVER MORE OF WHAT MATTERS TO YOU</p>
            <div className="list-category">
              {tagList.map((tag) => (
                <p
                  onClick={() => setCurrentTag(tag)}
                  key={tag}
                  className={`category-item ${
                    tag === currentTag ? "tag-current" : ""
                  }`}
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
