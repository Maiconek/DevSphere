package pl.marcin.baranowski.devsphere_backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import pl.marcin.baranowski.devsphere_backend.model.Project;
import pl.marcin.baranowski.devsphere_backend.model.ProjectTag;
import pl.marcin.baranowski.devsphere_backend.repository.ProjectRepository;
import pl.marcin.baranowski.devsphere_backend.repository.ProjectTagRepository;

@SpringBootApplication
public class DevsphereBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(DevsphereBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(ProjectRepository projectRepository,
											   ProjectTagRepository projectTagRepository) {
		return args -> {
			var project = Project.builder()
					.title("DevSphere")
					.description("To bedzie swietny projekt, damy rade Marcin")
					.shortIntro("Glowa do gory!!!")
					.link("https://github.com/Maiconek/DevSphere")
					.build();
			projectRepository.save(project);

			var tag = ProjectTag.builder()
					.name("Java")
					.build();
			projectTagRepository.save(tag);

			var tag2 = ProjectTag.builder()
					.name("Spring")
					.build();
			projectTagRepository.save(tag2);

			var tag3 = ProjectTag.builder()
					.name("React")
					.build();
			projectTagRepository.save(tag3);

			var tag4 = ProjectTag.builder()
					.name("JavaScript")
					.build();
			projectTagRepository.save(tag4);
		};
	}
}
