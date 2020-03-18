function show_PhotoSwipe(show_photo_arr, index) {

	var pswpElement = document.querySelectorAll('.pswp')[0];

	// build items array
	var items = show_photo_arr;
	console.log(items);
	// define options (if needed)
	var options = {
	    // optionName: 'option value'
	    // for example:
	    index: index// start at first slide
	};

	// Initializes and opens PhotoSwipe
	var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
	gallery.init();
}