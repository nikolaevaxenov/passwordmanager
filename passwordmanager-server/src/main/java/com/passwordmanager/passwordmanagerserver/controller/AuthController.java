package com.passwordmanager.passwordmanagerserver.controller;

import com.passwordmanager.passwordmanagerserver.dto.*;
import com.passwordmanager.passwordmanagerserver.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/authorization")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signin")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String signIn(@RequestBody LoginRequest loginRequest) throws AuthenticationException {
        return authService.signIn(loginRequest);
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public void signUp(@RequestBody SignUpData signUpData) {
        authService.signUp(signUpData.loginRequest(), signUpData.locale());
    }

    @GetMapping("/signin")
    @ResponseStatus(HttpStatus.OK)
    public String getEmail(Principal principal) {
        return authService.getEmail(principal);
    }

    @GetMapping("/confirmemail/{token}")
    public RedirectView confirmEmail(@PathVariable UUID token) {
        return authService.confirmEmail(token);
    }

    @PostMapping("/changepassword")
    @ResponseStatus(HttpStatus.OK)
    public void changePassword(@RequestBody ChangePasswordData changePasswordData) {
        authService.changePassword(changePasswordData.loginRequest(), changePasswordData.newPassword());
    }

    @PostMapping("/changeemail")
    @ResponseStatus(HttpStatus.OK)
    public void requestToChangeEmail(@RequestBody ChangeEmailData changeEmailData) {
        authService.requestToChangeEmail(changeEmailData.loginRequest(), changeEmailData.newEmail(), changeEmailData.locale());
    }

    @GetMapping("/confirmnewemail/{token}")
    public RedirectView confirmNewEmail(@PathVariable UUID token) {
        return authService.changeEmail(token);
    }

    @PostMapping("/forgotpassword")
    @ResponseStatus(HttpStatus.OK)
    public void forgotPasswordRequest(@RequestBody ForgotPasswordData forgotPasswordData) {
        authService.forgotPasswordRequest(forgotPasswordData.email(), forgotPasswordData.newPassword(), forgotPasswordData.locale());
    }

    @GetMapping("/confirmforgotpassword/{token}")
    public RedirectView confirmForgotPassword(@PathVariable UUID token) {
        return authService.forgotPassword(token);
    }
}
