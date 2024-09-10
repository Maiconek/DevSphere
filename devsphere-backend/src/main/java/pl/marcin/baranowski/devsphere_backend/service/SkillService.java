package pl.marcin.baranowski.devsphere_backend.service;

import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.exceptions.ResourceNotFoundException;
import pl.marcin.baranowski.devsphere_backend.model.Skill;
import pl.marcin.baranowski.devsphere_backend.repository.SkillRepository;

import java.util.List;

@Service
public class SkillService {
    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Skill getSingleSkill(Long id) {
        return skillRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Skill does not exist with id: " + id));
    }

    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
}
