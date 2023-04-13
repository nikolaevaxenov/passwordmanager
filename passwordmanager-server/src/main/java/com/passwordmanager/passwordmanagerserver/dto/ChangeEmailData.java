package com.passwordmanager.passwordmanagerserver.dto;

public record ChangeEmailData(LoginRequest loginRequest, String newEmail, String locale) {
}
