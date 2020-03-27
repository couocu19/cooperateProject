# cooperateProject

### 一、项目介绍

​	一个前后端分离的项目， 前端开发app端内嵌h5，后端提供数据的支持。主要为了锻炼前后端交互的能力以及一些前后端分离项目的开发规范。



### 二、项目内容

​	因为需要嵌入的app是一个校园类的app，本项目内嵌h5页面提供一个类似于广场的功能， 任何从人都可以发布动态，管理动态，修改自己的信息(h5 页面中的信息)，查看别人信息。



### 三、项目基本逻辑

- #### 前端

  - ##### 每个用户进入后都有其android对应的注入的student_id,主页利用student_id与后台建立联系后利用后台下发的cookie保持登录

  - ##### 前端对于手机页面的控制通过调用android利用js-bridge注入的方法来实现

  - ##### 各个页面间通过url参数进行传值

- #### 后端

### 四、项目目录

```mariadb
|README.md
|prot_document.md #接口文档（前后端共同维护）
├──dist #webpack输出
├── src#资源
│ ├── pic
│ │ └── logo.png
│ ├── style
│ │ └── xxx.css
│ ├── js
│ │ └── xxx.js
│ ├── xxx.html
├── package.json #项目配置文件
└── webpack.config.js #webpack配置文件

```



### 五、开发记录



- #### 前端

  - 项目中尽可能多的使用了es6 语法，包括 class, module式编程，Promise, 字符串的扩展...
  
  - 其中图片的预览效果的实现使用了photoswipe插件
    
    - [photoswipe的基本使用以及一些基本问题的解决]()
    
  - 上拉刷新和下拉加载的实现
  
    - > 用到了 css3动画 touchstart touchend touchmove事件
  
    - 下拉刷新主要利用了`e.touches[0].pageY`的差值判断是否执行刷新页面的回调函数
  
      ```javascript
      let start_pos = 0,	// 记录开始的位置
          move_distant = 0; // 记录移动距离变量的值
      
      // 添加事件
      element.addEventListener('touchstart', (e) => {
          //记录开始滑动的位置
          start_pos = e.touches[0].pageY;
      }, false);
      // 添加按住移动的事件
      element.addEventListener('touchmove', () => {
          // 更新记录移动距离变量的值
          move_distant = e.touches[0].pageY - start_pos;
          if(move_distant > 0 && move_distant < 100) {
              // 执行回调函数
          }
      }, false);
      ```

