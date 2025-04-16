package pl.marcin.baranowski.devsphere_backend.config.websockets;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import pl.marcin.baranowski.devsphere_backend.config.jwt.JwtService;

import java.util.Map;

//@Component
//@RequiredArgsConstructor
//public class JwtHandshakeInterceptor implements HandshakeInterceptor {
//    private final JwtService jwtService;
//    private final UserDetailsService userDetailsService;
//
//    @Override
//    public boolean beforeHandshake(ServerHttpRequest request,
//                                   ServerHttpResponse response,
//                                   WebSocketHandler wsHandler,
//                                   Map<String, Object> attributes) throws Exception {
//        if (request instanceof ServletServerHttpRequest servletRequest) {
//            HttpServletRequest httpServletRequest = servletRequest.getServletRequest();
//            String token = httpServletRequest.getParameter("token");
//
//            if (token != null) {
//                try {
//                    String username = jwtService.extractUsername(token);
//                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//
//                    if (jwtService.isTokenValid(token, userDetails)) {
//                        UsernamePasswordAuthenticationToken authentication =
//                                new UsernamePasswordAuthenticationToken(
//                                        userDetails, null, userDetails.getAuthorities());
//
//                        SecurityContextHolder.getContext().setAuthentication(authentication);
//                        attributes.put("user", authentication.getPrincipal());
//                        return true;
//                    }
//                } catch (Exception e) {
//                    e.printStackTrace(); // albo loguj
//                }
//            }
//        }
//
//        response.setStatusCode(HttpStatus.UNAUTHORIZED);
//        return false;
//    }
//
//    @Override
//    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
//                               WebSocketHandler wsHandler, Exception exception) {
//    }
//}

