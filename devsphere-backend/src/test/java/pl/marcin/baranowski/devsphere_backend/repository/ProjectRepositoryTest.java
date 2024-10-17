package pl.marcin.baranowski.devsphere_backend.repository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import pl.marcin.baranowski.devsphere_backend.model.Project;

import java.util.List;

@SpringBootTest
public class ProjectRepositoryTest extends MyIntegrationTest {
    @Autowired
    ProjectRepository projectRepository;

    @Test
    public void should_successfully_save_a_project_to_repository() {
        // given
        Project project = Project.builder()
                .title("Test235")
                .shortIntro("Test")
                .description("Test")
                .link("Test")
                .build();
        // when
        projectRepository.save(project);

        // then
        List<Project> projectList = projectRepository.findAll();
        Assertions.assertEquals(projectList.size(), 1);
    }
}
