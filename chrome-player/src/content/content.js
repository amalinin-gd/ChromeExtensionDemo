function init() {
  var viewportElement = document.body;
  var src = chrome.extension.getURL("assets/pink_floyd_wall_paper.jpg");

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (!request.imageUrl){
        return;
      }

      viewportElement.style.backgroundImage = 'url("' + request.imageUrl + '")';
      viewportElement.style.backgroundSize = 'contain';

      sendResponse({ message: "The wallpaper has been set!" });
    });
}

init();
