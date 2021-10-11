import axios from "./axios";

export const getArticles = () => {
    return axios({
        url: "/api/v1/articles",
    });
};

export const getArticleById = (id) => {
    return axios({
        url: `/api/v1/articles/${id}`,
    });
};

export const createArticle = (data) => {
    return axios({
        url: `/api/v1/articles`,
        method: "POST",
        data,
    });
};

export const updateArticleById = (data) => {
    return axios({
        url: `/api/v1/articles`,
        method: "PUT",
        data,
    });
};

export const deleteArticleById = (id) => {
    return axios({
        url: `/api/v1/articles/${id}`,
        method: "DELETE",
    });
};
