package com.passwordmanager.passwordmanagerserver.service;

import com.passwordmanager.passwordmanagerserver.exception.UserAlreadyExistsException;
import com.passwordmanager.passwordmanagerserver.model.LoginRequest;
import com.passwordmanager.passwordmanagerserver.model.User;
import com.passwordmanager.passwordmanagerserver.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager, TokenService tokenService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String signIn(LoginRequest loginRequest) throws AuthenticationException {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password()));

        return tokenService.generateToken(authentication);
    }

    public String signUp(LoginRequest loginRequest) {
        try {
            userRepository.save(new User(loginRequest.username(), passwordEncoder.encode(loginRequest.password()), "ROLE_USER"));
        } catch (DataIntegrityViolationException e) {
            throw new UserAlreadyExistsException("Email address already used!");
        }

        return signIn(loginRequest);
    }

    public String getEmail (Principal principal) {
        return principal.getName();
    }
}
