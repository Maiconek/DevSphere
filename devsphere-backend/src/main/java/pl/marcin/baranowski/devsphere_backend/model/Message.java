package pl.marcin.baranowski.devsphere_backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Message {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private String content;
    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;
    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

}
