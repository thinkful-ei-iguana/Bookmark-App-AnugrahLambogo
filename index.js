/* eslint-disable indent */
//import $ from 'jquery';
import api from './api.js';
import store from './store.js';
import bookmarks from './bookmarks.js';
import './index.css';


const main = function() {
    console.log('we are finally in');
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