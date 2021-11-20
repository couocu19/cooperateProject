export function getBase64ImgWidthHeight(img_src) {
  let img = new Image();
  img.src = img_src;
  return {
    w: img.width,
    h: img.height,
  };
}
