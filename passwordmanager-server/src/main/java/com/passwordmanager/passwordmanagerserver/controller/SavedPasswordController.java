package com.passwordmanager.passwordmanagerserver.controller;

import com.passwordmanager.passwordmanagerserver.model.SavedPassword;
import com.passwordmanager.passwordmanagerserver.service.SavedPasswordService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/savedpassword")
public class SavedPasswordController {
    private final SavedPasswordService savedPasswordService;

    public SavedPasswordController(SavedPasswordService savedPasswordService) {
        this.savedPasswordService = savedPasswordService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Set<SavedPassword> getAllSavedPasswords(Principal principal) {
        return savedPasswordService.getAllSavedPasswords(principal);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public SavedPassword getSavedPasswordById(@PathVariable Long id, Principal principal) {
        return savedPasswordService.getSavedPasswordById(id, principal);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SavedPassword createSavedPassword(@RequestBody SavedPassword savedPassword, Principal principal) {
        return savedPasswordService.createSavedPassword(savedPassword, principal);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public SavedPassword editSavedPassword(@RequestBody SavedPassword savedPassword, Principal principal) {
        return savedPasswordService.editSavedPassword(savedPassword, principal);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteSavedPassword(@PathVariable Long id, Principal principal) {
        savedPasswordService.deleteSavedPassword(id, principal);
    }
}