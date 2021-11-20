import { Ajax, promiseAjax } from "./AJAX.js";

class App {
  constructor(return_btn, search, send_btn) {
    this.return_btn = return_btn;
    this.search = search;
    this.send_btn = send_btn;
    this.show_box = show_box;
    this.timer = null;
  }
  init() {
    this.return_btn.addEventListener(
      "click",
      () => {
        window.history.back();
      },
      false
    );
    this.send_btn.addEventListener(
      "click",
      () => {
        if (!this.timer) {
          this.send_Ajax();
          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.timer = null;
          }, 1000);
        }
      },
      false
    );
  }

  send_Ajax() {
    if (this.search.value == "") {
      console.log("输入的内容为空");
      return;
    }
    promiseAjax({
      url: "http://118.31.12.175:8080/xiyouProject_war/user/vagueSelect.do",
      type: "get",
      data: {
        info: app.search.value,
      },
      send_form: false,
      async: false,
    })
      .then((value) => {
        value = JSON.parse(value);
        console.log(value);
        this.render(value.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render(data_arr) {
    this.show_box.style.display = "block";
    if (data_arr.length == 0) {
      this.show_box.innerHTML = "输错了吧，咋啥都没搜到呢~~~";
      return;
    }
    let str_ = "";
    for (let i = 0, len = data_arr.length; i < len; i++) {
      let item_data = data_arr[i];
      str_ += `<div class="head_name_item" onclick=viewUserIndexPage(${item_data.id})><div class="user_head_pic_item"><img src=${item_data.header}></div><div class='comment_content_sign_box'><p class="user_name_item">${item_data.userName}</p><div class="send_time_item">${item_data.signature}</div></div></div>`;
    }
    this.show_box.innerHTML = str_;
  }
}

const app = new App(
  document.getElementsByClassName("return_btn")[0],
  document.getElementById("search_name"),
  document.getElementById("send_btn"),
  document.getElementById("show_box")
);
app.init();
