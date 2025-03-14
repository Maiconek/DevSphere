package pl.marcin.baranowski.devsphere_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.marcin.baranowski.devsphere_backend.dto.ReviewDto;
import pl.marcin.baranowski.devsphere_backend.dto.ReviewRequestDto;
import pl.marcin.baranowski.devsphere_backend.model.Review;
import pl.marcin.baranowski.devsphere_backend.service.ReviewService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/reviews")
    public List<ReviewDto> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/reviews/{id}")
    public ReviewDto getSingleReview(@PathVariable Long id) {
        return reviewService.getSingleReview(id);
    }

    @GetMapping("/reviews/projects/{id}")
    public List<ReviewDto> getReviewsByProjectId(@PathVariable Long id) {
        return reviewService.getReviewsByProjectId(id);
    }

    @PostMapping("/reviews")
    public Review saveReview(@RequestBody ReviewRequestDto reviewRequestDto) {
        return reviewService.saveReview(reviewRequestDto);
    }

    @DeleteMapping("/reviews/{id}")
    public void deleteReview(@PathVariable Long id) {
         reviewService.deleteReview(id);
    }
}
