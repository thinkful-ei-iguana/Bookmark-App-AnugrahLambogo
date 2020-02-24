/* eslint-disable indent */
import store from './store.js';
import api from './api.js';





//function to generate the HTML elements for the bookmark
//objects in store
const generateBookmarkElement = function(bookmarkObj) {
    console.log('generateBookmarkElement has been ran!');
    console.log('this filter num', store.state.filter)
    if (bookmarkObj.expanded === false) {
        return ` <div class="bookmark ${bookmarkObj.rating}" id="${bookmarkObj.id}">
                    <button class ="title" id="${bookmarkObj.id}">${bookmarkObj.title}</button>
                    ${bookmarkObj.rating} <img src="https://p7.hiclipart.com/preview/897/847/590/royalty-free-star-clip-art-gold-star.jpg" alt="small icon of a star" class="ratingImg">
                    <button class="delete" id="${bookmarkObj.id}">DELETE</button>
                    </div>`
    }

    return ` <div class="bookmark ${bookmarkObj.rating}" id="${bookmarkObj.id}">
                <button class ="title" id="${bookmarkObj.id}">${bookmarkObj.title}</button>
                <a href="${bookmarkObj.url}">Take me there!</a>
                ${bookmarkObj.rating} <img src="https://p7.hiclipart.com/preview/897/847/590/royalty-free-star-clip-art-gold-star.jpg" alt="small icon of a star" class="ratingImg"/>
                <p class="description">${bookmarkObj.desc}</p>
                <button class="delete" id="${bookmarkObj.id}">DELETE</button>
            </div>`
};


//function to put together the bookmark html elements into one block
const generateBookmarkListString = function(bookmarkArr) {
    console.log('generateBookmarkListString has been run!');
    console.log('bookmarkArr: ', bookmarkArr);
    const list = bookmarkArr.map((item) => generateBookmarkElement(item));
    return list.join('');
};



//function to render the state of the store into the dom
const render = function() {

console.log('render has been run!');

let currState = store.state;
if (currState.adding === true) {
    let addmenu = generateAddMenuElements();
    $('#addMenu').html(`${addmenu}`);
    submitNewBookmark();
    cancelAdding();
}

const bookmarkListString = generateBookmarkListString(currState.bookmarks);
$('#bookmarkList').html(bookmarkListString);
    for (let i = 1; i<=5; i++){
        if(i < store.state.filter) {
          $(`.${i}`).addClass('hidden'); 
        }
        else {
          $(`.${i}`).removeClass('hidden'); 
        }
    }
generateExpandedview();
deleteButton();
filterBookmarks();

};



//event listener for the filterer

const filterBookmarks = function() {
    $('.filter').change(function() {
        let filterNum = $('.filter').val();
        console.log(filterNum);  
        store.toggleFilter(filterNum);
        render();
    })
    }
    











// functionality concerning expanded view here

//event listener to toggle expanded view of bookmark
const generateExpandedview = function() {
    $('.title').click(function () {
        console.log('generateExpandedview just ran')
        let id = $(this).attr('id');
        store.toggleExpand(id)
        render();
    })

}




//event listener for delete button

const deleteButton = function() {
    $('.delete').on('click', function() {
        console.log('delete function ran');
        let id = $(this).attr('id');
        console.log(id);
        api.deleteBookmark(id);
        store.deleteBookmark(id);
        render();
    })

}

















//functionality concerning add button/menu here

//event listener for the add menu button
const addButton = function() {
    $('.options').on('click', '.add-new', event => {
      store.toggleAddMenu();  
      render();  
      });
}
//function to render the menu to add new bookmarks
const generateAddMenuElements = function() {

    return `<form id="addNew">
                <label for="bookmarkTitle">Title:</label>
                <input type="text" name="title" id="bookmarkTitle" />
                <label for="bookmarkURL">New Bookmark URL:</label>
                <input type="text" name="url" id="bookmarkURL" />
                <label for="ratingTool">Rating:</label>
                <select class="ratingTool" name="ratingTool" id="ratingTool">
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
                <label for="descriptionBox">Short Description:</label>
                <input type="text" name="descriptionBox" id="descriptionBox"/>
                
                <button type="submit">Create</button>
                <button type="reset" id="cancelButton">Cancel</button>
                <div id="errorMsg"></div>
            </form>`;
}

//event listener to submit new bookmark info
const submitNewBookmark = function() {
    console.log('submitNewBookmark ran!');
    
    $('#addNew').submit(function (event) {
        event.preventDefault();
        const newBookmark = {};
        $('#errorMsg').empty()
        newBookmark.title = $('#bookmarkTitle').val();
        newBookmark.url = $('#bookmarkURL').val();
        newBookmark.desc = $('#descriptionBox').val();
        newBookmark.rating = $('#ratingTool').val();
        newBookmark.expanded = false;
        newBookmark.id = store.state.bookmarks.length;

        api.createBookmark(newBookmark)    
        .then(() => {store.addBookmark(newBookmark);})
        .then(() => {render();})
        .catch(err => {
            console.log('catch block running');
            $('#errorMsg').append(`<p>Invalid entry: ${err.message}, </p>`);
            });
    })
};

//event listener for the cancel button
const cancelAdding = function() {
    $('#cancelButton').on('click',(event) => {
        store.toggleAddMenu();
        $('#addMenu').html('');
        render();
        });
};










//function to initialize eventlisteners

const eventListeners = function() {
    addButton();



}



export default {
    render,
    generateBookmarkElement,
    generateAddMenuElements,
    generateExpandedview,
    eventListeners
};