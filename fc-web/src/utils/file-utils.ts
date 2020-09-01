export const dataUrlToFile = function dataUrlToFile(dataUrl: string, filename: string) {
  var arr = dataUrl.split(","),
    mime = (arr[0].match(/:(.*?);/) ?? ["image/*", "image/*"])[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
