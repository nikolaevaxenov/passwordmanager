package com.passwordmanager.passwordmanagerserver.service;

import com.passwordmanager.passwordmanagerserver.model.SavedPassword;
import com.passwordmanager.passwordmanagerserver.model.User;
import com.passwordmanager.passwordmanagerserver.repository.SavedPasswordRepository;
import com.passwordmanager.passwordmanagerserver.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SavedPasswordServiceTest {
    @Mock private SavedPasswordRepository savedPasswordRepository;
    @Mock private UserRepository userRepository;
    @Mock private Principal principal;

    @InjectMocks private SavedPasswordService savedPasswordService;

    @Test
    void getAllSavedPasswords() {
        var requestUsername = "user2@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var user2 = new User("user2@mail.com", "qwerty", "ROLE_USER");

        var pass1 = new SavedPassword("First password", "http://localhost/first", "admin", "qwerty");
        pass1.setId(1L);
        pass1.setUser(user1);
        pass1.setSharedWithUsers(Set.of("user2@mail.com"));

        var pass2 = new SavedPassword("Second password", "http://localhost/second", "user1", "qwerty");
        pass2.setId(2L);
        pass2.setUser(user2);
        pass2.setSharedWithUsers(Set.of());

        user1.setSavedPasswords(Set.of(pass1));
        user2.setSavedPasswords(Set.of(pass2));

        when(principal.getName()).thenReturn(requestUsername);
        when(savedPasswordRepository.findAll()).thenReturn(List.of(pass1, pass2));
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user2));

        var result = savedPasswordService.getAllSavedPasswords(principal);

        assertThat(result).isEqualTo(Set.of(pass1, pass2));
    }

    @Test
    void getSavedPasswordById() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var pass1 = new SavedPassword("First password", "http://localhost/first", "admin", "qwerty");
        pass1.setId(1L);
        pass1.setUser(user1);

        user1.setSavedPasswords(Set.of(pass1));

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));

        var result = savedPasswordService.getSavedPasswordById(1L, principal);

        assertThat(result).isEqualTo(pass1);
    }

    @Test
    void createSavedPassword() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var pass1 = new SavedPassword("First password", "http://localhost/first", "admin", "qwerty");
        pass1.setId(1L);
        pass1.setUser(user1);

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));
        when(savedPasswordRepository.save(pass1)).thenReturn(pass1);

        var result = savedPasswordService.createSavedPassword(pass1, principal);

        assertThat(result).isEqualTo(pass1);
    }

    @Test
    void editSavedPassword() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var pass1 = new SavedPassword("First password", "http://localhost/first", "admin", "qwerty");
        pass1.setId(1L);
        pass1.setUser(user1);

        user1.setSavedPasswords(Set.of(pass1));

        var pass1edited = new SavedPassword("Edited password", "http://localhost/first", "admin", "qwerty");
        pass1edited.setId(1L);
        pass1edited.setUser(user1);

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));
        when(savedPasswordRepository.save(pass1edited)).thenReturn(pass1edited);

        var result = savedPasswordService.editSavedPassword(pass1edited, principal);

        assertThat(result).isEqualTo(pass1edited);
    }

    @Test
    void deleteSavedPassword() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var pass1 = new SavedPassword("First password", "http://localhost/first", "admin", "qwerty");
        pass1.setId(1L);
        pass1.setUser(user1);
        pass1.setSharedWithUsers(Set.of());

        var pass2 = new SavedPassword("Second password", "http://localhost/second", "admin", "qwerty");
        pass2.setId(2L);
        pass2.setUser(user1);
        pass2.setSharedWithUsers(Set.of());

        user1.setSavedPasswords(Set.of(pass1, pass2));

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));

        doNothing().when(savedPasswordRepository).delete(pass2);

        savedPasswordService.deleteSavedPassword(pass2.getId(), principal);
        verify(savedPasswordRepository, times(1)).delete(pass2);
        verifyNoMoreInteractions(savedPasswordRepository);
    }
}