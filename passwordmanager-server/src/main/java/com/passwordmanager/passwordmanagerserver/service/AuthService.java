package com.passwordmanager.passwordmanagerserver.service;

import com.passwordmanager.passwordmanagerserver.exception.ConfirmationTokenExpired;
import com.passwordmanager.passwordmanagerserver.exception.UserAlreadyExistsException;
import com.passwordmanager.passwordmanagerserver.exception.UserEmailIsNotConfirmed;
import com.passwordmanager.passwordmanagerserver.model.ConfirmationToken;
import com.passwordmanager.passwordmanagerserver.model.LoginRequest;
import com.passwordmanager.passwordmanagerserver.model.User;
import com.passwordmanager.passwordmanagerserver.repository.ConfirmationTokenRepository;
import com.passwordmanager.passwordmanagerserver.repository.UserRepository;
import com.passwordmanager.passwordmanagerserver.util.EmailSender;
import jakarta.mail.MessagingException;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.view.RedirectView;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailSender emailSender;

    public AuthService(AuthenticationManager authenticationManager, TokenService tokenService, UserRepository userRepository, ConfirmationTokenRepository confirmationTokenRepository, PasswordEncoder passwordEncoder, EmailSender emailSender) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
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
        redirectView.setUrl("http://localhost:3000/signin");

        return redirectView;
    }

    public String getEmail (Principal principal) {
        return principal.getName();
    }
}
