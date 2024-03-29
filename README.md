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



- ### 用户点赞动态

  ```json
url:/message/praise.do
  参数:messageId(动态id)
  method:get/post
  说明:1.data为动态当前的点赞总数
      2.如果对同一个动态请求两次,第二次自动转为取消赞
  返回示例:
  {  
      "status": 0,
      "msg": "ok",
      "data": 1
  }
  ```
  
- ### 用户取消赞动态

  ```json
  url:/message/cancel_praise.do
  参数:id(该点赞记录对应的id)
  说明:1.data为动态当前的点赞总数
      2.如果对同一个动态请求两次，第二次自动转为点赞
  method:get/post
  返回示例:
  {
  "status": 0,
  "msg": "ok",
"data": 3
  }
  ```
  
  

## 评论模块接口

- ### 用户评论动态

  ```json
  请求url:/comment/addToMessage.do
  参数:messageId(动态id),content(评论内容)
  说明:如果评论成功,则返回当前动态的所有评论列表并按照时间的降序排列展示，即最上面的评论为刚刚发表的评论
  method:get/post
  返回示例:
  {
      "status": 1,
      "msg": "用户尚未登录,请先登录~"
  }
  {
  "status": 0,
  "data":[ 
      {
      "commentId": 7,
      "sendUsername": "美女1号",
      "header":"http://118.31.12.175:8080/.....images/defaultHeader.jpg",
      "time": "2020-03-11 23:02:16",
      "content": "您真好看啊啊",
      "praiseCount": 0,
      "firstReplyUser": null,
      "firstReplyContent": null,
      "replyCountMessage": null
     },
      {
      "commentId": 5,
      "sendUsername": "美女1号",
      "header": "http://118.31.12.175:8080/.....images/defaultHeader.jpg",
      "time": "2020-03-09 23:47:00",
      "content": "我自己给自己评论",
      "praiseCount": 0,
      "firstReplyUser": null,
      "firstReplyContent": null,
      "replyCountMessage": null
     }
  ]
  }
  ```

- ### 用户删除动态评论

  ```json
  url:/comment/deleteComment.do
  参数:commentId(被删除评论的id)
  method:get/post
  说明:当用户没有删除该评论的权限时，会返回没有操作权限；数据库删除失败时，会返回"操作失败".
  返回示例:
  {
      "status": 1,
      "msg": "用户尚未登录,请先登录~"
  }
  {
      "status": 1,
      "msg": "没有操作权限"
  }
  {
      "status": 1,
      "msg": "操作失败"
  }
  {
      "status": 0,
      "data": "操作成功！"
  }
  ```

- ### 查看某条动态的所有评论

  ```json
  url:/comment/getMessAllComments.do
  参数:messageId(动态id)
  返回示例:
  {
      "status": 1,
      "msg": "用户尚未登录,请先登录~"
  }
  {
  "status": 0,
  "data":[
     {
     "commentId": 4,
     "sendUsername": "美女1号",
     "header": "http://118.31.12.175:8080/....defaultHeader.jpg",
     "time": "2020-03-09 23:22:16",
     "content": "aaaaaaa",
     "praiseCount": 0,
     "firstReplyUser": "美女1号",
     "firstReplyContent": ":啦啦啦啦阿里",
     "replyCountMessage": "共0条评论回复"
    },
     {
     "commentId": 3,
     "sendUsername": "美女1号",
     "header": "http://118.31.12.175:8080/....defaultHeader.jpg",
     "time": "2020-03-09 18:23:38",
     "content": "哈哈哈哈哈哈哈哈",
     "praiseCount": 1,
     "firstReplyUser": null,
     "firstReplyContent": null,
     "replyCountMessage": null
    },
     {
     "commentId": 2,
     "sendUsername": "美女1号",
     "header": "http://118.31.12.175:8080/....defaultHeader.jpg",
     "time": "2020-03-08 23:30:40",
     "content": "哼！",
     "praiseCount": 1,
     "firstReplyUser": null,
     "firstReplyContent": null,
     "replyCountMessage": null
    }
  ]
  }
  ```



- ### 查看某条动态下某一条评论以及该评论的所有回复

  ```json
  url:/comment/getCommentAndReply.do
  参数:commentId(评论对应的id)
  method:get/post
  返回示例:
  {
      "status": 1,
      "msg": "登录您的账户,查看更多内容~"
  }
  {
      
      "status": 0,
      "data":{
      "commentId": 4,
      "sendUsername": "美女1号",
      "header": "http://118.31.12.175:8080/....mages/defaultHeader.jpg",
      "time": "2020-03-09 23:22:16",
      "content": "aaaaaaa",
      "praiseCount": 0,
      "replies":[
          
          {
          "replyId": 4,
          "sendReplyUserId": 3,
          "replyUsername": "美女1号",
          "header": "http://118.31.12.175:8080/....mages/defaultHeader.jpg",
          "time": "2020-03-11 11:08:08",
          "content": "啦啦啦啦阿里",
          "receiveReplyUserId": 3,
          "receiveReplyUserName": "美女1号"
         },
          {
          "replyId": 3,
          "sendReplyUserId": 3,
          "replyUsername": "美女1号",
          "header": "http://118.31.12.175:8080/...images/defaultHeader.jpg",
          "time": "2020-03-11 11:06:47",
          "content": "嘻嘻嘻嘻嘻嘻",
          "receiveReplyUserId": 3,
          "receiveReplyUserName": "美女1号"
         },
          {
          "replyId": 2,
          "sendReplyUserId": 3,
          "replyUsername": "美女1号",
          "header": "http://118.31.12.175:8080/.../images/defaultHeader.jpg",
          "time": "2020-03-09 23:25:09",
          "content": "你说的对啊",
          "receiveReplyUserId": 3,
          "receiveReplyUserName": "美女1号"
         }
  ]
  }
  }
  ```

