package pl.marcin.baranowski.devsphere_backend.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.io.FileInputStream;
import java.io.IOException;

public class ImageUploaderServiceTest {

    private ImageUploaderService imageUploaderService;

    @BeforeEach
    void setUp() {
        imageUploaderService = new ImageUploaderService();
    }

    @Test
    public void shouldReturnCorrectUrl() throws IOException {
        FileInputStream inputFile = new FileInputStream("C:\\Users\\mbara\\OneDrive\\Pulpit\\devsphere\\DevSphere\\devsphere-backend\\sample.jpg");
        MockMultipartFile file = new MockMultipartFile("file", "test", "multipart/form-data", inputFile);

        String url = imageUploaderService.uploadImage(file);

        Assertions.assertNotNull(url);
    }
}
