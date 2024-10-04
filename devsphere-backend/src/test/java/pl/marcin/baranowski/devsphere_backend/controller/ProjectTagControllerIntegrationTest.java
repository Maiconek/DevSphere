package pl.marcin.baranowski.devsphere_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import pl.marcin.baranowski.devsphere_backend.model.ProjectTag;
import pl.marcin.baranowski.devsphere_backend.repository.ProjectTagRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser
@ActiveProfiles("test")
public class ProjectTagControllerIntegrationTest {
    @Autowired
    private ProjectTagController projectTagController;
    @Autowired
    private ProjectTagRepository projectTagRepository;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    private ProjectTag projectTag;

    @BeforeEach
    void setUp() {
        projectTag = ProjectTag.builder()
                .id(1L)
                .name("Test")
                .build();
        projectTagRepository.save(projectTag);

        ProjectTag projectTag2 = ProjectTag.builder()
                .id(2L)
                .name("Test 2")
                .build();
        projectTagRepository.save(projectTag2);
    }

    @Test
    public void should_return_status_200_for_successful_get_tags_list() throws Exception {
        mockMvc.perform(get("/api/v1/tags"))
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    public void should_return_status_200_for_successful_get_single_tag() throws Exception {
        mockMvc.perform(get("/api/v1/tags/" + projectTag.getId()))
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Test"));

    }

    @Test
    public void should_return_status_200_for_successful_delete_tag() throws Exception {
        List<ProjectTag> tags = projectTagRepository.findAll();

        mockMvc.perform(delete("/api/v1/tags/" + projectTag.getId()))
                .andDo(print())
                .andExpect(status().is(200))
                .andReturn();

        List<ProjectTag> tagsAfterDeletion = projectTagRepository.findAll();

        assertEquals(tags.size(), 2);
        assertEquals(tagsAfterDeletion.size(), 1);
    }
}
