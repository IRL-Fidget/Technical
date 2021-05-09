import axios from "api/axiosConfig";

export const url = {
    articles: "articles"
}

const getArticles = () => {
    return axios.get(url.articles)
    .then(response => response)
    .catch(error => error);
}

const createArticle = (payload) => {
    return axios.post(url.articles, payload)   
    .then(response => response)
    .catch(error => error);
}

const deleteArticle = (payload) => {
    return axios.delete(url.articles + "/" + payload)
    .then(response => response)
    .catch(error => error);
}

const addTag = (payload) => {
    const { id, tags } = payload;
    return axios.patch(url.articles + "/" + id, { tags })
    .then(response => response)
    .catch(error => error);
}

export {
    getArticles,
    createArticle,
    deleteArticle,
    addTag
}