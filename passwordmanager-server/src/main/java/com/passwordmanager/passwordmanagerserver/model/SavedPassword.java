package com.passwordmanager.passwordmanagerserver.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.ColumnTransformer;

import java.util.Objects;
import java.util.Set;

/**
 * Entity class that's represents saved password
 * Includes:
 * <ul>
 *     <li>Title - Required</li>
 *     <li>Url - Required</li>
 *     <li>Username - Required</li>
 *     <li>Password - Required</li>
 *     <li>Note</li>
 * </ul>
 */
@Entity
@Table(name = "passwords")
public class SavedPassword {
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
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(url::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String url;

    @NotBlank
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(username::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String username;

    @NotBlank
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(password::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String password;

    @Column(columnDefinition = "TEXT")
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(note::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "savedPasswords")
    private User user;

    private String owner_email;

    @ElementCollection
    private Set<String> sharedWithUsers;

    /**
     * Empty constructor for saved password.
     */
    public SavedPassword() {
    }

    /**
     * Constructor for saved password.
     *
     * @param title Saved password's title
     * @param url Saved password's url
     * @param username Saved password's username
     * @param password Saved password's password
     */
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
        this.owner_email = user.getEmail();
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
        if (!(o instanceof SavedPassword that)) return false;
        return getId().equals(that.getId()) && getTitle().equals(that.getTitle()) && getUrl().equals(that.getUrl()) && getUsername().equals(that.getUsername()) && getPassword().equals(that.getPassword()) && Objects.equals(getNote(), that.getNote()) && getUser().equals(that.getUser()) && getOwner_email().equals(that.getOwner_email()) && Objects.equals(getSharedWithUsers(), that.getSharedWithUsers());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getUrl(), getUsername(), getPassword(), getNote(), getUser(), getOwner_email(), getSharedWithUsers());
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
                ", owner_email='" + owner_email + '\'' +
                ", sharedWithUsers=" + sharedWithUsers +
                '}';
    }
}
