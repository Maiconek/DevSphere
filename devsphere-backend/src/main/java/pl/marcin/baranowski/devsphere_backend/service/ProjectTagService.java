package pl.marcin.baranowski.devsphere_backend.service;

import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.exceptions.ResourceNotFoundException;
import pl.marcin.baranowski.devsphere_backend.model.ProjectTag;
import pl.marcin.baranowski.devsphere_backend.repository.ProjectTagRepository;

import java.util.List;

@Service
public class ProjectTagService {
    private final ProjectTagRepository projectTagRepository;

    public ProjectTagService(ProjectTagRepository projectTagRepository) {
        this.projectTagRepository = projectTagRepository;
    }

    public List<ProjectTag> getAllTags() {
        return projectTagRepository.findAll();
    }

    public ProjectTag getSingleProjectTag(Long id) {
        return projectTagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag does not exist with id: " + id));
    }

    public ProjectTag saveProjectTag(ProjectTag pt) {
        return projectTagRepository.save(pt);
    }

    public void deleteProjectTag(Long id) {
        projectTagRepository.deleteById(id);
    }


}
