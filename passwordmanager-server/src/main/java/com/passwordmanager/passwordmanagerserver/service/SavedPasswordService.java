package com.passwordmanager.passwordmanagerserver.service;

import com.passwordmanager.passwordmanagerserver.model.SavedPassword;
import com.passwordmanager.passwordmanagerserver.repository.SavedPasswordRepository;
import com.passwordmanager.passwordmanagerserver.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SavedPasswordService {
    private final UserRepository userRepository;
    private final SavedPasswordRepository savedPasswordRepository;

    public SavedPasswordService(UserRepository userRepository, SavedPasswordRepository savedPasswordRepository) {
        this.userRepository = userRepository;
        this.savedPasswordRepository = savedPasswordRepository;
    }

    public Set<SavedPassword> getAllSavedPasswords(Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var sharedSavedPasswords = savedPasswordRepository
                .findAll()
                .stream()
                .filter(p -> p.getSharedWithUsers()
                        .stream()
                        .anyMatch(id -> id.equals(user.getId())))
                .collect(Collectors.toSet());

        sharedSavedPasswords.addAll(user.getSavedPasswords());

        return sharedSavedPasswords;
    }

    public SavedPassword getSavedPasswordById(Long id, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return user.getSavedPasswords()
                .stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public SavedPassword createSavedPassword(SavedPassword savedPassword, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        savedPassword.setUser(user);

        return savedPasswordRepository.save(savedPassword);
    }

    public SavedPassword editSavedPassword(SavedPassword savedPassword, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var pass = user.getSavedPasswords()
                .stream()
                .filter(p -> p.getId().equals(savedPassword.getId()))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (savedPassword.getTitle() != null)
            pass.setTitle(savedPassword.getTitle());

        if (savedPassword.getUrl() != null)
            pass.setUrl(savedPassword.getUrl());

        if (savedPassword.getUsername() != null)
            pass.setUsername(savedPassword.getUsername());

        if (savedPassword.getPassword() != null)
            pass.setPassword(savedPassword.getPassword());

        if (savedPassword.getNote() != null)
            pass.setNote(savedPassword.getNote());

        return savedPasswordRepository.save(pass);
    }

    public void deleteSavedPassword(Long id, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var pass = user.getSavedPasswords()
                .stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        savedPasswordRepository.delete(pass);
    }

    public void addSharingSavedPassword(Long id, String email, Principal principal) {
        var owner = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        var otherUser = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var pass = owner.getSavedPasswords()
                .stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        pass.addSharedWithUsers(otherUser.getId());
        savedPasswordRepository.save(pass);
    }

    public void removeSharingSavedPassword(Long id, Long userId, Principal principal) {
        var owner = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var pass = owner.getSavedPasswords()
                .stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        pass.removeSharedWithUsers(userId);
        savedPasswordRepository.save(pass);
    }
}
