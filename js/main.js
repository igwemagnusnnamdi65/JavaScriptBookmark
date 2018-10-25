// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save Bookmarks
function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }



  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  /*
  //local Storage Test
  localStorage.setItem('test', 'Hello World');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));
  */

  // Test if bookmarks is null
  if (localStorage.getItem('bookmarks') == null) {
    // init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Res-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();


  // Prevent from submittin
  e.preventDefault();

}

// delete url
function deleteBookmark(url) {
  // Get bookmark from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localstorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarkersResults = document.getElementById('bookmarksResults');
  // Build output
  bookmarkersResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkersResults.innerHTML += '<div class="well">' +
      '<h3>' + name +
      ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' +
      ' <a onclick="deleteBookmark(\'' + url + '\')"  class="btn btn-danger" href="#">Delete</a>' +
      '</h3>' +
      '</div>';


  }

}

// Validate form...
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  // Regular expression
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }
  return true;
}