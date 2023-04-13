package com.passwordmanager.passwordmanagerserver;

import com.passwordmanager.passwordmanagerserver.config.RsaKeyProperties;
import com.passwordmanager.passwordmanagerserver.model.*;
import com.passwordmanager.passwordmanagerserver.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
import java.util.Set;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class PasswordmanagerServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(PasswordmanagerServerApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository,
                                        PasswordEncoder passwordEncoder,
                                        SavedPasswordRepository savedPasswordRepository,
                                        NoteRepository noteRepository,
                                        AddressRepository addressRepository,
                                        PaymentCardRepository paymentCardRepository) {
        return args -> {
            var user1 = new User("first@mail.com", passwordEncoder.encode("123456"), "ROLE_USER");
            var user2 = new User("second@mail.com", passwordEncoder.encode("123456"), "ROLE_USER");
            var user3 = new User("third@mail.com", passwordEncoder.encode("123456"), "ROLE_USER");
            var adminUser = new User("root@mail.com", passwordEncoder.encode("123456"), "ROLE_USER,ROLE_ADMIN");

            user1.setActivated(true);
            user2.setActivated(true);
//            user3.setActivated(true);
//            adminUser.setActivated(true);

            userRepository.save(user1);
            userRepository.save(user2);
            userRepository.save(user3);
            userRepository.save(adminUser);

            var pass1 = new SavedPassword("First password", "http://localhost:8080", "user1@mail.com", "pass1");
            var pass2 = new SavedPassword("Second password", "http://localhost:8080", "user2@mail.com", "pass2");
            var pass3 = new SavedPassword("Third password", "http://localhost:8080", "user3@mail.com", "pass3");
            var pass4 = new SavedPassword("Fourth password", "http://localhost:8080", "user4@mail.com", "pass4");

            String loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

            pass1.setNote(loremIpsum);
            pass2.setNote(loremIpsum);
            pass3.setNote(loremIpsum);
            pass4.setNote(loremIpsum);

            pass1.setUser(user1);
            pass2.setUser(user1);
            pass3.setUser(user2);
            pass4.setUser(user3);

            pass1.setSharedWithUsers(Set.of(user2.getEmail(), user3.getEmail()));

            savedPasswordRepository.save(pass1);
            savedPasswordRepository.save(pass2);
            savedPasswordRepository.save(pass3);
            savedPasswordRepository.save(pass4);

            var note1 = new Note("First note", "lorem ipsum");
            var note2 = new Note("Second note", "lorem ipsum");
            var note3 = new Note("Third note", "lorem ipsum");

            note1.setUser(user1);
            note2.setUser(user2);
            note3.setUser(user3);

            note1.setSharedWithUsers(Set.of(user2.getEmail()));

            noteRepository.save(note1);
            noteRepository.save(note2);
            noteRepository.save(note3);

            var address1 = new Address("First address", "Ivan", "Lorem rd.", "Ipsum", "Dolor county", "SIT", "123456", "Amet");
            var address2 = new Address("Second address", "Tom", "Lorem rd.", "Ipsum", "Dolor county", "SIT", "123456", "Amet");
            var address3 = new Address("Third address", "Jerry", "Lorem rd.", "Ipsum", "Dolor county", "SIT", "123456", "Amet");

            address1.setUser(user1);
            address2.setUser(user3);
            address3.setUser(user3);

            address1.setSharedWithUsers(Set.of(user2.getEmail(), user3.getEmail()));
            address2.setSharedWithUsers(Set.of(user2.getEmail()));

            addressRepository.save(address1);
            addressRepository.save(address2);
            addressRepository.save(address3);

            var paymentCard1 = new PaymentCard("First card", "1234 5678 8901 2345", "123", new Date());
            var paymentCard2 = new PaymentCard("Second card", "1234 5678 8901 2345", "123", new Date());
            var paymentCard3 = new PaymentCard("Third card", "1234 5678 8901 2345", "123", new Date());

            paymentCard1.setUser(user1);
            paymentCard2.setUser(user2);
            paymentCard3.setUser(user3);

            paymentCard1.setSharedWithUsers(Set.of(user2.getEmail()));

            paymentCardRepository.save(paymentCard1);
            paymentCardRepository.save(paymentCard2);
            paymentCardRepository.save(paymentCard3);
        };
    }

}
