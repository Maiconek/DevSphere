package pl.marcin.baranowski.devsphere_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.dto.ReviewDto;
import pl.marcin.baranowski.devsphere_backend.model.Project;
import pl.marcin.baranowski.devsphere_backend.model.Review;
import pl.marcin.baranowski.devsphere_backend.model.ReviewId;
import pl.marcin.baranowski.devsphere_backend.model.User;
import pl.marcin.baranowski.devsphere_backend.repository.ProjectRepository;
import pl.marcin.baranowski.devsphere_backend.repository.ReviewRepository;
import pl.marcin.baranowski.devsphere_backend.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review getSingleReview(Long id) {
        return reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("User does not exist"));
    }

    public Review saveReview(ReviewDto reviewDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        // Pobranie zalogowanego użytkownika
        User owner = userRepository.findByEmail(currentUsername)
                .orElseThrow(() -> new RuntimeException("User does not exist"));

        // Pobranie projektu, do którego dodajemy recenzję
        Project project = projectRepository.findById(reviewDto.projectId())
                .orElseThrow(() -> new RuntimeException("Project does not exist"));

        // Sprawdzenie, czy użytkownik już ocenił ten projekt
        if (reviewRepository.existsByUserAndProject(owner, project)) {
            throw new IllegalStateException("User has already reviewed this project.");
        }

        ReviewId reviewId = new ReviewId(owner.getId(), project.getId());

        Review review = Review.builder()
                .id(reviewId)  // Ustawiamy ID recenzji
                .user(owner)
                .project(project)
                .content(reviewDto.content())
                .score(reviewDto.score())
                .build();

        return reviewRepository.save(review);
    }


    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}
