import axios from 'axios';
import {API_URL} from '../constants/api';

export const fetchArticles = async (limit = 10, offset = 0) => {
  try {
    const response = await axios.get(`${API_URL}/articles`, {
      params: {
        limit,
        offset,
      },
    });

    return response.data.articles;
  } catch (error: any) {
    throw error.response.data.errors;
  }
};

export const fetchSingleArticle = async (slug: any) => {
  try {
    const response = await axios.get(`${API_URL}/articles/${slug}`);

    return response.data.article;
  } catch (error: any) {
    throw error.response.data.errors;
  }
};

export const fetchComments = async (slug: any) => {
  try {
    console.log(slug);
    const response = await axios.get(`${API_URL}/articles/${slug}/comments`);

    return response.data.comments;
  } catch (error: any) {
    throw error.response.data.errors;
  }
};

export const postComment = async (slug: any, body: any, token: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/articles/${slug}/comments`,
      {comment: {body}},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    return response.data.comment;
  } catch (error: any) {
    throw error.response.data.errors;
  }
};

export const deleteComment = async (slug: any, commentId: any, token: any) => {
  try {
    const response = await axios.delete(
      `${API_URL}/articles/${slug}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    throw error.response.data.errors;
  }
};
