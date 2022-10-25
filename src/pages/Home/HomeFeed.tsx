import { useDispatch, useSelector } from "react-redux";
import {
  selectArticleFeed,
  selectLoadingTagList,
  selectTagList,
} from "../../redux/selector";
import { Link, useNavigate } from "react-router-dom";
import "./HomeFeed.scss";
import { Avatar } from "antd";
import { useEffect, useRef, useState } from "react";
import { FETCH_TAGLIST_REQUESTED } from "../../redux/slice/articleSlice";
import TagListSkeleton from "../../skeleton/TagListSkeleton";
import { articleType } from "../../types";
import Modal from "./Modal";
import { ArticleListSkeleton } from "../../skeleton";
import moment from "moment";
import { imageList } from "../../constants";

const HomeFeed = () => {
  const dispatch = useDispatch();

  const boxTagRef = useRef<HTMLDivElement>(null);
  const [modalFilterByTag, setModalFilterByTag] = useState<boolean>(false);
  const [currentTag, setCurrentTag] = useState<string>("");

  const articles = useSelector(selectArticleFeed);
  const tagList = useSelector(selectTagList);
  const loadingTagList = useSelector(selectLoadingTagList);

  useEffect(() => {
    dispatch(FETCH_TAGLIST_REQUESTED());
  }, []);

  function handleFilterByTag(tag: string) {
    setModalFilterByTag(true);
    setCurrentTag(tag);
    boxTagRef.current?.classList.add("fixed-tag");
  }

  function handleCloseModelFilterByTag() {
    setModalFilterByTag(false);
    boxTagRef.current?.classList.remove("fixed-tag");
  }

  return (
    <div className="homefeed-wrapper">
      <div className="list-article">
        {articles.length <= 0 ? (
          <ArticleListSkeleton />
        ) : (
          <>
            {articles.map((article: articleType, index: number) => (
              <div key={index} className="article-form">
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
                      <span className="name">{article.author.username}</span>
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
                  </div>
                </div>
                <Link to={`/article/${article.slug}`} className="w-[40%]">
                  <img src={imageList[index]} alt="" className="article-img" />
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="list-category-wrapper ">
        <div ref={boxTagRef} className="sticky top-24">
          <p className="top-text">DISCOVER MORE OF WHAT MATTERS TO YOU</p>

          {tagList.length > 0 ? (
            <div className="list-category">
              {tagList.map((tag) => (
                <p
                  onClick={() => handleFilterByTag(tag)}
                  key={tag}
                  className="category-item"
                >
                  {tag}
                </p>
              ))}
            </div>
          ) : (
            <TagListSkeleton />
          )}
        </div>
      </div>
      {modalFilterByTag && (
        <Modal
          onClose={handleCloseModelFilterByTag}
          currentTag={currentTag}
          setCurrentTag={setCurrentTag}
        />
      )}
    </div>
  );
};

export default HomeFeed;
