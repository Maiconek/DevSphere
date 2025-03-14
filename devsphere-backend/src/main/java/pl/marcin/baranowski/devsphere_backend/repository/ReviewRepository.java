package pl.marcin.baranowski.devsphere_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.marcin.baranowski.devsphere_backend.model.Project;
import pl.marcin.baranowski.devsphere_backend.model.Review;
import pl.marcin.baranowski.devsphere_backend.model.User;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsByUserAndProject(User user, Project project);
    List<Review> findByProjectId(Long id);
}
