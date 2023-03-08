package com.passwordmanager.passwordmanagerserver.model;

/**
 * Data transfer class for an authentication from frontend.
 *
 * @param username User's username (in this application emails are used)
 * @param password User's password in a plain format
 */
public record LoginRequest(String username, String password) {
}
