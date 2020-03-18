package com.xiyou.util.webSocket;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 07
 * WebSocket 握手信息
 08
 *
 09
 * @ClassName: WebSocketHandshakeHandler.java
10
 * @Description: WebSocket 握手信息
11
 */

public class WebSocketHandshakeHandler extends TextWebSocketHandler {

    @Override

    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        super.handleMessage(session, message);
    }

}
