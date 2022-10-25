import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { articleType } from "../../types";
import { commentType } from "../../types/articleType";

interface initialSateArticleType {
  articles: articleType[];
  articleBySlug: articleType | undefined;
  favoritedArticle: undefined | articleType[];
  articleAfterLike: articleType[] | undefined;
  articleByAuthor: undefined | articleType[];
  articleForSearching: articleType[];
  comments: commentType[];
  tagList: string[];
  loadingFavoritedArticle: boolean;
  loadingTagList: boolean;
  loadingComments: boolean;
  loadingArticleByAuthor: boolean;
  loading: boolean;
  errorMessage: string;
  loadingCreateArticle: boolean;
  loadingUpdateArticle: boolean;
  isCreateArticleSucceeded: boolean;
  isUpdateArticleSucceeded: boolean;
  isDeleteArticleSucceeded: boolean;
  commentWantToDelete: any;
}

const initialState: initialSateArticleType = {
  articles: [],
  articleBySlug: undefined,
  articleByAuthor: undefined,
  articleAfterLike: undefined,
  articleForSearching: [],
  favoritedArticle: undefined || [],
  loading: false,
  comments: [],
  tagList: [],
  loadingFavoritedArticle: false,
  loadingTagList: false,
  loadingComments: false,
  loadingArticleByAuthor: false,
  errorMessage: "",
  loadingCreateArticle: false,
  loadingUpdateArticle: false,
  isCreateArticleSucceeded: false,
  isUpdateArticleSucceeded: false,
  isDeleteArticleSucceeded: false,
  commentWantToDelete: undefined,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    FETCH_ARTICLES_REQUESTED: (state) => {
      state.loading = true;
    },
    FETCH_ARTICLES_SUCCEEDED: (state, action: PayloadAction<articleType[]>) => {
      state.loading = false;
      state.articles = action.payload;
      state.articleForSearching = action.payload;
    },
    FETCH_ARTICLES_FAILED: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    FETCH_ARTICLE_BY_SLUG_REQUESTED: (state, _) => {
      state.loading = true;
    },
    FETCH_ARTICLE_BY_SLUG_SUCCEEDED: (state, action) => {
      state.loading = false;
      state.articleBySlug = action.payload;
    },
    FETCH_ARTICLE_BY_SLUG_FAILED: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    FETCH_FAVORITED_ARTICLE_REQUESTD: (state, action) => {
      state.loadingFavoritedArticle = true;
    },
    FETCH_FAVORITED_ARTICLE_SUCCEEDED: (state, action) => {
      state.loadingFavoritedArticle = false;
      state.favoritedArticle = action.payload;
    },
    FETCH_FAVORITED_ARTICLE_FAILED: (state, action) => {
      state.loadingFavoritedArticle = false;
    },
    FETCH_COMMENTS_REQUESTED: (state, action) => {
      state.loadingComments = true;
    },
    FETCH_COMMENTS_SUCCEEDED: (state, action) => {
      state.loadingComments = false;
      state.comments = action.payload;
    },
    FETCH_COMMENTS_FAILED: (state, action) => {
      state.loadingComments = false;
    },
    FETCH_ARTICLE_BY_AUTHOR_REQUESTED: (state, action) => {
      state.loadingArticleByAuthor = true;
    },
    FETCH_ARTICLE_BY_AUTHOR_SUCCEEDED: (state, action) => {
      state.loadingArticleByAuthor = false;
      state.articleByAuthor = action.payload;
    },
    FETCH_ARTICLE_BY_AUTHOR_FAILED: (state, action) => {
      state.loadingArticleByAuthor = false;
    },
    CREATE_ARTICLE_REQUESTED: (state, _) => {
      state.loadingCreateArticle = true;
    },
    CREATE_ARTICLE_SUCCEEDED: (state) => {
      state.loadingCreateArticle = false;
      state.isCreateArticleSucceeded = true;
    },
    CREATE_ARTICLE_FAILED: (state, _) => {
      state.loadingCreateArticle = false;
    },
    UPDATE_ARTICLE_REQUESTED: (state, _) => {
      state.loadingUpdateArticle = true;
    },
    UPDATE_ARTICLE_SUCCEEDED: (state) => {
      state.loadingUpdateArticle = false;
      state.isUpdateArticleSucceeded = true;
    },
    UPDATE_ARTICLE_FAILED: (state, _) => {
      state.loadingUpdateArticle = false;
    },
    COMMENT_WANT_TO_DELETE: (state, action) => {
      state.commentWantToDelete = action.payload;
    },
    TOGGLE_LIKE_POST_REQUESTED: (state, action) => {},
    TOGGLE_LIKE_POST_SUCCEEDED: (state, action) => {
      console.log(action.payload);
      state.articleAfterLike = action.payload;
    },
    CLEAN_UP_ARTILCE_STATE: (state) => {
      state.articleAfterLike = undefined;
      state.articleBySlug = undefined;
      state.articles = [];
    },
    FETCH_TAGLIST_REQUESTED: (state) => {
      state.loadingTagList = true;
    },
    FETCH_TAGLIST_SUCCEEDED: (state, action) => {
      state.loadingTagList = false;
      state.tagList = action.payload;
    },
    FETCH_TAGLIST_FAILED: (state) => {
      state.loadingTagList = false;
    },
    SET_IS_CREATE_ARTICLE_SUCCCEEDED: (state, action) => {
      state.isCreateArticleSucceeded = action.payload;
    },
    SET_IS_UPDATE_ARTICLE_SUCCCEEDED: (state, action) => {
      state.isUpdateArticleSucceeded = action.payload;
    },
    SET_IS_DELETE_ARTICLE_SUCCCEEDED: (state, action) => {
      state.isDeleteArticleSucceeded = action.payload;
    },
    DELETE_ARTICLE_BY_SLUG_REQUESTED: (state, action) => {},
    DELETE_ARTICLE_BY_SLUG_SUCCEEDED: (state) => {
      state.isDeleteArticleSucceeded = true;
    },
    DELETE_ARTICLE_BY_SLUG_FAILED: (state, action) => {},
  },
});

