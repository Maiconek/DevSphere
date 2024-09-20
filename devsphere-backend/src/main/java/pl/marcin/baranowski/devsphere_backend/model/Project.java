package pl.marcin.baranowski.devsphere_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Project {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private String shortIntro;
    private String link;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "projects_tags",
            joinColumns = {
                    @JoinColumn(name = "project_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "tag_id")
            }
    )
    @JsonIgnoreProperties("projects")
    private List<ProjectTag> tags;

}
