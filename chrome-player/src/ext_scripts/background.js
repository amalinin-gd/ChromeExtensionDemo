chrome.runtime.onInstalled.addListener(function() {
  alert('Chrome Player extension has been installed!');
});

chrome.bookmarks.onCreated.addListener(function() {
  alert('Better listen to some music!');
});
