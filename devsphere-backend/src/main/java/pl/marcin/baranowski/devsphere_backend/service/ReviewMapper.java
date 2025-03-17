package pl.marcin.baranowski.devsphere_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.dto.ReviewDto;
import pl.marcin.baranowski.devsphere_backend.model.Review;

@Service
@RequiredArgsConstructor
public class ReviewMapper {
    private final UserMapper userMapper;
    public ReviewDto toReviewDto(Review review) {
        return new ReviewDto(
                review.getContent(),
                review.getScore(),
                userMapper.toUserDto(review.getUser()),
                review.getProject()
        );
    }
}
