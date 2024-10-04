package pl.marcin.baranowski.devsphere_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultMatcher;
import pl.marcin.baranowski.devsphere_backend.model.Role;
import pl.marcin.baranowski.devsphere_backend.model.User;
import pl.marcin.baranowski.devsphere_backend.repository.UserRepository;
import pl.marcin.baranowski.devsphere_backend.service.ImageUploaderService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@WithMockUser
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ImageUploaderService imageUploaderService;

    private User user;

    @BeforeEach
    void setUp() {
         user = User.builder()
                 .id(1L)
                 .firstName("Test")
                 .lastName("Testowy")
                 .email("test@wp.pl")
                 .password("test")
                 .role(Role.USER)
                 .build();
         userRepository.save(user);
    }


    @Test
    public void should_return_status_200_for_successful_get_user_list() throws Exception {
        mockMvc.perform(get("/api/v1/users"))
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    public void should_return_status_200_for_successful_get_single_user() throws Exception {
        mockMvc.perform(get("/api/v1/users/" + user.getId()))
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.firstName").value("Test"))
                .andExpect(jsonPath("$.lastName").value("Testowy"))
                .andExpect(jsonPath("$.email").value("test@wp.pl"));
    }

    @Test
    public void should_return_status_200_for_successful_update_user() throws Exception {
        User updatedUser = User.builder()
                .firstName("Updated firstName")
                .lastName("Updated lastName")
                .bio("Updated bio")
                .company("Updated company")
                .role(Role.USER)
                .build();

        String userJson = objectMapper.writeValueAsString(updatedUser);

        // Wczytywanie rzeczywistego obrazu z zasobów (np. src/test/resources/test-image.jpg)
        byte[] imageBytes = IOUtils.toByteArray(getClass().getResourceAsStream("/sample.jpg"));


        MockMultipartFile imageFile = new MockMultipartFile(
                "image",
                "sample.jpg",
                MediaType.IMAGE_JPEG_VALUE,
                imageBytes
        );

        MockMultipartFile userPart = new MockMultipartFile(
                "user",                   // nazwa pola (musi się zgadzać z @RequestPart)
                "",                          // oryginalna nazwa pliku (nie dotyczy w przypadku JSON)
                MediaType.APPLICATION_JSON_VALUE,  // typ zawartości (JSON)
                userJson.getBytes()       // zawartość JSON jako bajty
        );

        MvcResult mvcResult = mockMvc.perform(multipart("/api/v1/users/" + user.getId())
                                .file(userPart)
                                .file(imageFile)
                                .with(request -> {
                                    request.setMethod("PUT");
                                    return request;
                                })
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andDo(print())
                .andExpect(status().is(200))
                .andReturn();

        User newUser = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), User.class);
        assertNotNull(newUser);
        assertEquals(newUser.getFirstName(), updatedUser.getFirstName());
        assertEquals(newUser.getLastName(), updatedUser.getLastName());
        assertEquals(newUser.getEmail(), user.getEmail());
        assertEquals(newUser.getBio(), updatedUser.getBio());
    }
}
