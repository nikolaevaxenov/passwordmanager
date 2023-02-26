package com.passwordmanager.passwordmanagerserver.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "passwords")
public class SavedPassword {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String url;

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "savedPasswords")
    private User user;

    @ElementCollection
    private Set<Long> sharedWithUsers;

    public SavedPassword() {
    }

    public SavedPassword(String title, String url, String username, String password) {
        this.title = title;
        this.url = url;
        this.username = username;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Long> getSharedWithUsers() {
        return sharedWithUsers;
    }

    public void setSharedWithUsers(Set<Long> sharedWithUsers) {
        this.sharedWithUsers = sharedWithUsers;
    }

    public void addSharedWithUsers(Long id) {
        this.sharedWithUsers.add(id);
    }

    public void removeSharedWithUsers(Long id) {
        this.sharedWithUsers.remove(id);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SavedPassword that)) return false;
        return getId().equals(that.getId()) && getTitle().equals(that.getTitle()) && getUrl().equals(that.getUrl()) && getUsername().equals(that.getUsername()) && getPassword().equals(that.getPassword()) && Objects.equals(getNote(), that.getNote()) && Objects.equals(getUser(), that.getUser()) && Objects.equals(getSharedWithUsers(), that.getSharedWithUsers());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getUrl(), getUsername(), getPassword(), getNote(), getUser(), getSharedWithUsers());
    }

    @Override
    public String toString() {
        return "SavedPassword{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", url='" + url + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", note='" + note + '\'' +
                ", user=" + user +
                ", sharedWithUsers=" + sharedWithUsers +
                '}';
    }
}
