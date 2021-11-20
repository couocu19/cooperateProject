function show_PhotoSwipe(show_photo_arr, index) {
  var pswpElement = document.querySelectorAll(".pswp")[0];
  var items = show_photo_arr;

  var options = {
    index: index, // start at first slide
  };

  // Initializes and opens PhotoSwipe
  var gallery = new PhotoSwipe(
    pswpElement,
    PhotoSwipeUI_Default,
    items,
    options
  );
  gallery.init();
}
