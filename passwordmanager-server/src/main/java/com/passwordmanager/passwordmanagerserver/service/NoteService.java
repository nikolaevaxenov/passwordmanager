package com.passwordmanager.passwordmanagerserver.service;

import com.passwordmanager.passwordmanagerserver.model.Note;
import com.passwordmanager.passwordmanagerserver.repository.NoteRepository;
import com.passwordmanager.passwordmanagerserver.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class NoteService {
    private final UserRepository userRepository;

    private final NoteRepository noteRepository;

    public NoteService(UserRepository userRepository, NoteRepository noteRepository) {
        this.userRepository = userRepository;
        this.noteRepository = noteRepository;
    }

    public Set<Note> getAllNotes(Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var sharedNotes = noteRepository
                .findAll()
                .stream()
                .filter(p -> p.getSharedWithUsers()
                        .stream()
                        .anyMatch(id -> id.equals(user.getId())))
                .collect(Collectors.toSet());

        sharedNotes.addAll(user.getNotes());

        return sharedNotes;
    }

    public Note getNoteById(Long id, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return user.getNotes()
                .stream()
                .filter(n -> n.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Note createNote(Note note, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        note.setUser(user);

        return noteRepository.save(note);
    }

    public Note editNote(Note newNote, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var note = user.getNotes()
                .stream()
                .filter(n -> n.getId().equals(newNote.getId()))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (newNote.getTitle() != null)
            note.setTitle(newNote.getTitle());

        if (newNote.getText() != null)
            note.setText(newNote.getText());

        return noteRepository.save(note);
    }

    public void deleteNote(Long id, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        noteRepository.delete(user.getNotes()
                .stream()
                .filter(n -> n.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }

    public void addSharingNote(Long id, String email, Principal principal) {
        var owner = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        var otherUser = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var note = owner.getNotes()
                .stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        note.addSharedWithUsers(otherUser.getId());
        noteRepository.save(note);
    }

    public void removeSharingNote(Long id, Long userId, Principal principal) {
        var owner = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var note = owner.getNotes()
                .stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        note.removeSharedWithUsers(userId);
        noteRepository.save(note);
    }
}
