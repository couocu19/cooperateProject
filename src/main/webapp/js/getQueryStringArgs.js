export function getQueryStringArgs() {
  const data_str = window.location.search;
  const str = data_str.length > 0 ? data_str.substring(1) : "",
    args = {}, // 保存数据的对象
    item_arr = str.length > 0 ? str.split("&") : [],
    item = null,
    name = null,
    value = null,
    i = 0,
    len = item_arr.length;
  while (i < len) {
    item = item_arr[i].split("=");
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    args[name] = value;
    i++;
  }
  return args;
}
