package pl.marcin.baranowski.devsphere_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @Id
    @GeneratedValue
    private Long id;
    private String content;

    @Min(value = 0)
    @Max(value = 5)
    private Integer score;
    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonBackReference
    private Project project;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User reviewer;
}
