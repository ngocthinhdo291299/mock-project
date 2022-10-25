import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAN_UP_ARTILCE_STATE,
  FETCH_ARTICLES_REQUESTED,
  SET_IS_CREATE_ARTICLE_SUCCCEEDED,
  SET_IS_DELETE_ARTICLE_SUCCCEEDED,
  SET_IS_UPDATE_ARTICLE_SUCCCEEDED,
} from "../../redux/slice/articleSlice";
import Hero from "./Hero";
import HomeFeed from "./HomeFeed";
import { toast, ToastContainer } from "react-toastify";
import {
  selectIsCreateArticleSucceeded,
  selectIsDeleteArticleSucceeded,
  selectIsUpdateArticleSucceeded,
} from "../../redux/selector";
import ArticleList from "./ArticleList";
import Footer from "../../components/Footer/Footer";
interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
  const dispatch = useDispatch();
  const isUpdateArticleSucceeded = useSelector(selectIsUpdateArticleSucceeded);
  const isCreateArticleSucceeded = useSelector(selectIsCreateArticleSucceeded);
  const isDeleteArticleSucceeded = useSelector(selectIsDeleteArticleSucceeded);

  useEffect(() => {

    dispatch(FETCH_ARTICLES_REQUESTED());
    return () => {
      dispatch(CLEAN_UP_ARTILCE_STATE());
    };
  }, []);

  const createNotify = () => toast.success("Create article succeeded");
  const updateNotify = () => toast.success("Update article succeeded");
  const deleteNotify = () => toast.success("Delete article succeeded");

  useEffect(() => {
    if (isCreateArticleSucceeded) {
      createNotify();
      dispatch(SET_IS_CREATE_ARTICLE_SUCCCEEDED(false));
      return;
    }
    if (isUpdateArticleSucceeded) {
      updateNotify();
      dispatch(SET_IS_UPDATE_ARTICLE_SUCCCEEDED(false));
      return;
    }
    if (isDeleteArticleSucceeded) {
      deleteNotify();
      dispatch(SET_IS_DELETE_ARTICLE_SUCCCEEDED(false));
    }
  }, [
    isUpdateArticleSucceeded,
    isCreateArticleSucceeded,
    isDeleteArticleSucceeded,
  ]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Hero />
      <ArticleList />
      <HomeFeed />
      <Footer />
    </div>
  );
};

export default Home;
