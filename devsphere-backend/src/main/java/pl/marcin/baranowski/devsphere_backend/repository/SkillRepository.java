package pl.marcin.baranowski.devsphere_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.marcin.baranowski.devsphere_backend.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
}
