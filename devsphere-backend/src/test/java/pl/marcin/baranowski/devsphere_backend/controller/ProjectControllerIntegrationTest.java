package pl.marcin.baranowski.devsphere_backend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.apache.commons.io.IOUtils;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import pl.marcin.baranowski.devsphere_backend.model.Project;
import pl.marcin.baranowski.devsphere_backend.model.Role;
import pl.marcin.baranowski.devsphere_backend.model.User;
import pl.marcin.baranowski.devsphere_backend.repository.ProjectRepository;
import pl.marcin.baranowski.devsphere_backend.repository.UserRepository;
import pl.marcin.baranowski.devsphere_backend.service.ImageUploaderService;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
@WithMockUser
public class ProjectControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ImageUploaderService imageUploaderService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @MockBean
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    void setUp() {
         user = User.builder()
                 .id(1L)
                 .email("test")
                 .password(passwordEncoder.encode("test"))
                 .role(Role.USER)
                 .build();
        userRepository.save(user);
    }

    @Test
    public void should_return_single_project() throws Exception{
        // given
        Project newProject = Project.builder()
                .title("Test title")
                .description("Test desc")
                .shortIntro("Test short intro")
                .link("Test link")
                .build();
        projectRepository.save(newProject);
        // when
        MvcResult mvcResult = mockMvc.perform(get("/api/v1/projects/" + newProject.getId()))
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.title").value("Test title"))
                .andReturn();
        // then
        Project project = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), Project.class);
        assertNotNull(project);
        assertEquals(project.getId(), 1);
        assertEquals(project.getTitle(), "Test title");
        assertEquals(project.getDescription(), "Test desc");
        assertEquals(project.getShortIntro(), "Test short intro");
        assertEquals(project.getLink(), "Test link");
    }

    @Test
    public void should_return_status_404_for_wrong_request() throws Exception {
        mockMvc.perform(get("/api/v1/projectsss/"))
                .andDo(print())
                .andExpect(status().is(404))
                .andReturn();
    }

    @Test
    @WithMockUser(username = "test")
    public void should_return_status_200_for_successful_post_request() throws Exception{
        // Mockowanie zachowania userRepository, aby zwróciło mockUser dla danego emaila
        Mockito.when(userRepository.findByEmail("test")).thenReturn(Optional.of(user));


        Project newProject = Project.builder()
                .title("Test title")
                .description("Test desc")
                .shortIntro("Test short intro")
                .link("Test link")
                .tags(null)
                .build();

        String projectJson = objectMapper.writeValueAsString(newProject);

        // Wczytywanie rzeczywistego obrazu z zasobów (np. src/test/resources/test-image.jpg)
        byte[] imageBytes = IOUtils.toByteArray(getClass().getResourceAsStream("/sample.jpg"));


        MockMultipartFile imageFile = new MockMultipartFile(
                "imageFile",
                "sample.jpg",
                MediaType.IMAGE_JPEG_VALUE,
                imageBytes
        );

        MockMultipartFile projectPart = new MockMultipartFile(
                "project",                   // nazwa pola (musi się zgadzać z @RequestPart)
                "",                          // oryginalna nazwa pliku (nie dotyczy w przypadku JSON)
                MediaType.APPLICATION_JSON_VALUE,  // typ zawartości (JSON)
                projectJson.getBytes()       // zawartość JSON jako bajty
        );

        // when
        MvcResult mvcResult = mockMvc.perform(multipart("/api/v1/projects")
                        .file(projectPart)
                        .file(imageFile)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andDo(print())
                .andExpect(status().is(200))
                .andReturn();
        // then
        Project project = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), Project.class);
        assertNotNull(project);
        assertEquals("Test title", project.getTitle());
    }

    @Test
    @WithMockUser(username = "test")
    public void should_return_status_200_for_successful_update_request() throws Exception {
        Mockito.when(userRepository.findByEmail("test")).thenReturn(Optional.of(user));

        Project existingProject = Project.builder()
                .id(1L)
                .title("Old title")
                .description("Old desc")
                .shortIntro("Old short intro")
                .link("Old link")
                .tags(null)
                .build();

        Project updatedProject = Project.builder()
                .title("Updated title")  // nowe dane, które chcemy ustawić
                .description("Updated desc")
                .shortIntro("Updated short intro")
                .link("Updated link")
                .tags(null)
                .build();

        projectRepository.save(existingProject);

        String projectJson = objectMapper.writeValueAsString(updatedProject);

        // Wczytywanie rzeczywistego obrazu z zasobów (np. src/test/resources/test-image.jpg)
        byte[] imageBytes = IOUtils.toByteArray(getClass().getResourceAsStream("/sample.jpg"));

        // Mockowanie pliku obrazu
        MockMultipartFile imageFile = new MockMultipartFile(
                "imageFile",               // nazwa pola pliku
                "sample.jpg",              // nazwa pliku
                MediaType.IMAGE_JPEG_VALUE, // typ pliku (MIME type)
                imageBytes                 // rzeczywista zawartość pliku obrazu
        );

        // Mockowanie danych JSON dla projektu
        MockMultipartFile projectPart = new MockMultipartFile(
                "project",                          // nazwa pola (musi się zgadzać z @RequestPart)
                "",                                 // oryginalna nazwa pliku (nie dotyczy w przypadku JSON)
                MediaType.APPLICATION_JSON_VALUE,   // typ zawartości (JSON)
                projectJson.getBytes()              // zawartość JSON jako bajty
        );

        // Wykonanie żądania PUT na endpoint /projects/{id} (zaktualizowanie istniejącego projektu)
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.multipart("/api/v1/projects/" + existingProject.getId())
                        .file(projectPart)                 // część JSON z danymi projektu
                        .file(imageFile)                   // część pliku (obraz)
                        .with(request -> {
                            request.setMethod("PUT");      // metoda PUT
                            return request;
                        })
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andDo(print())
                .andExpect(status().is(200))               // oczekujemy statusu 200 OK
                .andReturn();

        // Odczytanie zaktualizowanego projektu z odpowiedzi
        Project project = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), Project.class);

        // Asercje: Sprawdzamy, czy odpowiedź zawiera zaktualizowane dane projektu
        assertNotNull(project);
        assertEquals(updatedProject.getTitle(), project.getTitle());
        assertEquals(updatedProject.getDescription(), project.getDescription());
        assertEquals(updatedProject.getShortIntro(), project.getShortIntro());
        assertEquals(updatedProject.getLink(), project.getLink());
    }


    @Test
    public void should_return_list_of_projects() throws Exception {
        // given
        Project newProject = Project.builder()
                .title("Test title")
                .description("Test desc")
                .shortIntro("Test short intro")
                .link("Test link")
                .build();
        projectRepository.save(newProject);
        Project newProject2 = Project.builder()
                .title("Test title")
                .description("Test desc")
                .shortIntro("Test short intro")
                .link("Test link")
                .build();
        projectRepository.save(newProject2);

        List<Project> projectList = new ArrayList<>();
        projectList.add(newProject);
        projectList.add(newProject2);
        // when
        MvcResult mvcResult = mockMvc.perform(get("/api/v1/projects"))
                .andDo(print())
                .andExpect(status().is(200))
                .andReturn();
        // then
        List<Project> returnedProjects = objectMapper.readValue(mvcResult.getResponse().getContentAsString(),
                new TypeReference<List<Project>>() {}
        );

        assertEquals(returnedProjects.size(), projectList.size());
    }



    @Test
    public void should_return_status_200_for_successful_delete_request() throws Exception {
        Project newProject = Project.builder()
                .title("Test title")
                .description("Test desc")
                .shortIntro("Test short intro")
                .link("Test link")
                .build();
        projectRepository.save(newProject);

        List<Project> projectList = projectRepository.findAll();

        mockMvc.perform(delete(
                        "/api/v1/projects/" + newProject.getId()))
                .andDo(print())
                .andExpect(status().is(200))
                .andReturn();

        List<Project> projectsAfterDeletion = projectRepository.findAll();

        assertEquals(projectList.size(), 1);
        assertEquals(projectsAfterDeletion.size(), 0);
    }
}
