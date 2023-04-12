package com.passwordmanager.passwordmanagerserver.service;

import com.passwordmanager.passwordmanagerserver.model.Note;
import com.passwordmanager.passwordmanagerserver.model.User;
import com.passwordmanager.passwordmanagerserver.repository.NoteRepository;
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
class NoteServiceTest {
    @Mock private NoteRepository noteRepository;
    @Mock private UserRepository userRepository;
    @Mock private Principal principal;

    @InjectMocks private NoteService noteService;

    @Test
    void getAllNotes() {
        var requestUsername = "user2@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var user2 = new User("user2@mail.com", "qwerty", "ROLE_USER");

        var note1 = new Note("First note", "lorem ipsum");
        note1.setId(1L);
        note1.setUser(user1);
        note1.setSharedWithUsers(Set.of("user2@mail.com"));

        var note2 = new Note("Second note", "lorem ipsum");
        note2.setId(2L);
        note2.setUser(user2);
        note2.setSharedWithUsers(Set.of());

        user1.setNotes(Set.of(note1));
        user2.setNotes(Set.of(note2));

        when(principal.getName()).thenReturn(requestUsername);
        when(noteRepository.findAll()).thenReturn(List.of(note1, note2));
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user2));

        var result = noteService.getAllNotes(principal);

        assertThat(result).isEqualTo(Set.of(note1, note2));
    }

    @Test
    void getNoteById() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var note1 = new Note("First note", "lorem ipsum");
        note1.setId(1L);
        note1.setUser(user1);

        user1.setNotes(Set.of(note1));

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));

        var result = noteService.getNoteById(1L, principal);

        assertThat(result).isEqualTo(note1);
    }

    @Test
    void createNote() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var note1 = new Note("First note", "lorem ipsum");
        note1.setId(1L);
        note1.setUser(user1);

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));
        when(noteRepository.save(note1)).thenReturn(note1);

        var result = noteService.createNote(note1, principal);

        assertThat(result).isEqualTo(note1);
    }

    @Test
    void editNote() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var note1 = new Note("First note", "lorem ipsum");
        note1.setId(1L);
        note1.setUser(user1);

        user1.setNotes(Set.of(note1));

        var note1edited = new Note("Edited note", "lorem ipsum");
        note1edited.setId(1L);
        note1edited.setUser(user1);

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));
        when(noteRepository.save(note1edited)).thenReturn(note1edited);

        var result = noteService.editNote(note1edited, principal);

        assertThat(result).isEqualTo(note1edited);
    }

    @Test
    void deleteNote() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var note1 = new Note("First note", "lorem ipsum");
        note1.setId(1L);
        note1.setUser(user1);
        note1.setSharedWithUsers(Set.of());

        var note2 = new Note("Second note", "lorem ipsum");
        note2.setId(2L);
        note2.setUser(user1);
        note2.setSharedWithUsers(Set.of());

        user1.setNotes(Set.of(note1, note2));

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));

        doNothing().when(noteRepository).delete(note2);

        noteService.deleteNote(note2.getId(), principal);
        verify(noteRepository, times(1)).delete(note2);
        verifyNoMoreInteractions(noteRepository);
    }
}