/* eslint-disable indent */
import api from './api.js';
import store from './store.js';
import bookmarks from './bookmarks.js';
import './index.css';


const main = function() {

    api.getBookmark()
        .then(res => res.json())
        .then((items) => {
            items.forEach((item) => store.addBookmark(item));
            bookmarks.render();
        });

    bookmarks.eventListeners();
    bookmarks.render();

};

$(main);