package com.passwordmanager.passwordmanagerserver.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Email is not confirmed")
public class UserEmailIsNotConfirmed extends RuntimeException {
    public UserEmailIsNotConfirmed(String message) {
        super(message);
    }
}
