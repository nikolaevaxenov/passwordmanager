package com.passwordmanager.passwordmanagerserver.controller;

import com.passwordmanager.passwordmanagerserver.model.LoginRequest;
import com.passwordmanager.passwordmanagerserver.model.User;
import com.passwordmanager.passwordmanagerserver.repository.UserRepository;
import com.passwordmanager.passwordmanagerserver.service.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/authorization")
public class AuthController {
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public AuthController(TokenService tokenService, AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signin")
    public String signin(@RequestBody LoginRequest loginRequest) throws AuthenticationException {
        System.out.println(loginRequest);
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password()));

        return tokenService.generateToken(authentication);
    }

    @PostMapping("/signup")
    public String signup(@RequestBody LoginRequest loginRequest) {
        if (userRepository.findByEmail(loginRequest.username()).isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email address already used!");

        userRepository.save(new User(loginRequest.username(), passwordEncoder.encode(loginRequest.password()), "ROLE_USER"));

        return signin(loginRequest);
    }

    @GetMapping("/signin")
    public String getEmail(Principal principal) {
        return principal.getName();
    }

}
