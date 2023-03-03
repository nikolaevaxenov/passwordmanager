package com.passwordmanager.passwordmanagerserver.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.passwordmanager.passwordmanagerserver.types.CardBrand;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "payment_cards")
public class PaymentCard {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String title;

    private CardBrand cardBrand;

    @NotBlank
    private String number;

    @NotBlank
    private String securityCode;

    @NotBlank
    private String expirationDate;

    @Column(columnDefinition = "TEXT")
    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_email", referencedColumnName = "email")
    @JsonBackReference(value = "paymentCards")
    private User user;

    @Column(name = "owner_email", insertable=false, updatable=false)
    private String owner_email;

    @ElementCollection
    private Set<String> sharedWithUsers;

    public PaymentCard() {
    }

    public PaymentCard(String title, CardBrand cardBrand, String number, String securityCode, String expirationDate) {
        this.title = title;
        this.cardBrand = cardBrand;
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

    public CardBrand getCardBrand() {
        return cardBrand;
    }

    public void setCardBrand(CardBrand cardBrand) {
        this.cardBrand = cardBrand;
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

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
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
        return getId().equals(that.getId()) && getTitle().equals(that.getTitle()) && getCardBrand() == that.getCardBrand() && getNumber().equals(that.getNumber()) && getSecurityCode().equals(that.getSecurityCode()) && getExpirationDate().equals(that.getExpirationDate()) && Objects.equals(getNote(), that.getNote()) && getUser().equals(that.getUser()) && getOwner_email().equals(that.getOwner_email()) && Objects.equals(getSharedWithUsers(), that.getSharedWithUsers());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getCardBrand(), getNumber(), getSecurityCode(), getExpirationDate(), getNote(), getUser(), getOwner_email(), getSharedWithUsers());
    }

    @Override
    public String toString() {
        return "PaymentCard{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", cardBrand=" + cardBrand +
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
