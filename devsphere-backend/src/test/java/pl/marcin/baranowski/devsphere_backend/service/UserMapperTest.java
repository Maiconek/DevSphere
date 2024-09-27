package pl.marcin.baranowski.devsphere_backend.service;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pl.marcin.baranowski.devsphere_backend.model.User;

import static org.junit.jupiter.api.Assertions.*;


class UserMapperTest {
    private UserMapper userMapper;

    @BeforeEach
    void setUp() {
        userMapper = new UserMapper();
    }

    @Test
    public void should_map_student_to_student_dto_test() {
        // given
        User user = User.builder()
                .id(1L)
                .firstName("Marcin")
                .lastName("Baranowski")
                .email("marcin@wp.pl")
                .password("xaxaxaxa")
                .bio("Lorem ipsum")
                .company("UG")
                .build();
        // when
        var userDto = userMapper.toUserDto(user);
        // then
        assertEquals(user.getId(), userDto.id());
        assertEquals(user.getFirstName(), userDto.firstName());
        assertEquals(user.getLastName(), userDto.lastName());
        assertEquals(user.getEmail(), userDto.email());
        assertEquals(user.getBio(), userDto.bio());
        assertEquals(user.getCompany(), userDto.company());
    }
}
