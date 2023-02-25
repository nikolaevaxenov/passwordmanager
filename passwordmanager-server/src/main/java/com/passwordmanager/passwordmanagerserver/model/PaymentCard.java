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

    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "paymentCards")
    private User user;

    @ElementCollection
    private Set<Long> sharedWithUsers;

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

    public Set<Long> getSharedWithUsers() {
        return sharedWithUsers;
    }

    public void setSharedWithUsers(Set<Long> sharedWithUsers) {
        this.sharedWithUsers = sharedWithUsers;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PaymentCard that)) return false;
        return getId().equals(that.getId()) && getTitle().equals(that.getTitle()) && getCardBrand() == that.getCardBrand() && getNumber().equals(that.getNumber()) && getSecurityCode().equals(that.getSecurityCode()) && getExpirationDate().equals(that.getExpirationDate()) && Objects.equals(getNote(), that.getNote()) && Objects.equals(getUser(), that.getUser()) && Objects.equals(getSharedWithUsers(), that.getSharedWithUsers());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getCardBrand(), getNumber(), getSecurityCode(), getExpirationDate(), getNote(), getUser(), getSharedWithUsers());
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
                ", sharedWithUsers=" + sharedWithUsers +
                '}';
    }
}
