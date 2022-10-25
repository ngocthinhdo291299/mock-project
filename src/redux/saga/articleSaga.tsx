import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeEvery, put } from "redux-saga/effects";
import { articleApi } from "../../apis";
import {
  CREATE_ARTICLE_FAILED,
  CREATE_ARTICLE_REQUESTED,
  CREATE_ARTICLE_SUCCEEDED,
  DELETE_ARTICLE_BY_SLUG_FAILED,
  DELETE_ARTICLE_BY_SLUG_REQUESTED,
  DELETE_ARTICLE_BY_SLUG_SUCCEEDED,
  FETCH_ARTICLES_FAILED,
  FETCH_ARTICLES_REQUESTED,
  FETCH_ARTICLES_SUCCEEDED,
  FETCH_ARTICLE_BY_AUTHOR_FAILED,
  FETCH_ARTICLE_BY_AUTHOR_REQUESTED,
  FETCH_ARTICLE_BY_AUTHOR_SUCCEEDED,
  FETCH_ARTICLE_BY_SLUG_FAILED,
  FETCH_ARTICLE_BY_SLUG_REQUESTED,
  FETCH_ARTICLE_BY_SLUG_SUCCEEDED,
  FETCH_COMMENTS_FAILED,
  FETCH_COMMENTS_REQUESTED,
  FETCH_COMMENTS_SUCCEEDED,
  FETCH_FAVORITED_ARTICLE_FAILED,
  FETCH_FAVORITED_ARTICLE_REQUESTD,
  FETCH_FAVORITED_ARTICLE_SUCCEEDED,
  FETCH_TAGLIST_FAILED,
  FETCH_TAGLIST_REQUESTED,
  FETCH_TAGLIST_SUCCEEDED,
  TOGGLE_LIKE_POST_REQUESTED,
  TOGGLE_LIKE_POST_SUCCEEDED,
  UPDATE_ARTICLE_FAILED,
  UPDATE_ARTICLE_REQUESTED,
  UPDATE_ARTICLE_SUCCEEDED,
} from "../slice/articleSlice";

export function* fetchArticles(): any {
  try {
    let { articles } = yield call(articleApi.get);
    yield put(FETCH_ARTICLES_SUCCEEDED(articles));
  } catch (error) {
    yield put(FETCH_ARTICLES_FAILED("Lấy dữ liệu lỗi"));
  }
}

function* fetchArticleBySlug(action: PayloadAction<string>): any {
  try {
    const { article } = yield call(() => articleApi.getBySlug(action.payload));
    yield put(FETCH_ARTICLE_BY_SLUG_SUCCEEDED(article));
  } catch (error) {
    yield put(FETCH_ARTICLE_BY_SLUG_FAILED(error));
  }
}

function* fetchFavoritedArticle(action: PayloadAction<string>): any {
  try {
    const { articles } = yield call(() =>
      articleApi.favoritedArticle(action.payload)
    );

    yield put({
      type: FETCH_FAVORITED_ARTICLE_SUCCEEDED.type,
      payload: articles,
    });
  } catch (error) {
    yield put({ type: FETCH_FAVORITED_ARTICLE_FAILED.type, payload: error });
  }
}

function* fetchArticleByAuthor(action: PayloadAction<string>): any {
  try {
    const { articles } = yield call(() => articleApi.byAuthor(action.payload));
    yield put({
      type: FETCH_ARTICLE_BY_AUTHOR_SUCCEEDED.type,
      payload: articles,
    });
  } catch (error) {
    yield put({ type: FETCH_ARTICLE_BY_AUTHOR_FAILED.type, payload: error });
  }
}

function* fetchComments(action: PayloadAction<string>): any {
  try {
    const { comments } = yield call(() =>
      articleApi.getComments(action.payload)
    );
    yield put({ type: FETCH_COMMENTS_SUCCEEDED.type, payload: comments });
  } catch (error) {
    yield put({ type: FETCH_COMMENTS_FAILED.type, payload: error });
  }
}

function* createArticle(action: PayloadAction<any>): any {
  try {
    yield call(() => articleApi.create({ article: action.payload }));

    yield put(CREATE_ARTICLE_SUCCEEDED());
  } catch (error) {
    yield put(CREATE_ARTICLE_FAILED(error));
  }
}

function* deleteArticleBySlug(action: PayloadAction<string>): any {
  try {
    yield call(() => articleApi.delete(action.payload));
    yield put(DELETE_ARTICLE_BY_SLUG_SUCCEEDED());
  } catch (error) {
    yield put(DELETE_ARTICLE_BY_SLUG_FAILED("Delete is failed"));
  }
}

function* toggleLikeArticle(action: PayloadAction<any>): any {
  const { articleWantToToggle, currentArticles } = action.payload;
  if (articleWantToToggle.favorited) {
    const unfavorited = yield call(() =>
      articleApi.unFavorite(articleWantToToggle.slug)
    );
    yield put({
      type: TOGGLE_LIKE_POST_SUCCEEDED.type,
      payload: replaceArticle(unfavorited),
    });
  } else {
    const favorited = yield call(() =>
      articleApi.favorite(articleWantToToggle.slug)
    );

    yield put({
      type: TOGGLE_LIKE_POST_SUCCEEDED.type,
      payload: replaceArticle(favorited),
    });
  }
  function replaceArticle(newArticle: any) {
    return currentArticles.map((item: any) => {
      if (item.slug === newArticle.article.slug) {
        return newArticle.article;
      }
      return item;
    });
  }
}

function* fetchTagList(): any {
  try {
    const { tags } = yield call(articleApi.getTag);
    yield put({ type: FETCH_TAGLIST_SUCCEEDED.type, payload: tags });
  } catch (error) {
    yield put({ type: FETCH_TAGLIST_FAILED.type, payload: error });
  }
}
function* updateArticle(action: PayloadAction<any>) {
  try {
    yield call(() =>
      articleApi.update(action.payload.slug, { article: action.payload.values })
    );
    yield put(UPDATE_ARTICLE_SUCCEEDED());
  } catch (error) {
    yield put(UPDATE_ARTICLE_FAILED(error));
  }
}

export function* wacherFetchArticle() {
  yield takeEvery(FETCH_ARTICLES_REQUESTED.type, fetchArticles);
  yield takeEvery(FETCH_ARTICLE_BY_SLUG_REQUESTED.type, fetchArticleBySlug);
  yield takeEvery(DELETE_ARTICLE_BY_SLUG_REQUESTED.type, deleteArticleBySlug);
  yield takeEvery(CREATE_ARTICLE_REQUESTED.type, createArticle);
  yield takeEvery(FETCH_FAVORITED_ARTICLE_REQUESTD.type, fetchFavoritedArticle);
  yield takeEvery(FETCH_COMMENTS_REQUESTED.type, fetchComments);
  yield takeEvery(FETCH_ARTICLE_BY_AUTHOR_REQUESTED.type, fetchArticleByAuthor);
  yield takeEvery(TOGGLE_LIKE_POST_REQUESTED.type, toggleLikeArticle);
  yield takeEvery(FETCH_TAGLIST_REQUESTED.type, fetchTagList);
  yield takeEvery(UPDATE_ARTICLE_REQUESTED.type, updateArticle);
}
