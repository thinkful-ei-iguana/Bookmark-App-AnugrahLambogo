/* eslint-disable indent */
//import $ from 'jquery';
import api from './api.js';
import store from './store.js';
import bookmarks from './bookmarks.js';
console.log('help');

const main = function() {
    console.log('we are finally in');
    bookmarks.eventListeners();

    api.getBookmark()
        .then((items) => {
            items.forEach((item) => {
              item.expanded = false;
              store.addBookmark(item)});
            bookmarks.render();
        });

    bookmarks.render();

};


$(main);