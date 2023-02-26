package com.passwordmanager.passwordmanagerserver.controller;

import com.fasterxml.jackson.databind.node.TextNode;
import com.passwordmanager.passwordmanagerserver.model.Note;
import com.passwordmanager.passwordmanagerserver.service.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/note")
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Set<Note> getAllNotes(Principal principal) {
        return noteService.getAllNotes(principal);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Note getNoteById(@PathVariable Long id, Principal principal) {
        return noteService.getNoteById(id, principal);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Note createNote(@RequestBody Note note, Principal principal) {
        return noteService.createNote(note, principal);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public Note editNote(@RequestBody Note newNote, Principal principal) {
        return noteService.editNote(newNote, principal);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteNote(@PathVariable Long id, Principal principal) {
        noteService.deleteNote(id, principal);
    }

    @PostMapping("/shared/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void addSharingNote(@PathVariable Long id, @RequestBody TextNode email, Principal principal) {
        noteService.addSharingNote(id, email.asText(), principal);
    }

    @DeleteMapping("/shared/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void removeSharingNote(@PathVariable Long id, @RequestBody TextNode userId, Principal principal) {
        noteService.removeSharingNote(id, userId.asLong(), principal);
    }
}
