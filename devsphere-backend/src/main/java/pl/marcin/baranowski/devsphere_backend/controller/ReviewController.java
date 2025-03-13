package pl.marcin.baranowski.devsphere_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.marcin.baranowski.devsphere_backend.dto.ReviewDto;
import pl.marcin.baranowski.devsphere_backend.model.Project;
import pl.marcin.baranowski.devsphere_backend.model.Review;
import pl.marcin.baranowski.devsphere_backend.service.ReviewService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/reviews")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @PostMapping("/reviews")
    public Review saveReview(@RequestBody ReviewDto reviewDto) {
        return reviewService.saveReview(reviewDto);
    }

    @DeleteMapping("/reviews/{id}")
    public void deleteReview(@PathVariable Long id) {
         reviewService.deleteReview(id);
    }
}
