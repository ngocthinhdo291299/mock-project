import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { articleApi } from "../../apis";
import { PopConfirm } from "../../components";
import { useScrollToTop } from "../../hooks";
import {
  selectArticleBySlug,
  selectCommentWantToDelete,
} from "../../redux/selector";
import {
  CLEAN_UP_ARTILCE_STATE,
  FETCH_ARTICLE_BY_SLUG_REQUESTED,
} from "../../redux/slice/articleSlice";
import { commentType } from "../../types/articleType";
import DetailArticleSkeleton from "../../skeleton/DetailArticleSkeleton";
import ArticleDetail from "./ArticleDetail";
import Comments from "./Comments";
import FormAddComment from "./FormAddComment";
import { utilitiesToken } from "../../helpers";
import moment from "moment";

const DetailArticle: React.FC = () => {
  const { slug }: any = useParams();
  const dispatch = useDispatch();

  const [commentInput, setCommnetInput] = useState<string>("");
  const [popConfirm, setPopConfirm] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);

  const articleBySlug = useSelector(selectArticleBySlug);
  const commentWantToDelete = useSelector(selectCommentWantToDelete);

  useScrollToTop();

  useEffect(() => {
    async function fetchComments() {
      const comments: any = await articleApi.getComments(slug);
      setComments(comments.comments);
    }
    fetchComments();
  }, [slug]);

  useEffect(() => {
    return () => {
      dispatch(CLEAN_UP_ARTILCE_STATE());
    };
  }, []);

  useEffect(() => {
    dispatch(FETCH_ARTICLE_BY_SLUG_REQUESTED(slug));
  }, [slug]);

  async function handleDeleteComment() {
    try {
      setComments(
        comments.filter(
          (comment: commentType) =>
            comment.id !== commentWantToDelete.comment.id
        )
      );
      setPopConfirm(false);
      await articleApi.deleteComment(slug, commentWantToDelete.comment.id);
    } catch (error) {}
  }

  async function handleSubmitComment(event: any, length: number) {
    event.preventDefault();
    if (!commentInput) return;
    setCommnetInput("");
    const preloadData = {
      author: {
        username: utilitiesToken.getName(),
        bio: null,
        image: "",
        following: false,
      },
      body: commentInput,
      createdAt: moment.now(),
      id: 1,
      updatedAt: "",
      isDone: false,
    };

    setComments((preComments) => [{ ...preloadData }, ...preComments]);
    try {
      const comment: any = await articleApi.addComment(
        { comment: { body: commentInput } },
        articleBySlug?.slug
      );

      setComments((preComments) => {
        console.log(length, { ...comment.comment }, preComments);
        preComments.splice(preComments.length - length - 1, 1, {
          ...comment.comment,
        });
        return [...preComments];
      });
    } catch (error) {}
  }

  if (!articleBySlug) {
    return <DetailArticleSkeleton />;
  }

  return (
    <div className="detail-form p-10">
      <div
        className="container justify-between flex flex-col md:flex-row mt-10 md:h-[80vh]"
        id="detail-body"
      >
        <div className="w-full md:w-[60%] mb-40 md:mb-0  ">
          <ArticleDetail articleBySlug={articleBySlug} />
        </div>
        <div className="comment mt-5 w-full md:w-[40%] h-[350px] md:h-auto ">
          {comments.length >= 0 && (
            <Comments
              comments={comments}
              setPopConfirm={setPopConfirm}
              articleBySlug={articleBySlug}
            />
          )}
          <FormAddComment
            comments={comments}
            inputValue={commentInput}
            onChangeInput={(e) => setCommnetInput(e.target.value)}
            onSubmit={handleSubmitComment}
          />
        </div>
      </div>
      {popConfirm && (
        <PopConfirm
          handleNo={() => setPopConfirm(false)}
          handleYes={handleDeleteComment}
          title="Delete Comment?"
          confirmQuestion="Are you sure you want to delete this comment?"
        />
      )}
    </div>
  );
};
export default DetailArticle;
