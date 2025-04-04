package pl.marcin.baranowski.devsphere_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.dto.ReviewDto;
import pl.marcin.baranowski.devsphere_backend.dto.ReviewRequestDto;
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
    private final ReviewMapper reviewMapper;
    public List<ReviewDto> getAllReviews() {
        return reviewRepository.findAll()
                .stream()
                .map(reviewMapper::toReviewDto)
                .toList();
    }

    public ReviewDto getSingleReview(Long projectId, Long userId) {
        ReviewId reviewId = new ReviewId(userId, projectId);
        return reviewMapper.toReviewDto(
                reviewRepository.findById(reviewId).orElseThrow(() -> new RuntimeException("User does not exist")));
    }

    public List<ReviewDto> getReviewsByProjectId(Long id) {
        return reviewRepository.findByProjectId(id)
                .stream()
                .map(reviewMapper::toReviewDto)
                .toList();
    }

    public Review saveReview(ReviewRequestDto reviewRequestDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        // Pobranie zalogowanego użytkownika
        User owner = userRepository.findByEmail(currentUsername)
                .orElseThrow(() -> new RuntimeException("User does not exist"));


        // Pobranie projektu, do którego dodajemy recenzję
        Project project = projectRepository.findById(reviewRequestDto.projectId())
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
                .content(reviewRequestDto.content())
                .score(reviewRequestDto.score())
                .build();

        return reviewRepository.save(review);
    }


    public void deleteReview(Long userId, Long projectId) {
        ReviewId reviewId = new ReviewId(userId, projectId);
        reviewRepository.deleteById(reviewId);
    }

    public Double calculateAvgReviewScore(Long projectId) {
        List<Review> reviews = reviewRepository.findByProjectId(projectId);
        double sum = 0;
        for(Review r : reviews) {
            sum += r.getScore();
        }

        double averageScore = sum / reviews.size();
        System.out.println(averageScore);

        return Math.round(averageScore * 100) / 100.0;
    }
}
