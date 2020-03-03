package com.xiyou.filter;


import javax.servlet.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SetCookie implements Filter {


    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        // TODO Auto-generated method stub
        HttpServletResponse resp = (HttpServletResponse) response;
        HttpServletRequest rep = (HttpServletRequest) request;

        response.setContentType("text/html;charset=utf-8");

        resp.addHeader("Access-Control-Allow-Origin", rep.getHeader("Origin"));
        //允许跨域请求中携带cookie
        resp.addHeader("Access-Control-Allow-Credentials", "true");
        // 如果存在自定义的header参数，需要在此处添加，逗号分隔
        resp.addHeader("Access-Control-Allow-Headers", "authorization,Origin, No-Cache, X-Requested-With, "
                + "If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, " + "Content-Type, X-E4M-With");
        resp.addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

        chain.doFilter(request, response);
    }



    public void init(FilterConfig arg0) throws ServletException {
        // TODO Auto-generated method stub
    }

    public void destroy() {
        // TODO Auto-generated method stub
    }
}
