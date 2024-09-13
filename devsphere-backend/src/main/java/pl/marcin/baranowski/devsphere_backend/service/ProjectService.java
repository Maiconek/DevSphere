package pl.marcin.baranowski.devsphere_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.exceptions.ResourceNotFoundException;
import pl.marcin.baranowski.devsphere_backend.model.Project;
import pl.marcin.baranowski.devsphere_backend.model.ProjectTag;
import pl.marcin.baranowski.devsphere_backend.model.User;
import pl.marcin.baranowski.devsphere_backend.repository.ProjectRepository;
import pl.marcin.baranowski.devsphere_backend.repository.ProjectTagRepository;
import pl.marcin.baranowski.devsphere_backend.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectTagRepository projectTagRepository;



    public Project saveProject(Project project) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        User owner = userRepository.findByUsername(currentUsername);
        if (owner == null) {
            throw new RuntimeException("User not found");
        }

        project.setUser(owner);

        Set<ProjectTag> foundTags = new HashSet<>();
        for(ProjectTag tag: project.getTags()) {
            ProjectTag fTag = projectTagRepository.findById(tag.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Tag not found " + tag.getId()));
            foundTags.add(fTag);
        }

        project.setTags(foundTags.stream().toList());

        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getSingleProject(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project does not exist with id: " + id));
    }

    public List<Project> getProjectsByUserId(Long userId) {
        return projectRepository.findByUserId(userId);
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
