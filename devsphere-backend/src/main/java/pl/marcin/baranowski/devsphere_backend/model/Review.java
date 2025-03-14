package pl.marcin.baranowski.devsphere_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Review {
    @EmbeddedId
    private ReviewId id;

    private String content;

    @Min(value = 0)
    @Max(value = 5)
    private Integer score;

    @ManyToOne
    @MapsId("projectId")
    @JoinColumn(name = "project_id")
    @JsonManagedReference("project-reviews")
    private Project project;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    @JsonManagedReference("user-reviews")
    private User user;

    public Review(User user, Project project, String content, Integer score) {
        this.id = new ReviewId(user.getId(), project.getId());
        this.user = user;
        this.project = project;
        this.content = content;
        this.score = score;
    }
}

