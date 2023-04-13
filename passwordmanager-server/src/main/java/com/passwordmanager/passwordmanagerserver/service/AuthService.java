package com.passwordmanager.passwordmanagerserver.service;

import com.passwordmanager.passwordmanagerserver.exception.ConfirmationTokenExpired;
import com.passwordmanager.passwordmanagerserver.exception.UserAlreadyExistsException;
import com.passwordmanager.passwordmanagerserver.exception.UserEmailIsNotConfirmed;
import com.passwordmanager.passwordmanagerserver.model.ConfirmationToken;
import com.passwordmanager.passwordmanagerserver.dto.LoginRequest;
import com.passwordmanager.passwordmanagerserver.model.User;
import com.passwordmanager.passwordmanagerserver.repository.*;
import com.passwordmanager.passwordmanagerserver.util.EmailSender;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.view.RedirectView;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    private final NoteRepository noteRepository;

    private final PaymentCardRepository paymentCardRepository;

    private final SavedPasswordRepository savedPasswordRepository;
    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailSender emailSender;

    @Value("${links.frontend}")
    private String frontendLink;

    public AuthService(AuthenticationManager authenticationManager, TokenService tokenService, UserRepository userRepository, AddressRepository addressRepository, NoteRepository noteRepository, PaymentCardRepository paymentCardRepository, SavedPasswordRepository savedPasswordRepository, ConfirmationTokenRepository confirmationTokenRepository, PasswordEncoder passwordEncoder, EmailSender emailSender) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.noteRepository = noteRepository;
        this.paymentCardRepository = paymentCardRepository;
        this.savedPasswordRepository = savedPasswordRepository;
        this.confirmationTokenRepository = confirmationTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailSender = emailSender;
    }

    public String signIn(LoginRequest loginRequest) throws AuthenticationException {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password()));

            return tokenService.generateToken(authentication);
        } catch (DisabledException e) {
            throw new UserEmailIsNotConfirmed("Email is not confirmed!");
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    public void signUp(LoginRequest loginRequest) {
        try {
            var newUser = new User(loginRequest.username(), passwordEncoder.encode(loginRequest.password()), "ROLE_USER");
            userRepository.save(newUser);

            var confirmationToken = new ConfirmationToken(newUser);
            confirmationTokenRepository.save(confirmationToken);

            emailSender.sendConfirmationEmail(newUser.getEmail(), confirmationToken.getId().toString());
        } catch (DataIntegrityViolationException e) {
            throw new UserAlreadyExistsException("Email address already used!");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public RedirectView confirmEmail(UUID token) {
        var confirmationToken = confirmationTokenRepository.findById(token).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        var user = confirmationToken.getUser();

        if (confirmationToken.getExpirationTime().isAfter(LocalDateTime.now())) {
            user.setActivated(true);
            userRepository.save(user);
        } else {
            confirmationTokenRepository.delete(confirmationToken);
            throw new ConfirmationTokenExpired("Confirmation token in expired!");
        }

        confirmationTokenRepository.delete(confirmationToken);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(frontendLink + "signin");

        return redirectView;
    }

    public void changePassword(LoginRequest loginRequest, String newPassword) throws AuthenticationException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password()));

            var user = userRepository.findByEmail(loginRequest.username()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    private void updateEmailsInAddresses(String oldEmail, User user) {
        var sharedAddresses = addressRepository
                .findAll()
                .stream()
                .filter(a -> a.getSharedWithUsers()
                        .stream()
                        .anyMatch(email -> email.equals(oldEmail)))
                .collect(Collectors.toSet());

        sharedAddresses.addAll(user.getAddresses());

        sharedAddresses.forEach(addr -> {
            if (Objects.equals(addr.getUser().getId(), user.getId())) {
                addr.setOwner_email(user.getEmail());
            }
            else {
                var sharedList = addr.getSharedWithUsers().stream().map(email -> Objects.equals(email, oldEmail) ? user.getEmail() : email).collect(Collectors.toSet());
                addr.setSharedWithUsers(sharedList);
            }
            addressRepository.save(addr);
        });
    }

    private void updateEmailsInNotes(String oldEmail, User user) {
        var sharedNotes = noteRepository
                .findAll()
                .stream()
                .filter(n -> n.getSharedWithUsers()
                        .stream()
                        .anyMatch(email -> email.equals(oldEmail)))
                .collect(Collectors.toSet());

        sharedNotes.addAll(user.getNotes());

        sharedNotes.forEach(note -> {
            if (Objects.equals(note.getUser().getId(), user.getId())) {
                note.setOwner_email(user.getEmail());
            }
            else {
                var sharedList = note.getSharedWithUsers().stream().map(email -> Objects.equals(email, oldEmail) ? user.getEmail() : email).collect(Collectors.toSet());
                note.setSharedWithUsers(sharedList);
            }
            noteRepository.save(note);
        });
    }

    private void updateEmailsInPaymentCards(String oldEmail, User user) {
        var sharedPaymentCards = paymentCardRepository
                .findAll()
                .stream()
                .filter(pc -> pc.getSharedWithUsers()
                        .stream()
                        .anyMatch(email -> email.equals(oldEmail)))
                .collect(Collectors.toSet());

        sharedPaymentCards.addAll(user.getPaymentCards());

        sharedPaymentCards.forEach(pc -> {
            if (Objects.equals(pc.getUser().getId(), user.getId())) {
                pc.setOwner_email(user.getEmail());
            }
            else {
                var sharedList = pc.getSharedWithUsers().stream().map(email -> Objects.equals(email, oldEmail) ? user.getEmail() : email).collect(Collectors.toSet());
                pc.setSharedWithUsers(sharedList);
            }
            paymentCardRepository.save(pc);
        });
    }

    private void updateEmailsInSavedPasswords(String oldEmail, User user) {
        var sharedSavedPasswords = savedPasswordRepository
                .findAll()
                .stream()
                .filter(pc -> pc.getSharedWithUsers()
                        .stream()
                        .anyMatch(email -> email.equals(oldEmail)))
                .collect(Collectors.toSet());

        sharedSavedPasswords.addAll(user.getSavedPasswords());

        sharedSavedPasswords.forEach(sp -> {
            if (Objects.equals(sp.getUser().getId(), user.getId())) {
                sp.setOwner_email(user.getEmail());
            }
            else {
                var sharedList = sp.getSharedWithUsers().stream().map(email -> Objects.equals(email, oldEmail) ? user.getEmail() : email).collect(Collectors.toSet());
                sp.setSharedWithUsers(sharedList);
            }
            savedPasswordRepository.save(sp);
        });
    }

    public void requestToChangeEmail(LoginRequest loginRequest, String newEmail) throws AuthenticationException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password()));

            if (userRepository.findByEmail(newEmail).isPresent() || Objects.equals(loginRequest.username(), newEmail))
                throw new UserAlreadyExistsException("Email address already used!");

            var user = userRepository.findByEmail(loginRequest.username()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
            var confirmationToken = new ConfirmationToken(user, newEmail);
            confirmationTokenRepository.save(confirmationToken);

            emailSender.sendNewEmailConfirmation(newEmail, confirmationToken.getId().toString());
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public RedirectView changeEmail(UUID token) {
        var confirmationToken = confirmationTokenRepository.findById(token).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (confirmationToken.getExpirationTime().isAfter(LocalDateTime.now())) {
            var user = confirmationToken.getUser();
            var oldEmail = confirmationToken.getUser().getEmail();

            user.setEmail(confirmationToken.getNewEmail());

            updateEmailsInAddresses(oldEmail, user);
            updateEmailsInNotes(oldEmail, user);
            updateEmailsInPaymentCards(oldEmail, user);
            updateEmailsInSavedPasswords(oldEmail, user);

            userRepository.save(user);
        } else {
            confirmationTokenRepository.delete(confirmationToken);
            throw new ConfirmationTokenExpired("Confirmation token in expired!");
        }

        confirmationTokenRepository.delete(confirmationToken);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(frontendLink + "signin");

        return redirectView;
    }

    public void forgotPasswordRequest(String email, String newPassword) {
        try {
            var user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

            var confirmationToken = new ConfirmationToken(user);
            confirmationToken.setNewPassword(passwordEncoder.encode(newPassword));

            confirmationTokenRepository.save(confirmationToken);

            emailSender.sendForgotPasswordConfirmation(email, confirmationToken.getId().toString());
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public RedirectView forgotPassword(UUID token) {
        var confirmationToken = confirmationTokenRepository.findById(token).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (confirmationToken.getExpirationTime().isAfter(LocalDateTime.now())) {
            var user = confirmationToken.getUser();

            user.setPassword(confirmationToken.getNewPassword());

            userRepository.save(user);
        } else {
            confirmationTokenRepository.delete(confirmationToken);
            throw new ConfirmationTokenExpired("Confirmation token in expired!");
        }

        confirmationTokenRepository.delete(confirmationToken);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(frontendLink + "signin");

        return redirectView;
    }

    public String getEmail (Principal principal) {
        return principal.getName();
    }
}
