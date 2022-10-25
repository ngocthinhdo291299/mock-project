import { Button, Form, Input } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsCreateArticleSucceeded,
  selectIsUpdateArticleSucceeded,
  selectLoadingCreateArticle,
  selectLoadingUpdateArticle,
} from "../../redux/selector";
import {
  CREATE_ARTICLE_REQUESTED,
  SET_IS_CREATE_ARTICLE_SUCCCEEDED,
  SET_IS_UPDATE_ARTICLE_SUCCCEEDED,
  UPDATE_ARTICLE_REQUESTED,
} from "../../redux/slice/articleSlice";
import { inputCreateArticleType } from "../../types/settingsType";
import "../../sass/css/form.css";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components";
import { routes } from "../../constants";
import { toast, ToastContainer } from "react-toastify";
import { useFocusInput } from "../../hooks";
interface EditorProps {
  data?: {
    title: string | undefined;
    description: string | undefined;
    body: string | undefined;
    tagList: string[];
  };
  isModeUpdate?: boolean;
  slug?: string;
}

const Editor: React.FC<EditorProps> = ({ data, isModeUpdate, slug }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectLoadingCreateArticle);
  const loadingUpdateArticle = useSelector(selectLoadingUpdateArticle);
  const isUpdateArticleSucceeded = useSelector(selectIsUpdateArticleSucceeded);
  const isCreateArticleSucceeded = useSelector(selectIsCreateArticleSucceeded);

  const [tagList, setTagList] = useState<string[]>([]);
  const [inputTagList, setInputTagList] = useState<string>("");

  const titleInputRef = useRef<HTMLInputElement>(null);

  useFocusInput(titleInputRef);

  const initialValues = data
    ? data
    : {
      title: "",
      description: "",
      body: "",
      tagList,
    };

  const formik = useFormik({
    initialValues: initialValues,
    // enableReinitialize: true,
    onSubmit: (values) => {
      if (isModeUpdate) {
        dispatch(UPDATE_ARTICLE_REQUESTED({ values: values, slug }));
        return;
      }
      dispatch(CREATE_ARTICLE_REQUESTED(values));
    },
  });

  useEffect(() => {
    if (isCreateArticleSucceeded) {
      navigate(routes.HOME);
    }
    if (isUpdateArticleSucceeded) {
      navigate(routes.HOME);
    }
  }, [isCreateArticleSucceeded, isUpdateArticleSucceeded]);

  function handleEnterToAddTag(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "Enter") {
      if (tagList.includes(inputTagList)) return;
      if (isModeUpdate) {
        setTagList([...formik.values.tagList, inputTagList]);
        formik.setFieldValue("tagList", [
          ...formik.values.tagList,
          inputTagList,
        ]);
      } else {
        setTagList([...tagList, inputTagList]);
        formik.setFieldValue("tagList", [...tagList, inputTagList]);
      }
      setInputTagList("");
    }
  }

  function onKeyDown(event: any) {
    if ((event.charCode || event.keyCode) === 13) {
      event.preventDefault();
    }
  }

  function handleDeleteTag(index: number) {
    setTagList(tagList.filter((_, i) => i !== index));
    formik.setFieldValue("tagList", [...tagList.filter((_, i) => i !== index)]);
  }

  return (
    <div className="my-form transparent-form">
      {(loading || loadingUpdateArticle) && <Loading />}
      <div className="container mt-8 md:mt-20">
        <form onSubmit={formik.handleSubmit} onKeyDown={onKeyDown}>
          <h1 className="text-2xl">
            {isModeUpdate ? "Update Your" : "Create New"} Article
          </h1>
          <input
            required
            onChange={formik.handleChange}
            type="text"
            placeholder="Article Title"
            name="title"
            value={formik.values.title}
            ref={titleInputRef}
          />
          <input
            required
            onChange={formik.handleChange}
            type="text"
            placeholder="Article Description"
            name="description"
            value={formik.values.description}
          />
          <textarea
            required
            onChange={formik.handleChange}
            placeholder="Write Your Article"
            name="body"
            rows={8}
            value={formik.values.body}
          />
          <input
            onKeyUp={handleEnterToAddTag}
            onChange={(e: any) => setInputTagList(e.target.value)}
            type="text"
            value={inputTagList}
            placeholder="Enter Tags"
            name="tagList"
          />
          <div className="flex flex-start gap-x-3 min-w-full">
            {(formik.values.tagList || tagList).map((tag, index) => (
              <span
                key={index}
                className="p-2 text-white rounded-full bg-gray-400"
              >
                <i
                  onClick={() => handleDeleteTag(index)}
                  className="fa-solid fa-xmark cursor-pointer mr-1"
                ></i>{" "}
                {tag}
              </span>
            ))}
          </div>
          <button type="submit">
            {isModeUpdate ? "Update" : "Publish"} Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editor;
