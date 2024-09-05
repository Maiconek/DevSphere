package pl.marcin.baranowski.devsphere_backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.exceptions.ResourceNotFoundException;
import pl.marcin.baranowski.devsphere_backend.model.Project;
import pl.marcin.baranowski.devsphere_backend.repository.ProjectRepository;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getSingleProject(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project does not exist with id: " + id));
    }

    public Project updateProject(Long id, Project project) {
        Project updatedProject = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project does not exist with id: " + id));

        updatedProject.setTitle(project.getTitle());
        updatedProject.setDescription(project.getDescription());
        updatedProject.setShortIntro(project.getShortIntro());
        updatedProject.setLink(project.getLink());

        return projectRepository.save(updatedProject);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
