package com.passwordmanager.passwordmanagerserver.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE, reason = "Confirmation token in expired!")
public class ConfirmationTokenExpired extends RuntimeException{
    public ConfirmationTokenExpired(String message) {
        super(message);
    }
}
