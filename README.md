# cooperateProject

### 一、项目介绍

​	一个前后端分离的项目， 前端开发app端内嵌h5，后端提供数据的支持。主要为了锻炼前后端交互的能力以及一些前后端分离项目的开发规范。



### 二、项目内容

​	因为需要嵌入的app是一个校园类的app，本项目内嵌h5页面提供一个类似于广场的功能， 任何从人都可以发布动态，管理动态，修改自己的信息(h5 页面中的信息)，查看别人信息。



### 三、项目基本逻辑

- #### 前端

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
           //评论的信息...
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



<<<<<<< HEAD



## 五、已完成接口

##### 项目路径:http://ftpip:8080/xiyouProject_war

- ### 注册接口

  ```json
  简述:通过学号注册账户,并且账户中的学号不可重复。
  url:/user/register.do
  method:post
  参数:studentId(学号)
  返回示例:
  {
      "status": 0,
      "msg": "注册成功~",
      "data":{
          "id": null,
          "username": "04182095",
          "headSculpture":"默认头像的绝对地址",
          "signature": null,
          "messageCount": null,
          "fans": null,
          "concern": null,
          "readCount": null,
          "studentId": "04182095",
          "messages": null
      }
  }
  {
      "status": 1,
      "msg": "该学号已存在!"
  }
  ```

  

- ### 登录接口

  ```json
  简述：通过学号登录账户
  url:/user/login.do
  method:post
  参数:studentId(学号)
  返回示例：
  {   
      "status": 0,
      "msg": "登陆成功~",
      "data":{
          "id": 3,
          "username": "美女1号",
          "headSculpture": "头像的默认地址",
          "signature": null,
          "messageCount": 0,
          "fans": 0,
          "concern": 0,
          "readCount": 0,
          "studentId": "04182097",
          "messages": null
      }
  }
  
  {
      "status":1,
      "msg":"该用户不存在!"
  }
  ```

- ### 更新用户信息

  ```json
  简述:更新当前已登录用户的信息(修改头像除外)
  url:/user/update.do
  参数:username(用户名) , signature(个性签名)
  注意事项:这两个参数不一定全部修改,视情况而定。
  method:post
  返回示例:
  {
      
      "status": 0,
      "msg": "修改信息成功~!",
      "data":{
          "id": 3,
          "username": "美女1号",
          "headSculpture": "",
          "signature": "我很美",
          "messageCount": 0,
          "fans": 0,
          "concern": 0,
          "readCount": 0,
          "studentId": "04182097",
          "messages": null
  }
  }
  {
      "status":1,
      "msg":"修改信息失败!"
  }
  
  {
      "status":1,
      "msg":"用户未登录~请先登录"
  }
  ```



- ### 获取当前登录用户信息

  ```json
  简述：获取当前已登录用户的信息(发表的动态除外)
  url:user/get_user_info.do
  method:get
  返回示例:
  {
      "status": 0,
      "data":{
          "id": 3,
          "username": "美女1号",
          "headSculpture": "头像绝对地址",
          "signature": "我很美",
          "messageCount": 0,
          "fans": 0,
          "concern": 0,
          "readCount": 0,
          "studentId": "04182097",
          "messages": null
          }
  }
  
  {
      "status":1,
      "msg":"当前用户未登录，请先登录!"
  }
  ```
  



- ### 获取某个用户的所有动态

```json
简述:根据用户的id获取用户所发表的所有动态
url:/user/get_user_message.do
参数:id
method:get
说明:涉及到动态表和动态内容表的两表联查，其中通过动态的id和动态内容表中的messageId作为关联，即每条动态中内容中的messageId和动态的id对应相同。
返回示例:
(用户所发表的动态为0)
{
    "status":0,
    "msg":"这里空空如也~";
}

{
    "status":0,
    "data":{ 
        "messages":{
            "message":{
                  "id":1,
                  "userId":3,
                  "pageviews":200,
                  "praisePoints":36,
                  "commentCount":5,
                  "time":2020.3.10,
                  "content":{
                      "id":1,
                      "messageId":1,
                      "contentText":"今日份开心~",
                      "contentImages":"图片1的绝对地址,图片2的绝对地址……",
                      "contentVideos":null,
                  }
            },
            "message":{
                  "id":2,
                  "userId":3,
                  "pageviews":430,
                  "praisePoints":66,
                  "commentCount":20,
                  "time":2020.4.6,
                  "content":{
                      "id":6,
                      "messageId":2,
                      "contentText":"我今天很伤心,没有见到帅哥",
                      "contentImages":null,
                      "contentVideos":null,
                  }
            },
            "message":{
                  "id":3,
                  "userId":.....,
                  "pageviews":....,
                  "praisePoints":....,
                  "commentCount":.....,
                  "time":2020.4.10,
                  "content":{
                      "id":18,
                      "messageId":3,
                      "contentText":"我今天很伤心,没有见到帅哥",
                      "contentImages":null,
                      "contentVideos":null,                
                   }
            },
           "message":{.......}
            ........
        } 
    }
}
```

- ### 查看某个用户的信息和动态(用户主页)

  ```json
  简述:根据用户的id查看用户的主页,主页包括用户的基本信息和发表的动态
  url:/user/get_info_and_message.do
  参数:id
  说明:该接口涉及到用户表，动态表，动态内容表三表联查的功能。其中用户表和动态表通过id和userId进行左外连接联查,动态表和动态内容表用过id和messageId进行左外连接查询。
  method:get/post
  返回示例：
  {
      "status":1,
      "msg":"无效参数";
  }
  
  {
      "status":1,
      "msg":"该用户不存在~";
  }
  
  {
      "status":0,
      "data":{      
          "id": 3,
          "username": "美女1号",
          "headSculpture": "头像绝对地址",
          "signature": "我很美",
          "messageCount": 0,
          "fans": 88,
          "concern": 56,
          "readCount": 1500,
          "studentId": "04182097",
          "messages":{
              "message":{
                    "id":1,
                    "userId":3,
                    "pageviews":200,
                    "praisePoints":36,
                    "commentCount":5,
                    "time":2020.3.10,
                    "content":{
                        "id":1,
                        "messageId":1,
                        "contentText":"今日份开心~",
                        "contentImages":"图片1的绝对地址,图片2的绝对地址……",
                        "contentVideos":null,
                    }
              },
              "message":{
                    "id":2,
                    "userId":3,
                    "pageviews":430,
                    "praisePoints":66,
                    "commentCount":20,
                    "time":2020.4.6,
                    "content":{
                        "id":6,
                        "messageId":2,
                        "contentText":"我今天很伤心,没有见到帅哥",
                        "contentImages":null,
                        "contentVideos":null,
                    }
              },
              "message":{
                    "id":3,
                    "userId":.....,
                    "pageviews":....,
                    "praisePoints":....,
                    "commentCount":.....,
                    "time":2020.4.10,
                    "content":{
                        "id":18,
                        "messageId":3,
                        "contentText":"我今天很伤心,没有见到帅哥",
                        "contentImages":null,
                        "contentVideos":null,                
                     }
              },
             "message":{.......}
              ........
          } 
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
>>>>>>> c2119700547be4b049c75b9f61ec48fa1e8553a5

