package com.passwordmanager.passwordmanagerserver.model;

public record ChangePasswordData(LoginRequest loginRequest, String newPassword) {
}