export const {
  FETCH_ARTICLES_FAILED,
  FETCH_ARTICLES_REQUESTED,
  FETCH_ARTICLES_SUCCEEDED,
  FETCH_ARTICLE_BY_SLUG_REQUESTED,
  FETCH_ARTICLE_BY_SLUG_SUCCEEDED,
  FETCH_ARTICLE_BY_SLUG_FAILED,
  FETCH_FAVORITED_ARTICLE_FAILED,
  FETCH_FAVORITED_ARTICLE_REQUESTD,
  FETCH_FAVORITED_ARTICLE_SUCCEEDED,
  FETCH_COMMENTS_FAILED,
  FETCH_COMMENTS_REQUESTED,
  FETCH_COMMENTS_SUCCEEDED,
  FETCH_ARTICLE_BY_AUTHOR_FAILED,
  FETCH_ARTICLE_BY_AUTHOR_REQUESTED,
  FETCH_ARTICLE_BY_AUTHOR_SUCCEEDED,
  FETCH_TAGLIST_FAILED,
  FETCH_TAGLIST_REQUESTED,
  FETCH_TAGLIST_SUCCEEDED,
  TOGGLE_LIKE_POST_REQUESTED,
  TOGGLE_LIKE_POST_SUCCEEDED,
  CREATE_ARTICLE_FAILED,
  CREATE_ARTICLE_REQUESTED,
  CREATE_ARTICLE_SUCCEEDED,
  DELETE_ARTICLE_BY_SLUG_REQUESTED,
  DELETE_ARTICLE_BY_SLUG_FAILED,
  DELETE_ARTICLE_BY_SLUG_SUCCEEDED,
  COMMENT_WANT_TO_DELETE,
  CLEAN_UP_ARTILCE_STATE,
  SET_IS_CREATE_ARTICLE_SUCCCEEDED,
  SET_IS_DELETE_ARTICLE_SUCCCEEDED,
  UPDATE_ARTICLE_FAILED,
  UPDATE_ARTICLE_REQUESTED,
  UPDATE_ARTICLE_SUCCEEDED,
  SET_IS_UPDATE_ARTICLE_SUCCCEEDED,
} = articleSlice.actions;

export default articleSlice.reducer;
