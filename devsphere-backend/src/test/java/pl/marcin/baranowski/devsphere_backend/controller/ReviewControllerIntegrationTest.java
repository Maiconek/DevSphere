package pl.marcin.baranowski.devsphere_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import pl.marcin.baranowski.devsphere_backend.dto.ReviewDto;
import pl.marcin.baranowski.devsphere_backend.model.*;
import pl.marcin.baranowski.devsphere_backend.repository.ProjectRepository;
import pl.marcin.baranowski.devsphere_backend.repository.ReviewRepository;
import pl.marcin.baranowski.devsphere_backend.repository.UserRepository;


import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser
@Transactional
@ActiveProfiles("test")
public class ReviewControllerIntegrationTest {
    @Autowired
    private ReviewController reviewController;
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    private User user;
    private Project project;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .id(1L)
                .firstName("Test")
                .lastName("Testowy")
                .email("test@wp.pl")
                .password("test")
                .role(Role.USER)
                .build();
        userRepository.save(user);
        User user2 = User.builder()
                .id(2L)
                .firstName("Test2")
                .lastName("Testowy2")
                .email("tes2t@wp.pl")
                .password("t2est")
                .role(Role.USER)
                .build();
        userRepository.save(user2);
        project = Project.builder()
                .id(1L)
                .title("Test title")
                .description("Test desc")
                .shortIntro("Test short intro")
                .link("Test link")
                .build();
        projectRepository.save(project);
        Review review = Review.builder()
                .id(new ReviewId(user.getId(), project.getId()))
                .user(user)
                .project(project)
                .content("test")
                .score(1)
                .build();
        reviewRepository.save(review);
        Review review2 = Review.builder()
                .id(new ReviewId(user2.getId(), project.getId()))
                .user(user2)
                .project(project)
                .content("test2")
                .score(2)
                .build();
        reviewRepository.save(review2);
    }

    @Test
    public void should_return_status_200_for_successful_get_single_review() throws Exception {
        // given
        Review review = Review.builder()
                .id(new ReviewId(user.getId(), project.getId()))
                .user(user)
                .project(project)
                .content("test")
                .score(1)
                .build();
        reviewRepository.save(review);
        // when
        MvcResult mvcResult = mockMvc.perform(get("/api/v1/reviews/" + user.getId() + "/" + project.getId()))
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.content").value("test"))
                .andReturn();
        // then
        ReviewDto fetchedReview = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), ReviewDto.class);
        assertNotNull(fetchedReview);
        assertEquals(review.getContent(), fetchedReview.content());
        assertEquals(review.getScore(), fetchedReview.score());
    }

    @Test
    public void should_return_status_200_for_successful_get_list_of_reviews() throws Exception {
        mockMvc.perform(get("/api/v1/reviews"))
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    public void should_return_status_200_for_successful_delete_review() throws Exception {
        List<Review> reviews = reviewRepository.findAll();
        mockMvc.perform(delete("/api/v1/reviews/" + user.getId() + "/" + project.getId()))
                .andDo(print())
                .andExpect(status().is(200))
                .andReturn();

        List<Review> reviewsAfterDeletion = reviewRepository.findAll();

        assertEquals(reviews.size(), 2);
        assertEquals(reviewsAfterDeletion.size(), 1);
    }
}
