const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    index: "./webapp/js/index.js",
    compile_page: "./webapp/js/compile_page.js",
    user_message_set: "./webapp/js/user_message_set.js",
    show_user_list: "./webapp/js/show_user_list.js",
    replyList: "./webapp/js/replyList.js",
    replyComment: "./webapp/js/replyComment.js",
    personal_page: "./webapp/js/personal_page.js",
    find_user: "./webapp/js/find_user.js",
    detail_dynamic: "./webapp/js/detail_dynamic.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  mode: "development",
};