- ### 用户点赞某一条评论

  ```json
  url:/comment/praiseComment.do
  参数:commentId(评论id)
  method:get/post
  返回示例:
  {
      "status": 1,
      "msg": "用户尚未登录,请先登录~"
  }
  {
      "status": 0,
      "data": "ok"
  }
  ```

  

  ## 评论回复模块

- ### 用户回复某一条评论(给评论进行评论)

  ```json
url:/reply/addToComment.do
  参数:content(回复内容),commentId(该评论的id),receiveUserId(收到回复的用户id)
  method:get/post
  返回示例:
  {    
      "status": 0,
      "data":{
      "commentId": 13,
      "replyId": 12,
      "sendReplyUserId": 6,
      "replyUsername": "老人与海燕",
      "header": "http://118.31.12.175:8080/xiy..mages/defaultHeader.jpg",
      "time": "2020-03-17 17:58:39",
      "content": "嘻嘻嘻",
      "receiveReplyUserId": 6,
      "receiveReplyUserName": "老人与海燕"
     }
  }
  ```
  
- ### 用户删除回复

  ```json
  url:/reply/delete.do
  参数:replyId(回复的id)
  method:get/method
  返回示例:
  {
      "status": 0,
      "data": "删除成功!"
  }
  {
      "status": 1,
      "data": "删除失败!"
  }
  ```

---------------------------------------------------------------------------------------------------------------------------------------------------------

- ### 模糊查询用户

  ```json
  url:/user/vagueSelect.do
  说明:用户输入关键字,查找用户名中含有关键字的用户列表
  参数:info(关键字)
  method:get/method
  参数示例:'美女'
  返回示例:
  {
  "status": 0,
  "data":[   
      {
      "id": 3,
      "userName": "美女1号",
      "signature": "我很美",
      "header": "http://118.31.12.175:8080..../images/defaultHeader.jpg",
      "fans": 0
     },
      {
      "id": 4,
      "userName": "美女2号",
      "signature": null,
      "header": "http://118.31.12.175:8080..../images/defaultHeader.jpg",
      "fans": 0
     },
  {
      "id": 5,
      "userName": "美女3号",
      "signature": null,
      "header": "http://118.31.12.175:8080....images/defaultHeader.jpg",
      "fans": 0
     }
  ]
  }
  
  ```

- ### 用户获取某个动态的点赞列表

  ```json
  url:/message/getPraiseUsers.do
  参数:messageId(动态id)
  method:get/post
  返回示例:
  {
      "status": 0,
      "data":[
      {
      "praiseId": 1,
      "praiseUserId": 3,
      "praiseUserName": "美女1号",
      "header": null,
      "signature": "我很美"
     },
      {
      "praiseId": 5,
      "praiseUserId": 2,
      "praiseUserName": "楚楚",
      "header": null,
      "signature": "我是一个美女！！！"
     }
  ]
  }
  ```


### 3.17号更新的接口

- ### 用户关注他人

  ```json
  url:/user/concernUser.do
  参数:concernUserId(被关注的用户id)
  说明:data中的数据为被关注的用户的粉丝总数
  返回实例:
  {  
      "status": 0,
      "msg": "关注成功~",
      "data": 1
  }
  {  
      "status": 1,
      "msg": "自己不能关注自己奥~",
  }
  {  
      "status": 1,
      "msg": "您想要关注的用户不存在",
  }
  ```

- ### 用户取关他人

  ```json
  url:/user/canceledConcern.do
  参数:concernUserId(被关注的用户id)
  说明:data中的数据为被关注的用户的粉丝总数
  返回实例:
  { 
      "status": 0,
      "msg": "success",
      "data": 0
  }
  {  
      "status": 1,
      "msg": "您要取关的用户不存在~",
  }
  ```

  

- ### 获取用户的关注列表

  ```json
  url:/user/getConcernUsers.do
  参数:id(用户的id)
  返回示例:
  {    
      "status": 0,
      "data":[
      {
      "id": 12,
      "userName": "04182077",
      "signature": null,
      "header": "http://118.31.12.175:8080...mages/defaultHeader.jpg",
      "fans": 2
     },
      {
      "id": 12,
      "userName": "04182077",
      "signature": null,
          "header": "http://118.31.12.175:8080/xi...mages/defaultHeader.jpg",
      "fans": 2
     },
      {
      "id": 11,
      "userName": "李岳耿",
      "signature": "李岳耿",
          "header": "http://118.31.12.175:8080/xiyouPro...es/defaultHeader.jpg",
      "fans": 1
     },
      {
      "id": 7,
      "userName": "????",
      "signature": "???????????",
      "header": "http://118.31.12.175:8080/xiyouPr...ages/defaultHeader.jpg",
      "fans": 1
     }
  ]
  }
  
  { 
      "status": 1,
      "msg": "TA还没有关注任何人~"
  }
  { 
      "status": 1,
      "msg": "该用户不存在"
  }
  ```

- ### 获取用户的粉丝列表

  ```json
  url:/user/getFans.do
  参数:id(用户的id)
  返回示例:
  { 
      "status": 1,
      "msg": "还没有人关注TA~"
  }
  {
      
      "status": 0,
      "data":[
      {
      "id": 9,
      "userName": "新的美女",
      "signature": "当然了，我也是一个美女",
      "header": "http://118.31.12.175:8080/..s/defaultHeader.jpg",
      "fans": 0
     }
  ]
  }
  
  { 
      "status": 1,
      "msg": "用户不存在~"
  }
  ```

  



