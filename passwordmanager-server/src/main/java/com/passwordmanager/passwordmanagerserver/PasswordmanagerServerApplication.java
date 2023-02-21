package com.passwordmanager.passwordmanagerserver;

import com.passwordmanager.passwordmanagerserver.config.RsaKeyProperties;
import com.passwordmanager.passwordmanagerserver.model.User;
import com.passwordmanager.passwordmanagerserver.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class PasswordmanagerServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(PasswordmanagerServerApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            userRepository.save(new User("user@mail.com", passwordEncoder.encode("123456"), "ROLE_USER"));
            userRepository.save(new User("root@mail.com", passwordEncoder.encode("123456"), "ROLE_USER,ROLE_ADMIN"));
        };
    }

}
