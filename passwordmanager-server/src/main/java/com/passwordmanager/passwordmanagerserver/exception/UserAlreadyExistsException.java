package com.passwordmanager.passwordmanagerserver.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception that's thrown when requested on registration user already exists in database.
 */
@ResponseStatus(value = HttpStatus.CONFLICT, reason = "User already exists")
public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
