package com.xiyou.common;

import com.xiyou.vo.MessageVo;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class Tset {
    public static void main(String[] args) {
        //yyyy-MM-dd HH:mm:ss

        List<MessageVo> list=  new ArrayList<>();
        MessageVo m1 = new MessageVo();
        String t1 = "2000-12-23 18:34:22";
        m1.setTime(t1);
        m1.setPraiseCount(10);
        MessageVo m2 = new MessageVo();
        String t2 = "2000-12-23 18:34:22";
        m2.setTime(t2);
        m2.setPraiseCount(31);
        MessageVo m3 = new MessageVo();
        String t3 = "1998-12-23 18:34:22";
        m3.setTime(t3);
        m3.setPraiseCount(76);
        MessageVo m4 = new MessageVo();
        String t4 = "2009-12-23 18:34:22";
        m4.setTime(t4);
        m4.setPraiseCount(888);

        list.add(m1);
        list.add(m2);
        list.add(m3);
        list.add(m4);

        for(int i = 0;i<list.size();i++){
            System.out.println(list.get(i));
        }
        System.out.println("=======");
        Collections.sort(list);
        for(int i = 0;i<list.size();i++){
            System.out.println(list.get(i));
        }


    }



}
