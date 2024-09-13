package pl.marcin.baranowski.devsphere_backend.controller;

import org.springframework.web.bind.annotation.*;
import pl.marcin.baranowski.devsphere_backend.model.ProjectTag;
import pl.marcin.baranowski.devsphere_backend.service.ProjectTagService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ProjectTagController {
    private final ProjectTagService projectTagService;

    public ProjectTagController(ProjectTagService projectTagService) {
        this.projectTagService = projectTagService;
    }

    @GetMapping("/tags")
    public List<ProjectTag> getAllTags() {
        return projectTagService.getAllTags();
    }

    @GetMapping("/tags/{id}")
    public ProjectTag getSingleProjectTag(@PathVariable Long id) {
        return projectTagService.getSingleProjectTag(id);
    }

    @PostMapping("/tags")
    public ProjectTag saveProjectTag(@RequestBody ProjectTag pt) {
        return projectTagService.saveProjectTag(pt);
    }

    @DeleteMapping("/tags/{id}")
    public void deleteProjectTag(@PathVariable Long id) {
        projectTagService.deleteProjectTag(id);
    }
}
