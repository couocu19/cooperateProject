package com.xiyou.service.impl;

import com.google.common.collect.Lists;
import com.xiyou.common.ServletResponse;
import com.xiyou.dao.MessageMapper;
import com.xiyou.dao.UserMapper;
import com.xiyou.pojo.Message;
import com.xiyou.pojo.User;
import com.xiyou.service.IUserService;
import com.xiyou.vo.UserVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service("iUserService")
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private MessageMapper messageMapper;

    public ServletResponse<User> register(String studentId,String preStr){
        if(StringUtils.isBlank(studentId)){
            return ServletResponse.createByErrorMessage("无效参数!");
        }

        int rowCount = userMapper.selectByStudentId(studentId);
        if(rowCount>0){
            return ServletResponse.createByErrorMessage("该学号已存在!");
        }
        User user = new User();
        user.setStudentId(studentId);
        user.setUsername(studentId);

        //设置用户的默认头像路径
        String path = preStr+"images/defaultHeader.jpg";
        user.setHeadSculpture(path);

        rowCount = userMapper.insertSelective(user);
        if(rowCount>0){
            return ServletResponse.createBySuccess("注册成功~",user);
        }

        return ServletResponse.createByErrorMessage("注册失败");

    }


    public ServletResponse<User> login(String studentId){
        if(StringUtils.isBlank(studentId)){
            return ServletResponse.createByErrorMessage("无效参数!");
        }

        int rowCount = userMapper.selectByStudentId(studentId);
        if(rowCount>0){
            User user = userMapper.checkLogin(studentId);
            return ServletResponse.createBySuccess("登陆成功~",user);
        }
        return ServletResponse.createByErrorMessage("该学号不存在~ 登录失败");

    }

    public ServletResponse<User> updateInformation(User user){

       int rowCount =  userMapper.updateByPrimaryKeySelective(user);

       if(rowCount>0){
           return ServletResponse.createBySuccess("修改信息成功~!",user);
       }

       return ServletResponse.createByErrorMessage("修改信息失败~");

    }

    public ServletResponse<List<Message>> getUserALLMessage(Integer id){
        List<Message> list = messageMapper.getUserAllMessage(id);
        if(list.size() == 0){
            return ServletResponse.createBySuccessMessage("这里空空如也~");
        }

        //todo:处理动态中文字内容，图片内容，视频内容为空的状况

        return ServletResponse.createBySuccess(list);

    }

    public ServletResponse<User> getUserInfoAndMessages(Integer studentId){

        User users = userMapper.selectByPrimaryKey(studentId);
        if(users == null){
            return ServletResponse.createByErrorMessage("用户不存在~");
        }
        User users1 = userMapper.selectAllInfoByStudyId(studentId);
        if(users1 == null){
            User user = new User();
            user.setId(users.getId());
            Integer readCount = users.getReadCount();
            readCount++;
            user.setReadCount(readCount);
            userMapper.updateByPrimaryKeySelective(user);
            return ServletResponse.createBySuccess(users);
        }else {
            User user = new User();
            user.setId(users1.getId());
            Integer readCount = users.getReadCount();
            readCount++;
            user.setReadCount(readCount);
            userMapper.updateByPrimaryKeySelective(user);
            return ServletResponse.createBySuccess(users1);
        }
    }

    public ServletResponse concernUser(User user,Integer concernedUserId){

        Integer userId = user.getId();
        if(userId == concernedUserId){
            return ServletResponse.createByErrorMessage("自己不能关注自己奥~");
        }
        User cUser = userMapper.selectByPrimaryKey(concernedUserId);
        if(cUser == null){
            return ServletResponse.createByErrorMessage("您想要关注的用户不存在~");
        }
        //A关注B
        //A的关注人数+1,A的关注用户中添加B的id
        //B的粉丝人数+1,B的粉丝用户中添加A的id
        String id = String.valueOf(concernedUserId);
        //判断当前用户之前是否关注过该用户
        String flagId = ","+id;
        String concerns = user.getConcernUsers();
        if(concerns!=null && concerns.indexOf(flagId) !=-1){
            return ServletResponse.createByErrorMessage("您已关注该用户！");
        }

        //更新数量
        Integer concernCount = user.getConcern();
        concernCount++;
        user.setConcern(concernCount);
        concerns = concerns+","+id;
        user.setConcernUsers(concerns);
        //更新A
        userMapper.updateByPrimaryKeySelective(user);

        Integer fanCount = cUser.getFans();
        fanCount++;
        cUser.setFans(fanCount);
        String id1 = String.valueOf(userId);
        String fans = cUser.getFanUsers();
        fans = fans + ","+id1;
        cUser.setFanUsers(fans);
        //更新B
        userMapper.updateByPrimaryKey(cUser);

        //返回被关注用户的粉丝数和成功信息
        return ServletResponse.createBySuccess("关注成功~",fanCount);


    }

    //取关用户
    public ServletResponse cancelConcern(User user,Integer concernedUserId){
        Integer userId = user.getId();
        if(userId == concernedUserId){
            return ServletResponse.createByErrorMessage("自己不能取关自己~");
        }
        User cUser = userMapper.selectByPrimaryKey(concernedUserId);
        if(cUser == null){
            return ServletResponse.createByErrorMessage("您要取关的用户不存在~");
        }
        //首先判断是否关注过该用户
        String concerns = user.getConcernUsers();
        String id = String.valueOf(concernedUserId);
        String flagId = ","+id;
        if(concerns!=null && concerns.indexOf(flagId) == -1){
            return ServletResponse.createByErrorMessage("您还未关注该用户~");
        }
        String newConcern = concerns.replace(flagId,"");
        user.setConcernUsers(newConcern);
        //更新关注数量
        Integer count = user.getConcern();
        count--;
        user.setConcern(count);
        userMapper.updateByPrimaryKey(user);

        //更新粉丝
        User user1 = userMapper.selectByPrimaryKey(concernedUserId);
        String fans = user1.getFanUsers();
        String id1 = String.valueOf(userId);
        String flagId1 = ","+id1;
        String newFans = fans.replace(flagId1,"");
        user1.setFanUsers(newFans);
        Integer count1 = user1.getFans();
        count1--;
        user1.setFans(count1);
        userMapper.updateByPrimaryKey(user1);

        //返回取关成功的信息以及取关后的粉丝数
        return ServletResponse.createBySuccess("success",count1);

    }

    public ServletResponse<List<UserVo>> getConcernsById(Integer id){
        User user = userMapper.selectByPrimaryKey(id);
        if(user == null){
            return ServletResponse.createByErrorMessage("用户不存在~");
        }

        String concerns = user.getConcernUsers();
        if(concerns == null){
            return ServletResponse.createByErrorMessage("TA还没有关注任何人~");
        }
        String[] con = concerns.split(",");
        Integer sid = null;
        List<User> users = new ArrayList<>();
        User sUser = null;
        for(int i = 1;i<con.length;i++){
            sid = Integer.valueOf(con[i]);
            sUser = userMapper.selectByPrimaryKey(sid);
            if(sUser!=null){
                users.add(sUser);
            }
        }
        List<UserVo> userVos = new ArrayList<>();
        UserVo userVo = null;
        for(User u: users){
            userVo = assembleUser(u);
            userVos.add(userVo);
        }
        return ServletResponse.createBySuccess(userVos);

    }

    public ServletResponse<List<UserVo>> getFansById(Integer id){
        User user = userMapper.selectByPrimaryKey(id);
        if(user == null){
            return ServletResponse.createByErrorMessage("用户不存在~");
        }
        String fans = user.getFanUsers();
        if(fans == null){
            return ServletResponse.createByErrorMessage("还没有人关注TA~");
        }
        String[] fan = fans.split(",");
        Integer sid = null;
        List<User> users = new ArrayList<>();
        User sUser = null;
        for(int i = 1;i<fan.length;i++){
            sid = Integer.valueOf(fan[i]);
            sUser = userMapper.selectByPrimaryKey(sid);
            if(sUser!=null){
                users.add(sUser);
            }
        }

        List<UserVo> userVos = new ArrayList<>();
        UserVo userVo = null;
        for(User u: users){
            userVo = assembleUser(u);
            userVos.add(userVo);
        }
        return ServletResponse.createBySuccess(userVos);


}

    public ServletResponse<List<UserVo>> vagueSelect(String massage){
        String sqlMassage = "%"+massage+"%";
        List<User> users = userMapper.selectByKeyInfo(sqlMassage);
        if(users!=null){
            List<UserVo> userVos = new ArrayList<>();
            UserVo userVo = null;
            for(User user:users){
                userVo = assembleUser(user);
                userVos.add(userVo);
            }
            return ServletResponse.createBySuccess(userVos);
        }
        return ServletResponse.createByErrorMessage("没有查到相关用户~");
    }

    private UserVo assembleUser(User user){
        UserVo userVo = new UserVo();
        userVo.setId(user.getId());
        userVo.setHeader(user.getHeadSculpture());
        userVo.setUserName(user.getUsername());
        userVo.setFans(user.getFans());
        userVo.setSignature(user.getSignature());

        return userVo;
    }

    //判断前者是否关注了后者
    public boolean isConcerned(Integer curId,Integer conId){
        User curUser = userMapper.selectByPrimaryKey(curId);
        String concerns = curUser.getConcernUsers();
        if(concerns == null){
            return false;
        }
        String[] cons = concerns.split(",");
        String id = String.valueOf(conId);
        for(int i =1;i<cons.length;i++){
            if(cons[i].equals(id)){
                return true;
            }
        }
        return false;
    }

}
