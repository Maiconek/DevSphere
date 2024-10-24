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

//	@Bean
//	public CommandLineRunner commandLineRunner(ProjectRepository projectRepository,
//											   ProjectTagRepository projectTagRepository) {
//		return args -> {
//
//			var tag = ProjectTag.builder()
//					.name("Python")
//					.build();
//			projectTagRepository.save(tag);
//
//			var tag2 = ProjectTag.builder()
//					.name("Django")
//					.build();
//			projectTagRepository.save(tag2);
//
//			var tag3 = ProjectTag.builder()
//					.name("Next.js")
//					.build();
//			projectTagRepository.save(tag3);
//
//			var tag4 = ProjectTag.builder()
//					.name("TypeScript")
//					.build();
//			projectTagRepository.save(tag4);
//			var tag5 = ProjectTag.builder()
//					.name("C#")
//					.build();
//			projectTagRepository.save(tag5);
//			var tag6 = ProjectTag.builder()
//					.name(".NET")
//					.build();
//			projectTagRepository.save(tag6);
//			var tag7 = ProjectTag.builder()
//					.name("Angular")
//					.build();
//			projectTagRepository.save(tag7);
//			var tag8 = ProjectTag.builder()
//					.name("C++")
//					.build();
//			projectTagRepository.save(tag8);
//			var tag9 = ProjectTag.builder()
//					.name("C")
//					.build();
//			projectTagRepository.save(tag9);
//			var tag10 = ProjectTag.builder()
//					.name("Vue")
//					.build();
//			projectTagRepository.save(tag10);
//			var tag11 = ProjectTag.builder()
//					.name("HTML5")
//					.build();
//			projectTagRepository.save(tag11);
//			var tag12 = ProjectTag.builder()
//					.name("CSS3")
//					.build();
//			projectTagRepository.save(tag12);
//			var tag13 = ProjectTag.builder()
//					.name("Bootstrap")
//					.build();
//			projectTagRepository.save(tag13);
//			var tag14 = ProjectTag.builder()
//					.name("Tailwind")
//					.build();
//			projectTagRepository.save(tag14);
//			var tag15 = ProjectTag.builder()
//					.name("Unit tests")
//					.build();
//			projectTagRepository.save(tag15);
//			var tag16 = ProjectTag.builder()
//					.name("Flask")
//					.build();
//			projectTagRepository.save(tag16);
//			var tag17 = ProjectTag.builder()
//					.name("Kotlin")
//					.build();
//			projectTagRepository.save(tag17);
//			var tag18 = ProjectTag.builder()
//					.name("Scala")
//					.build();
//			projectTagRepository.save(tag18);
//			var tag19 = ProjectTag.builder()
//					.name("Node.js")
//					.build();
//			projectTagRepository.save(tag19);
//			var tag20 = ProjectTag.builder()
//					.name("Express")
//					.build();
//			projectTagRepository.save(tag20);
//			var tag21 = ProjectTag.builder()
//					.name("PostgreSQL")
//					.build();
//			projectTagRepository.save(tag21);
//			var tag22 = ProjectTag.builder()
//					.name("MongoDB")
//					.build();
//			projectTagRepository.save(tag22);
//			var tag23 = ProjectTag.builder()
//					.name("Sqlite")
//					.build();
//			projectTagRepository.save(tag23);
//			var tag24 = ProjectTag.builder()
//					.name("MySQL")
//					.build();
//			projectTagRepository.save(tag24);
//			var tag25 = ProjectTag.builder()
//					.name("Neo4j")
//					.build();
//			projectTagRepository.save(tag25);
//		};
//	}
}
