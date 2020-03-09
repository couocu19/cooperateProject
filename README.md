# cooperateProject

### 一、项目介绍

​	一个前后端分离的项目， 前端开发app端内嵌h5，后端提供数据的支持。主要为了锻炼前后端交互的能力以及一些前后端分离项目的开发规范。



### 二、项目内容

​	因为需要嵌入的app是一个校园类的app，本项目内嵌h5页面提供一个类似于广场的功能， 任何从人都可以发布动态，管理动态，修改自己的信息(h5 页面中的信息)，查看别人信息。



### 三、项目基本逻辑

- #### 前端

  - ##### [git地址](https://github.com/kibuniverse/cooperateProject/tree/master/src/main)

  - ##### 每个用户进入后都有其android对应的注入的student_id,主页利用student_id与后台建立联系后利用后台下发的cookie保持登录

  - ##### 前端对于手机页面的控制通过调用android利用js-bridge注入的方法来实现

- #### 后端



### 四、项目接口



- #### 广场页面数据请求

  ```json
  请求URL : '后端ip:监听端口号/dongtai'
  请求方式 : get
  参数 : none

  返回示例
  成功
  {
      "error" : 0,
      "data" : {
          // 动态的信息...
      }
  }
  失败
  {
      "error" : 0,
      "msg" : 'XXX'
  }

  ```

- #### 动态的评论

  ```json
  请求URL : '后端ip:监听端口号/comment'
  请求方式 : get
  参数 : {
      id : 动态id(必选)
  }

  请求URL示例 ： 'http://xxx.xx.xx.xx:8080/comment?id=10'

  返回示例
  成功
  {
      "error" : 0,
      "data" : {
          // 评论的信息...
      }
  }

  失败
  {
      "error" : 0,
      "msg" : 'XXX'
  }
  ```

- ####  评论的回复

  ```json
  请求URL : '后端ip:监听端口号/reply'
  请求方式 : get
  参数 : {
      id : '评论的id'(必选)
  }

  请求URL示例 ： 'http://xxx.xx.xx.xx:8080/reply?id=10'

  返回示例
  成功
  {
      "error" : 0,
      "data" : {
          [
          	// 每条回复的信息
          	// 是否回复评论的回复
          	isreply_reply : true
          	reply_user: '被评论人的昵称'
          ]
      }
  }

  失败
  {
      "error" : 0,
      "msg" : 'XXX'
  }
  ```



- #### 查找模块

  ```json
  简述 : 请求自己的信息
  请求URL : '后端ip:监听端口号/findMessage'
  请求方式 : get
  参数 : userStduent  必选  用户名

  返回示例
  成功
  {
      "error" : 0,
      "data" :  {
          id : 数据库中学号对应的id,
          xuehao: 学号，
          name : 默认为学号,
          header: 头像的绝对地址,
          signed: 签名,
          fans: 粉丝数量,
          guanzhu : 关注数量,
          looks_num: 页面浏览量
          dongtai: [
          	{
          		id : xxx,
          		content : 动态的内容,
          		praise: 点赞数量,
          		commentCount: 评论数量,
          		send_time: 发布时间,
          		is_del: 是否被删除
      		},
          ]
      }
  }
  失败
  {
      "error" : 1
  }
  ```

- #### 删除模块

  ```json
  简述 : 删除动态
  请求URL : '后端ip:监听端口号/delete'
  请求方式 : get
  参数 : {
      delete_id : '被删除动态的id'
  }

  请求URL示例 ： 'http://xxx.xx.xx.xx:8080/delete?id=10'

  返回示例
  {
  	"error" : 0,
      "data" : {
          [
          	//更新后的动态信息
          	"id" : 10,
          	"is_delete" : true
          ]
      }
  }
  ```



- #### 发送动态

  ```json
  简述 : 发送动态
  请求URL : '后端ip:监听端口号/add_dynamic'
  请求方式 : post
  参数 : {
      send_user_stduent_num : '发送人的学号',
      content : '发送的文字内容',
      photos : '照片数组',
      send_time : '发送时间'
  }
    返回示例
    成功
    {
        "error" : 0,
        ""
    }
  ```



### 五、开发记录

- #### 前端

  - 项目中尽可能多的使用了es6 语法，包括 class, module式编程，Promise, 字符串的扩展...
  - 其中图片的预览效果的实现使用了photoswipe插件
    - [photoswipe的基本使用以及一些基本问题的解决]()

​	