package com.passwordmanager.passwordmanagerserver.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    private String password;

    private String roles;

    private boolean isActivated = true;

    @OneToMany(mappedBy = "user", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "savedPasswords")
    private Set<SavedPassword> savedPasswords;

    @OneToMany(mappedBy = "user", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "notes")
    private Set<Note> notes;

    @OneToMany(mappedBy = "user", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "addresses")
    private Set<Address> addresses;

    @OneToMany(mappedBy = "user", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "paymentCards")
    private Set<PaymentCard> paymentCards;

    public User() {
    }

    public User(String email, String password, String roles) {
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public boolean isActivated() {
        return isActivated;
    }

    public void setActivated(boolean activated) {
        isActivated = activated;
    }

    public Set<SavedPassword> getSavedPasswords() {
        return savedPasswords;
    }

    public void setSavedPasswords(Set<SavedPassword> savedPasswords) {
        this.savedPasswords = savedPasswords;
    }

    public Set<Note> getNotes() {
        return notes;
    }

    public void setNotes(Set<Note> notes) {
        this.notes = notes;
    }

    public Set<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
    }

    public Set<PaymentCard> getPaymentCards() {
        return paymentCards;
    }

    public void setPaymentCards(Set<PaymentCard> paymentCards) {
        this.paymentCards = paymentCards;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return getId() == user.getId() && isActivated() == user.isActivated() && getEmail().equals(user.getEmail()) && getPassword().equals(user.getPassword()) && getRoles().equals(user.getRoles()) && Objects.equals(getSavedPasswords(), user.getSavedPasswords()) && Objects.equals(getNotes(), user.getNotes()) && Objects.equals(getAddresses(), user.getAddresses()) && Objects.equals(getPaymentCards(), user.getPaymentCards());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getEmail(), getPassword(), getRoles(), isActivated());
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", roles='" + roles + '\'' +
                ", isActivated=" + isActivated +
                ", savedPasswords=" + savedPasswords +
                ", notes=" + notes +
                ", addresses=" + addresses +
                ", paymentCards=" + paymentCards +
                '}';
    }
}
