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
