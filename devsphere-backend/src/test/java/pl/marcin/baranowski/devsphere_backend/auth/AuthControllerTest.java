package pl.marcin.baranowski.devsphere_backend.auth;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import pl.marcin.baranowski.devsphere_backend.model.Role;
import pl.marcin.baranowski.devsphere_backend.model.User;
import pl.marcin.baranowski.devsphere_backend.repository.UserRepository;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ObjectMapper objectMapper;

    private User user;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .email("test")
                .password(passwordEncoder.encode("test"))
                .role(Role.USER)
                .build();
        userRepository.save(user);
    }

    @Test
    public void should_login_and_get_content() throws Exception {
        MvcResult login = mockMvc.perform(post("/api/v1/auth/login")
                        .content("{\"email\": \"test\", \"password\": \"test\"}")
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().is(200))
                .andReturn();
        // Parsowanie odpowiedzi JSON, aby uzyskać access_token
        String responseBody = login.getResponse().getContentAsString();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        String accessToken = jsonNode.get("access_token").asText();


        mockMvc.perform(get("/secured")
                        .header("Authorization", "Bearer " + accessToken)
                )
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(content().string("secured"));

        mockMvc.perform(get("/secured"))
                .andDo(print())
                .andExpect(status().is(403));
    }
}