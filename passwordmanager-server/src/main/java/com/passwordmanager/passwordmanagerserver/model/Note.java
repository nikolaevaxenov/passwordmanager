package com.passwordmanager.passwordmanagerserver.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "notes")
public class Note {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "notes")
    private User user;

    @ElementCollection
    private Set<Long> sharedWithUsers;

    public Note() {
    }

    public Note(String title, String text) {
        this.title = title;
        this.text = text;
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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
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
        if (!(o instanceof Note note)) return false;
        return getId().equals(note.getId()) && getTitle().equals(note.getTitle()) && getText().equals(note.getText()) && Objects.equals(getUser(), note.getUser()) && Objects.equals(getSharedWithUsers(), note.getSharedWithUsers());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getText(), getUser(), getSharedWithUsers());
    }

    @Override
    public String toString() {
        return "Note{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                ", user=" + user +
                ", sharedWithUsers=" + sharedWithUsers +
                '}';
    }
}
