package com.passwordmanager.passwordmanagerserver.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.ColumnTransformer;

import java.util.Objects;
import java.util.Set;

/**
 * Entity class that's represents note
 * Includes:
 * <ul>
 *     <li>Title - Required</li>
 *     <li>Text - Required</li>
 * </ul>
 */
@Entity
@Table(name = "notes")
public class Note {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(title::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String title;

    @NotBlank
    @Column(columnDefinition = "TEXT")
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(text::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_email", referencedColumnName = "email")
    @JsonBackReference(value = "notes")
    private User user;

    @Column(name = "owner_email", insertable=false, updatable=false)
    private String owner_email;

    @ElementCollection
    private Set<String> sharedWithUsers;

    /**
     * Empty constructor for note entity.
     */
    public Note() {
    }

    /**
     * Constructor for note entity.
     *
     * @param title Note's title
     * @param text Note's text
     */
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

    public Set<String> getSharedWithUsers() {
        return sharedWithUsers;
    }

    public void setSharedWithUsers(Set<String> sharedWithUsers) {
        this.sharedWithUsers = sharedWithUsers;
    }

    public void addSharedWithUsers(String email) {
        this.sharedWithUsers.add(email);
    }

    public void removeSharedWithUsers(String email) {
        this.sharedWithUsers.remove(email);
    }

    public String getOwner_email() {
        return owner_email;
    }

    public void setOwner_email(String owner_email) {
        this.owner_email = owner_email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Note note)) return false;
        return getId().equals(note.getId()) && getTitle().equals(note.getTitle()) && getText().equals(note.getText()) && getUser().equals(note.getUser()) && getOwner_email().equals(note.getOwner_email()) && Objects.equals(getSharedWithUsers(), note.getSharedWithUsers());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getText(), getUser(), getOwner_email(), getSharedWithUsers());
    }

    @Override
    public String toString() {
        return "Note{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                ", user=" + user +
                ", owner_email='" + owner_email + '\'' +
                ", sharedWithUsers=" + sharedWithUsers +
                '}';
    }
}
