# 项目接口文档

>  项目路径:http://ftpip:8080/xiyouProject_war



## 一、登陆注册接口

- ### 注册

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

  

- ### 登陆

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



## 二、 用户信息获取、查询和修改接口

- ### 获取用户信息

  ```json
  简述：获取当前已登录用户的信息(发表的动态除外)
  url: user/get_user_info.do
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

- ### 更新用户信息

  ```json
  简述:更新当前已登录用户的信息(修改头像除外)
  url: /user/update.do
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

- ### 根据用户名查询用户

  ```json
  url:/user/vagueSelect.do
  说明:用户输入关键字,查找用户名中含有关键字的用户列表
  参数:info(关键字)
  method:get/post
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

  

- ### 关注用户接口

  ```json
  url: /user/concernUser.do
  参数: concernUserId(被关注的用户id)
  说明: data中的数据为被关注的用户的粉丝总数
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

- ### 获取某个用户的关注人列表

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

- ### 获取某个用户的粉丝列表

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

  

- ### 取关用户接口

  ```json
  url: /user/canceledConcern.do
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
      "msg": "您要取关=的用户不存在~",
  }
  ```

- ### 查看某个用户的信息和动态

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
  
  
  
  

## 三、获取各种动态的接口

- ### 获取主页动态

  ```json
  简述: 主页的动态（最热或者最新）
  url: /dynamic/index.do
  请求方式: get
  返回示
  {
      "status": 0,
      "data": [
          {
              动态的信息...,
              当前用户是否对该动态点赞
          },
          {
              
          },
          {
              
          }
      ]
  }
  ```

- ### 获取关注的人动态

  ```json
  简述: 查看用户关注的人的动态（最新）
  url: /dynamic/user_attent.do
  请求方式: get
  返回示例
  {
      "status": 0,
      "data": [
          {
              动态的信息...
              当前用户是否对该动态点赞
          },
          {
              
          },
          {
              
          }
      ]
  }
  ```

- ### 获取某个用户所有的动态

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

  

## 四、动态信息的接口

- ### 删除动态

  ```json
  url: /message/delete.do
  ```

  

- ### 通过动态id请求动态信息

  ```json
  简述：通过动态id请求动态详细信息
  url: /user/dynamicDetail.do
  参数：messgae_id
  请求方式: get
  返回示例:{
      "status": 0
     	"data": {
          头像
          用户名
          发送时间
          当前用户是否对该动态点赞
          动态内容: {
              文字和图片
          }	
          动态的点赞列表: [
              {
                  头像
                  id
                 	用户名
              }, 
              {
                  ...
              }
          ]
          动态的评论列表: [
           	{
                  头像
                  id
                 	用户名
                  评论的内容
                  评论的事件
              },
              {
                  
              }
           ]
  	}
  }
  ```

- ### 用户点赞动态

  ```json
  url:/message/praise.do
  参数:messageId(动态id)
  method:get/post
  返回示例:
  {
      "status": 0,
      "msg": "ok",
      "data":{
          "id": null,
          "userId": 3,
          "messageId": 15,
          "canceled": true
      }
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

  

- ### 用户取消赞动态

  ```
  url:/message/cancel_praise.do
  参数:id(该点赞记录对应的id)
  method:get/post
  返回示例:
  {
     "status": 0,
     "msg": "操作成功"
  }
  ```

## 五、评论模块接口

- ### 用户评论动态

  ```
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

  ```
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

  ```
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

  ```
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

  ```
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

## 六、评论回复模块

- ### 用户回复某一条评论(给评论进行评论)

  (这个接口返回的数据还没有进行加工,记得提醒我改)

  ```
  url:/reply/addToComment.do
  参数:content(回复内容),commentId(该评论的id),receiveUserId(收到回复的用户id)
  method:get/post
  返回示例:
  {  
      "status": 0,
      "data":{
      "id": null,
      "messageId": 46,
      "commentId": 5,
      "sendUserId": 3,
      "content": "略略略",
      "time": 1583942076281,
      "isDeleted": true,
      "receiveUserId": 3
     }
  }
  ```

- ### 用户删除回复

  ```
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










