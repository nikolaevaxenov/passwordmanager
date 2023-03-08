package com.passwordmanager.passwordmanagerserver.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.ColumnTransformer;

import java.util.Date;
import java.util.Objects;
import java.util.Set;

/**
 * Entity class that's represents payment card
 * Includes:
 * <ul>
 *     <li>Title - Required</li>
 *     <li>Credit/debit card number - Required</li>
 *     <li>Card's security code - Required</li>
 *     <li>Card's expiration date - Required</li>
 *     <li>Note</li>
 * </ul>
 */
@Entity
@Table(name = "payment_cards")
public class PaymentCard {
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
            read = "PGP_SYM_DECRYPT(number::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String number;

    @NotBlank
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(security_code::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String securityCode;

    @Temporal(TemporalType.DATE)
    private Date expirationDate;

    @Column(columnDefinition = "TEXT")
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(note::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_email", referencedColumnName = "email")
    @JsonBackReference(value = "paymentCards")
    private User user;

    @Column(name = "owner_email", insertable=false, updatable=false)
    private String owner_email;

    @ElementCollection
    private Set<String> sharedWithUsers;

    /**
     * Empty constructor for payment card entity.
     */
    public PaymentCard() {
    }

    /**
     * Constructor for payment card entity.
     *
     * @param title Payment card's title
     * @param number Credit/debit card number
     * @param securityCode Payment card's number (CVC, CVV)
     * @param expirationDate Payment card's expiration date (for example 11/24)
     */
    public PaymentCard(String title, String number, String securityCode, Date expirationDate) {
        this.title = title;
        this.number = number;
        this.securityCode = securityCode;
        this.expirationDate = expirationDate;
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

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getSecurityCode() {
        return securityCode;
    }

    public void setSecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
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
        if (!(o instanceof PaymentCard that)) return false;
        return getId().equals(that.getId()) && getTitle().equals(that.getTitle()) && getNumber().equals(that.getNumber()) && getSecurityCode().equals(that.getSecurityCode()) && getExpirationDate().equals(that.getExpirationDate()) && Objects.equals(getNote(), that.getNote()) && getUser().equals(that.getUser()) && getOwner_email().equals(that.getOwner_email()) && Objects.equals(getSharedWithUsers(), that.getSharedWithUsers());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getNumber(), getSecurityCode(), getExpirationDate(), getNote(), getUser(), getOwner_email(), getSharedWithUsers());
    }

    @Override
    public String toString() {
        return "PaymentCard{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", number='" + number + '\'' +
                ", securityCode='" + securityCode + '\'' +
                ", expirationDate='" + expirationDate + '\'' +
                ", note='" + note + '\'' +
                ", user=" + user +
                ", owner_email='" + owner_email + '\'' +
                ", sharedWithUsers=" + sharedWithUsers +
                '}';
    }
}
