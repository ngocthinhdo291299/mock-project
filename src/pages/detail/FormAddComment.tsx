import { useState } from "react";
import { Link } from "react-router-dom";
import { routes, TOKEN } from "../../constants";
import { getLocal } from "../../helpers";

interface FormAddCommentProps {
  onSubmit: (event: any, length: number) => Promise<void>;
  onChangeInput: (event: any) => void;
  inputValue: string;
  comments: any;
}

const FormAddComment: React.FC<FormAddCommentProps> = ({
  onSubmit,
  onChangeInput,
  inputValue,
  comments,
}) => {
  return (
    <>
      {getLocal(TOKEN) ? (
        <form
          className="flex comment-post items-center"
          onSubmit={(event: any) => {
            onSubmit(event, comments.length);
          }}
        >
          <div className="flex justify-center align-center w-12">
            <i className="fa-regular fa-face-smile"></i>
          </div>
          <input
            placeholder="Add a comment..."
            name="comment"
            value={inputValue}
            className="bg-transparent grow outline-none px-4 pt-4 my-0 w-3/5 h-14 resize-none"
            id="add"
            onChange={onChangeInput}
          />
          <button
            type="submit"
            className="flex justify-center align-center w-12"
          >
            <i className="fa-solid fa-share"></i>
          </button>
        </form>
      ) : (
        <Link to={routes.LOGIN} className="comment-post p-3 text-center">
          Log in to comment
        </Link>
      )}
    </>
  );
};

export default FormAddComment;
