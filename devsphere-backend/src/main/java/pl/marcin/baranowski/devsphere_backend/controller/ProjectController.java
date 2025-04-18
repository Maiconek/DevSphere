package pl.marcin.baranowski.devsphere_backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.marcin.baranowski.devsphere_backend.dto.UserDto;
import pl.marcin.baranowski.devsphere_backend.model.Project;
import pl.marcin.baranowski.devsphere_backend.service.ProjectService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/projects")
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/projects/{id}")
    public Project getSingleProject(@PathVariable Long id) {
        return projectService.getSingleProject(id);
    }

    @GetMapping("/projects/user/{id}")
    public List<Project> getProjectsByUserId(@PathVariable Long id) {
        return projectService.getProjectsByUserId(id);
    }

    @GetMapping("projects/{id}/owner")
    public UserDto getOwnerOfProject(@PathVariable Long id) {
        return projectService.getOwnerOfProject(id);
    }

    @PostMapping("/projects")
    public Project saveProject(@RequestPart Project project, @RequestPart MultipartFile imageFile) throws IOException {
        return projectService.saveProject(project, imageFile);
    }

    @PutMapping("/projects/{id}")
    public Project updateProjects(
            @PathVariable Long id,
            @RequestPart Project project,
            @RequestPart MultipartFile imageFile) throws IOException{
        return projectService.updateProject(id, project, imageFile);
    }

    @DeleteMapping("/projects/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }
}
