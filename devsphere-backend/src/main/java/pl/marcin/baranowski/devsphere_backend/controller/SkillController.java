package pl.marcin.baranowski.devsphere_backend.controller;

import org.springframework.web.bind.annotation.*;
import pl.marcin.baranowski.devsphere_backend.model.Skill;
import pl.marcin.baranowski.devsphere_backend.service.SkillService;

import java.util.List;

@RestController
public class SkillController {
    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping("/skills")
    public List<Skill> getAllSkills() {
        return skillService.getAllSkills();
    }

    @GetMapping("/skills/{id}")
    public Skill getSingleSkill(@PathVariable Long id) {
        return skillService.getSingleSkill(id);
    }

    @PostMapping("/skills")
    public Skill saveSkill(@RequestBody Skill skill) {
        return skillService.saveSkill(skill);
    }

    @DeleteMapping("/skills/{id}")
    public void deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
    }
}
