package pl.marcin.baranowski.devsphere_backend.service;

import ch.qos.logback.classic.encoder.JsonEncoder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pl.marcin.baranowski.devsphere_backend.model.Project;
import pl.marcin.baranowski.devsphere_backend.model.Review;
import pl.marcin.baranowski.devsphere_backend.model.Role;
import pl.marcin.baranowski.devsphere_backend.model.User;

public class ReviewMapperTest {
    private ReviewMapper reviewMapper;
    private UserMapper userMapper;
    private User user;
    private Project project;

    @BeforeEach
    void setUp() {
        userMapper = new UserMapper();
        reviewMapper = new ReviewMapper(userMapper);
        user = User.builder()
                .id(1L)
                .email("test")
                .password("test")
                .role(Role.USER)
                .build();
        project = Project.builder()
                .id(1L)
                .title("test")
                .build();

    }

    @Test
    public void should_map_review_to_review_dto_test() {
        // given
        Review review = Review.builder()
                .user(user)
                .project(project)
                .content("test")
                .score(2)
                .build();
        // when
        var reviewDto = reviewMapper.toReviewDto(review);

        // then
        Assertions.assertEquals(review.getContent(), reviewDto.content());
        Assertions.assertEquals(review.getScore(), reviewDto.score());
        Assertions.assertEquals(review.getUser().getFirstName(), reviewDto.userDto().firstName());
        Assertions.assertEquals(review.getProject(), reviewDto.project());
    }
}
