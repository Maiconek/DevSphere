package pl.marcin.baranowski.devsphere_backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageUploaderService {
    Cloudinary cloudinary;

    public ImageUploaderService() {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "djprygrg5",
                "api_key", "897623696458317",
                "api_secret", "A663Z1aWEUyROkSraA5A1T3TBBs"
        ));
    }

    public String uploadImage(MultipartFile image) throws IOException {
        Map uploadParams = ObjectUtils.asMap("resource_type", "image");
        image.getInputStream();
        Map uploadResult = cloudinary.uploader().upload(image.getBytes(), uploadParams);
        return (String) uploadResult.get("url");
    }
}
