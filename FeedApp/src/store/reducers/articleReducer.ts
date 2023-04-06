import * as types from '../types';

const initialState = {
  articles: [],
  article: null,
  comments: [
    {
      id: null,
    },
  ],
  loading: false,
  error: null,
};

const articleReducer = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case types.GET_ARTICLES_REQUEST:
    case types.GET_ARTICLE_REQUEST:
    case types.GET_COMMENTS_REQUEST:
    case types.POST_COMMENT_REQUEST:
    case types.DELETE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        loading: false,
      };
    case types.GET_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
        loading: false,
      };
    case types.GET_ARTICLE_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case types.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case types.POST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        loading: false,
      };
    case types.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload.commentId,
        ),
        loading: false,
      };
    case types.GET_ARTICLES_FAILURE:
    case types.GET_ARTICLE_FAILURE:
    case types.GET_COMMENTS_FAILURE:
    case types.POST_COMMENT_FAILURE:
    case types.DELETE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
