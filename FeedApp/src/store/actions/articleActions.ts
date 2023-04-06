import * as types from '../types';
import * as api from '../../api/articleAPI';

export const getArticles = () => async dispatch => {
  dispatch({type: types.GET_ARTICLES_REQUEST});
  try {
    const articles = await api.fetchArticles();
    dispatch({type: types.GET_ARTICLES_SUCCESS, payload: articles});
  } catch (error: any) {
    dispatch({type: types.GET_ARTICLES_FAILURE, payload: error.message});
  }
};

export const getArticle = (slug: any) => async dispatch => {
  dispatch({type: types.GET_ARTICLE_REQUEST});
  try {
    const article = await api.fetchSingleArticle(slug);
    dispatch({type: types.GET_ARTICLE_SUCCESS, payload: article});
  } catch (error: any) {
    dispatch({type: types.GET_ARTICLE_FAILURE, payload: error.message});
  }
};

export const getArticleComments = (slug: any) => async dispatch => {
  dispatch({type: types.GET_COMMENTS_REQUEST});
  try {
    const comments = await api.fetchComments(slug);
    dispatch({type: types.GET_COMMENTS_SUCCESS, payload: comments});
  } catch (error: any) {
    dispatch({type: types.GET_COMMENTS_FAILURE, payload: error.message});
  }
};

export const postComment =
  (slug: any, body: any, token: any) => async dispatch => {
    dispatch({type: types.POST_COMMENT_REQUEST});
    try {
      const comment = await api.postComment(slug, body, token);
      dispatch({type: types.POST_COMMENT_SUCCESS, payload: comment});
    } catch (error: any) {
      dispatch({type: types.POST_COMMENT_FAILURE, payload: error.message});
    }
  };

export const deleteComment =
  (slug: any, commentId: any, token: any) => async dispatch => {
    dispatch({type: types.DELETE_COMMENT_REQUEST});
    try {
      await api.deleteComment(slug, commentId, token);
      dispatch({
        type: types.DELETE_COMMENT_SUCCESS,
        payload: {slug, commentId},
      });
    } catch (error: any) {
      dispatch({type: types.DELETE_COMMENT_FAILURE, payload: error.message});
    }
  };
