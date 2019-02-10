chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Open Chrome Player in a New Tab",
    "contexts": ["page", "selection", "image", "link"]
  });

  alert('Chrome Player extension has been installed!');
});

chrome.contextMenus.onClicked.addListener(function() {
  chrome.tabs.create({ url: "index.html" });
 })

chrome.bookmarks.onCreated.addListener(function() {
  alert('Better listen to some music!');
});
