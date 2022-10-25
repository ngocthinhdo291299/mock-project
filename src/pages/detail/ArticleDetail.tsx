import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { articleApi } from "../../apis";
import { BoxOption, PopConfirm } from "../../components";
import { routes, TOKEN } from "../../constants";
import { getLocal, utilitiesToken } from "../../helpers";
import convertToken from "../../helpers/convertToken";
import { useClickOutside } from "../../hooks";
import { selectIsDeleteArticleSucceeded } from "../../redux/selector";
import {
  selectLoadingFollow,
  selectNewProfileUserAfterToggleFollow,
} from "../../redux/selector/userSelector";
import { DELETE_ARTICLE_BY_SLUG_REQUESTED } from "../../redux/slice/articleSlice";
import { TOGGLE_FOLLOW_USER_REQUESTED } from "../../redux/slice/userSlice";
import { articleType } from "../../types";

interface ArticleProps {
  articleBySlug: articleType;
}

const ArticleDetail: React.FC<ArticleProps> = ({ articleBySlug }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [boxConfirm, setBoxConfirm] = useState<boolean>(false);
  const articleOptionRef = useRef<any>();
  const modalConfirmRef = useRef<any>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useClickOutside([articleOptionRef, modalConfirmRef], () => setOpen(false));

  const newProfileUserAfterToggleFollow = useSelector(
    selectNewProfileUserAfterToggleFollow
  );
  const isDeleteArticleSucceeded = useSelector(selectIsDeleteArticleSucceeded);

  const loadingToggleFollow = useSelector(selectLoadingFollow);

  const isArticleOfUser =
    getLocal(TOKEN) &&
    articleBySlug.author.username === convertToken(getLocal(TOKEN)).username;

  useEffect(() => {
    if (isDeleteArticleSucceeded) {
      navigate(routes.HOME);
    }
  }, [isDeleteArticleSucceeded]);

  function handleToggleFollow() {
    if (!utilitiesToken.getName()) {
      navigate(routes.LOGIN);
      return;
    }
    dispatch(
      TOGGLE_FOLLOW_USER_REQUESTED(
        newProfileUserAfterToggleFollow || articleBySlug.author
      )
    );
  }

  async function handleDeleteArtile() {
    dispatch(DELETE_ARTICLE_BY_SLUG_REQUESTED(articleBySlug.slug));
    setBoxConfirm(false);
    setOpen(false);
  }
  return (
    <>
      <div className="flex items-center justify-between mt-8 mx-8">
        <div className="flex items-center">
          <Link
            to={`/${articleBySlug.author.username}`}
            className="ant-avatar ant-avatar-circle ant-avatar-image"
          >
            <img src={articleBySlug.author.image} alt="" />
          </Link>
          <div className="ml-2 mr-12 py-2">
            <Link
              to={`/${articleBySlug.author.username}`}
              className="font-bold inline-block text-base mt-3"
            >
              {articleBySlug.author.username}
            </Link>
            <div className="mb-3 font-light">
              {moment(articleBySlug.createdAt).format("LL")}
            </div>
          </div>
        </div>

        {isArticleOfUser ? (
          <div className="relative" ref={articleOptionRef}>
            <i
              onClick={() => setOpen(!open)}
              className="fa-solid fa-ellipsis cursor-pointer text-xl"
            ></i>
            {open && (
              <BoxOption
                optionList={[" Edit ", "Delete "]}
                arrayOnClick={[
                  () => navigate(`${routes.EDITOR}/${articleBySlug.slug}`),
                  () => {
                    setBoxConfirm(true);
                    setOpen(false);
                  },
                ]}
              />
            )}
          </div>
        ) : (
          <div>
            {loadingToggleFollow ? (
              <i className="fa fa-spinner fa-spin follow"></i>
            ) : (
              <button onClick={handleToggleFollow} className="follow">
                {(newProfileUserAfterToggleFollow || articleBySlug.author)
                  ?.following
                  ? "Unfollow"
                  : "Follow"}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="mx-8">
        <h1 className="font-medium text-base">{articleBySlug.description}</h1>
      </div>
      <div ref={modalConfirmRef}>
        {boxConfirm && (
          <PopConfirm
            handleNo={() => {
              setBoxConfirm(false);
            }}
            handleYes={handleDeleteArtile}
            title="Delete Article"
            confirmQuestion="Are you sure you want to delete this article?"
          />
        )}
      </div>
    </>
  );
};

export default ArticleDetail;
