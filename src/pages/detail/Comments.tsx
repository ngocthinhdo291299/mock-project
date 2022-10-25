import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { articleApi } from "../../apis";
import { BoxOption } from "../../components";
import { routes } from "../../constants";
import { utilitiesToken } from "../../helpers";
import { COMMENT_WANT_TO_DELETE } from "../../redux/slice/articleSlice";
import { articleType } from "../../types";

interface CommentsProps {
  comments: any;
  setPopConfirm: any;
  articleBySlug: articleType;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  setPopConfirm,
  articleBySlug,
}) => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [_, setForceUpdate] = useState<symbol>(Symbol());

  const optionListCommnetCurrentUser = ["Edit", "Delete"];
  const optionListCommentOtherUsers = ["Hidden", "Report"];

  const articleCopy = useRef({ ...articleBySlug });

  useEffect(() => {
    window.addEventListener("mousedown", (event: any) => {
      const activeBox = document.querySelector(".box-comment-option-active");
      const activeBoxParent = document.querySelector(
        ".box-comment-option-active"
      )?.parentElement;
      if (!activeBoxParent?.contains(event.target)) {
        activeBox?.classList.toggle("box-comment-option-active");
        activeBox?.classList.toggle("box-comment-option-hidden");
      }
    });
  }, []);
  function handleToggleBoxEditComment(event: any) {
    const boxCommentOption = event.target.nextSibling;
    boxCommentOption.classList.toggle("box-comment-option-active");
    boxCommentOption.classList.toggle("box-comment-option-hidden");
  }

  function handleShowPopConfirm(comment: any) {
    dispatch(COMMENT_WANT_TO_DELETE({ comment, slug }));
    setPopConfirm(true);
    const activeBox = document.querySelector(".box-comment-option-active");
    activeBox?.classList.remove("box-comment-option-active");
    activeBox?.classList.add("box-comment-option-hidden");
  }

  async function handleToggleFavorite() {
    if (!utilitiesToken.getName()) {
      navigate(routes.LOGIN);
    }
    if (articleCopy.current.favorited) {
      articleCopy.current.favorited = false;
      articleCopy.current.favoritesCount -= 1;
      articleApi.unFavorite(articleBySlug.slug);
    } else {
      articleCopy.current.favorited = true;
      articleCopy.current.favoritesCount += 1;
      articleApi.favorite(articleBySlug.slug);
    }
    setForceUpdate(Symbol());
  }

  return (
    <>
      <div className="comment-box overflow-auto flex-1 ">
        {/* <hr className="mt-20" /> */}
        <h1 className="font-light m-0 text-xl hidden md:block text-center ">
          Comments
        </h1>
        {comments.map((comment: any, index: number) => (
          <div key={index} className="px-7 mb-4">
            <div className="flex items-center justify-between mt-3 mb-4">
              <Link
                to={`/${comment.author.username}`}
                className="flex items-center"
              >
                <div className="ant-avatar ant-avatar-circle ant-avatar-image">
                  <img src={comment.author.image} alt="" />
                </div>
                <div className="ml-2 mr-12">
                  <div className="font-semibold inline-block text-base mt-1">
                    {comment.author.username}
                  </div>
                </div>
              </Link>
              <div className="relative">
                <i
                  onClick={handleToggleBoxEditComment}
                  className="fa-solid fa-ellipsis"
                ></i>
                {utilitiesToken.getName() &&
                comment.author.username === utilitiesToken.getName() ? (
                  <div className={`box-comment-option-hidden`}>
                    <BoxOption
                      optionList={optionListCommnetCurrentUser}
                      arrayOnClick={[
                        undefined,
                        () => handleShowPopConfirm(comment),
                      ]}
                      index={index}
                    />
                  </div>
                ) : (
                  <div className={`box-comment-option-hidden `}>
                    <BoxOption
                      optionList={optionListCommentOtherUsers}
                      arrayOnClick={[undefined, undefined]}
                      index={index}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="rounded outline-none p-4 border border-slate-300 resize-none">
              {comment.body}
            </div>
            <div className="text-xs mt-2 text-right">
              {moment(comment.createdAt).fromNow()}
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 border-t py-3 ">
        <div className="flex gap-x-4 items-center ">
          {articleCopy.current.favorited ? (
            <i
              onClick={handleToggleFavorite}
              className="fa-solid fa-heart text-red-500"
            ></i>
          ) : (
            <i
              onClick={handleToggleFavorite}
              className="fa-regular fa-heart active:scale-125 duration-200 transition-all"
            ></i>
          )}

          <i className="fa-regular fa-comment"></i>
        </div>

        <span className="mt-1 block">
          {articleCopy.current.favoritesCount} lượt thích
        </span>
        <span className="block text-xs mt-1 ">
          {moment(articleBySlug.createdAt).fromNow()}
        </span>
      </div>
    </>
  );
};

export default Comments;
