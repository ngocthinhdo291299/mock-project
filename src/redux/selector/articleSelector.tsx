import { RootState } from "../../types";

export const selectArticleFeed = (state: RootState) => state.article.articles;
export const selectArticleError = (state: RootState) =>
  state.article.errorMessage;
export const selectArticleBySlug = (state: RootState) =>
  state.article.articleBySlug;
export const selectFavoritedArticle = (state: RootState) =>
  state.article.favoritedArticle;
export const selectComments = (state: RootState) => state.article.comments;
export const selectArticleByAuthor = (state: RootState) =>
  state.article.articleByAuthor;
export const selectLoadingCreateArticle = (state: RootState) =>
  state.article.loadingCreateArticle;
export const selectArticleAfterLike = (state: RootState) =>
  state.article.articleAfterLike;
export const selectCommentWantToDelete = (state: RootState) =>
  state.article.commentWantToDelete;
export const selectTagList = (state: RootState) => state.article.tagList;
export const selectLoadingTagList = (state: RootState) =>
  state.article.loadingTagList;
export const selectIsCreateArticleSucceeded = (state: RootState) =>
  state.article.isCreateArticleSucceeded;
export const selectIsUpdateArticleSucceeded = (state: RootState) =>
  state.article.isUpdateArticleSucceeded;
export const selectLoadingUpdateArticle = (state: RootState) =>
  state.article.loadingUpdateArticle;
export const selectIsDeleteArticleSucceeded = (state: RootState) =>
  state.article.isDeleteArticleSucceeded;
export const selectLoadingFavoritedArticle = (state: RootState) =>
  state.article.loadingFavoritedArticle;
export const selectArticleForSeaching = (state: RootState) =>
  state.article.articleForSearching;
export const selectLoadingArticleByAuthor = (state: RootState) =>
  state.article.loadingArticleByAuthor;
