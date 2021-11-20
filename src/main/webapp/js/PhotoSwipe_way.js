/*
	show_photo_arr是需要展示的数组
	index 是开始展示的位置
 */

export default function show_PhotoSwipe(show_photo_arr, index) {
  console.log(show_photo_arr);
  var pswpElement = document.querySelectorAll(".pswp")[0];

  // build items array
  var items = show_photo_arr;
  items.forEach((item) => {
    let itemWh = getBase64ImgWidthHeight(item.src);
    item.w = itemWh.w;
    item.h = itemWh.h;
  });
  console.log(items);
  // define options (if needed)
  var options = {
    // optionName: 'option value'
    // for example:
    index: parseInt(index), // start at first slide
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

function getBase64ImgWidthHeight(img_src) {
  let img = new Image();
  img.src = img_src;
  return {
    w: img.width,
    h: img.height,
  };
}
