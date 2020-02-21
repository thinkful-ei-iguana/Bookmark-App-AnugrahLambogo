/* eslint-disable indent */

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/anugrah/bookmarks'

const listApiFetch = function (...args) {
    let error;
    return fetch(...args)
    .then(res => {
        if (!res.ok) {
            error = { code: res.status};
        if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
            }
        }
        return res.json();
    })
    .then(data => {
        if (error) {
            error.message = data.message;
            return Promise.reject(error);
        }
        return data;
    });
};


//GET/read api 
const getBookmark = function() {
    console.log('getBookmark has been run!')
    return listApiFetch(`${BASE_URL}`)
    .catch(err => {
        $('#options').text(`Something went wrong: ${err.message}`);
        })
};

//POST/create api
const createBookmark = function (bookmark) {
    console.log('createBookmark has been run!');
    let newBookmarkJSON = JSON.stringify(bookmark);

        return listApiFetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newBookmarkJSON
        });   
    };




//DELETE api

const deleteBookmark = function (id) {
    return listApiFetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    }); 
  };



export default {
    createBookmark,
    getBookmark,
    deleteBookmark
};