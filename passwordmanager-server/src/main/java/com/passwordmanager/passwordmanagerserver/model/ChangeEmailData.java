package com.passwordmanager.passwordmanagerserver.model;

public record ChangeEmailData(LoginRequest loginRequest, String newEmail) {
}
