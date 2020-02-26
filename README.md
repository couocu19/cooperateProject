# cooperateProject

### 一、项目介绍

​	一个前后端分离的项目， 前端开发app端内嵌h5，后端提供数据的支持。主要为了锻炼前后端交互的能力以及一些前后端分离项目的开发规范。



### 二、项目内容

​	因为需要嵌入的app是一个校园类的app，本项目内嵌h5页面提供一个类似于广场的功能， 任何从人都可以发布动态，管理动态，修改自己的信息(h5 页面中的信息)，查看别人信息。



### 三、项目基本逻辑

- #### 前端

  - ##### 每个用户进入后都有其android对应的注入的ID,每个页面利用ID做为后端查找的主键

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
参数:id
method:get
返回示例:
(用户所发表的动态为0)
{
    "status":0,
    "msg":"这里空空如也~";
}

{
    "status":0,
    "data":{ 
        "message":{
            "id":,
            "userId":,
            "pageviews":,
            "praisePoints":,
            "commentCount":,
            "time":2020.3.10,
            "content":{
          
            
        }
    },
        "message":{
            "id":
            "userId":
            "pageviews":
            "praisePoints"
            "commentCount"
            "time"
            "content":{
           
        }
    } 
}
}
```



