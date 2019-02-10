function init() {
  var viewportElement = document.body;

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
