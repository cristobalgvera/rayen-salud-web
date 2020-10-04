import Axios from "axios";

const instance = Axios.create({
    baseURL: `https://rayentutorialtestapp.azurewebsites.net`
});

const get = async (url: string) => {
    return instance.get(url)
        .then(response => response.data)
        .catch(error => console.log(error));
};

const post = async (url: string, body: any = null, queryParams: any = null) => {
    return instance.post(url, body, {params: queryParams})
        .then(response => response.data)
        .catch(error => console.log(error));
};

const put = (url: string, body: any = null, queryParams: any = null) => {
    return instance.put(url, body, {params: queryParams})
        .then(response => response.data)
        .catch(error => console.log(error));
};

const remove = (url: string) => {
    return instance.delete(url)
        .then(response => response.data)
        .catch(error => console.log(error));
};

export default {get, post, put, remove};