package com.passwordmanager.passwordmanagerserver.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "confirmation_tokens")
public class ConfirmationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private LocalDateTime expirationTime = LocalDateTime.now().plusDays(1);

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String newEmail;

    public ConfirmationToken() {
    }

    public ConfirmationToken(User user) {
        this.user = user;
    }

    public ConfirmationToken(User user, String newEmail) {
        this.user = user;
        this.newEmail = newEmail;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public LocalDateTime getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(LocalDateTime expirationTime) {
        this.expirationTime = expirationTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getNewEmail() {
        return newEmail;
    }

    public void setNewEmail(String newEmail) {
        this.newEmail = newEmail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ConfirmationToken that)) return false;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getExpirationTime(), that.getExpirationTime()) && Objects.equals(getUser(), that.getUser()) && Objects.equals(getNewEmail(), that.getNewEmail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getExpirationTime(), getUser(), getNewEmail());
    }

    @Override
    public String toString() {
        return "ConfirmationToken{" +
                "id=" + id +
                ", expirationTime=" + expirationTime +
                ", user=" + user +
                ", newEmail='" + newEmail + '\'' +
                '}';
    }
}
