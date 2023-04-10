package com.passwordmanager.passwordmanagerserver.dto;

public record ChangePasswordData(LoginRequest loginRequest, String newPassword) {
}
