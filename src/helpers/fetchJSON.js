// import  {ApiBaseUrl}  from "../config";

const fetchJSON = (url, options = {}) => {
    
    return fetch(url, options)
        .then(response => {
            if (!response.status === 200) {
                throw response.json();
            }
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(error => { throw error });
}

export default fetchJSON;