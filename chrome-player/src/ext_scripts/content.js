function init() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (!request.imageUrl){
        return;
      }

      document.body.style.backgroundImage = 'url("' + request.imageUrl + '")';
      document.body.style.backgroundSize = 'contain';

      sendResponse({ message: "The wallpaper has been set!" });
    });
}

init();
