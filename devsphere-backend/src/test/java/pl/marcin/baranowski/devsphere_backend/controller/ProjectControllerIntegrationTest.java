package pl.marcin.baranowski.devsphere_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import pl.marcin.baranowski.devsphere_backend.model.Project;
import pl.marcin.baranowski.devsphere_backend.repository.ProjectRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@WithMockUser
public class ProjectControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private ProjectRepository projectRepository;

    @Test
    public void should_get_single_project() throws Exception{
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
}
