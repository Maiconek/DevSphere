package pl.marcin.baranowski.devsphere_backend.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.model.User;
import pl.marcin.baranowski.devsphere_backend.repository.UserRepository;


// Klasa CustomUserDetailsService implementuje interfejs UserDetailsService,
// który jest wymagany przez Spring Security do pobierania informacji o użytkownikach.
// Implementacja tej klasy pozwala na integrację z bazą danych i określa, jak Spring ma weryfikować użytkowników.
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override // podczas logowania ta metoda jest odpalana przez Spring Security w celu pozyskania informacji na temat usera
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Czy to jest wgl uzywane?????????");
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles("USER")
                .build();
    }
}
