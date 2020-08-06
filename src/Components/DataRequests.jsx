import axios from "axios";

const baseURL = "https://true-donair-40758.herokuapp.com/api";
const articlesURL = "/articles/";

export const getTopics = (query = {}) => {
  return axios
    .get(`${baseURL}/topics`, {
      params: {
        ...query,
      },
    })
    .then(({ data }) => {
      return data.topics;
    });
};

export const getArticles = (query = {}) => {
  return axios
    .get(`${baseURL}/articles`, {
      params: {
        ...query,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getIndividualArticle = (article_id) => {
  return axios.get(`${baseURL}${articlesURL}${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const patchVotes = (id, URL, voteValue) => {
  return axios
    .patch(`${baseURL}/${URL}/${id}`, {
      inc_votes: voteValue,
    })
    .then(({ data }) => {
      return data;
    });
};

export const getComments = (article_id) => {
  return axios
    .get(`${baseURL}${articlesURL}${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
};

export const postComment = (user, body, article_id) => {
  return axios
    .post(`${baseURL}${articlesURL}${article_id}/comments`, {
      username: user,
      body: body,
    })
    .then(({ data }) => {
      return data;
    });
};

export const deleteComment = (comment_id) => {
  return axios.delete(`${baseURL}/comments/${comment_id}`).then(({ data }) => {
    return data;
  });
};

export const getAllUsers = () => {
  return axios.get(`${baseURL}/users/all`).then(({ data }) => {
    return data;
  });
};
