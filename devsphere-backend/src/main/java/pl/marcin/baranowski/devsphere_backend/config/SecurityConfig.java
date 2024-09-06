package pl.marcin.baranowski.devsphere_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final UserDetailsService userDetailsService;

    public SecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable) // wylacznie csrf
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/register", "api/auth/login").permitAll() // endpointy nie podlegajace autentykacji
                        .anyRequest().authenticated() // cała reszta podlega
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // Ustawia aplikację na "stateless" (bezstanową), czyli brak przechowywania sesji (np. dla JWT)
                .httpBasic(withDefaults()); // Ustawia HTTP Basic Authentication jako metodę uwierzytelnienia
        return http.build(); // Buduje obiekt SecurityFilterChain na podstawie danej konfiguracji
    }

    @Bean // Komponent odpowiedzialny za zarządzanie procesem uwierzytelniania użytkownika
    // na podstawie dostarczonych danych (np. login, hasło).
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();  // Nowy sposób uzyskania AuthenticationManager
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
