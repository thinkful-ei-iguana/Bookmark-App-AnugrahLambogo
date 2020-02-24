/* eslint-disable indent */
const state = {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0
};

//function to add new bookmark objects in to the store

const addBookmark = function(bookmarkObj) {
    return state.bookmarks.push(bookmarkObj);
}

//function to delete within store
const deleteBookmark = function(id) {
    let indx = state.bookmarks.findIndex(bm => bm.id === id);
    state.bookmarks.splice(indx, 1);
}



//function to toggle add menu
const toggleAddMenu = function() {
    console.log('toggleAddMenu ran')
    state.adding = !state.adding;
    console.log(state.adding);

    }


//function to toggle error
const toggleError = function() {}

//function to toggle expanded view of a bookmark obj
const toggleExpand = function(id) {
    let targetBmIndex = state.bookmarks.findIndex((bm) => bm.id == id);
    state.bookmarks[targetBmIndex].expanded = !state.bookmarks[targetBmIndex].expanded;
}

const toggleFilter = function(filterNum) {
  state.filter = filterNum;
}




export default {
    state,
    addBookmark,
    toggleAddMenu,
    toggleError,
    toggleExpand,
    deleteBookmark,
    toggleFilter
};