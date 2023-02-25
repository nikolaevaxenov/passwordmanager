package com.passwordmanager.passwordmanagerserver.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.passwordmanager.passwordmanagerserver.types.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.Date;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String firstName;

    private String middleName;

    private String lastName;

    private String username;

    private Gender gender;

    @Temporal(TemporalType.DATE)
    private Date birthDate;

    private String company;

    @NotBlank
    private String address1;

    private String address2;

    private String address3;

    @NotBlank
    private String city;

    @NotBlank
    private String county;

    @NotBlank
    private String state;

    @NotBlank
    private String zipCode;

    @NotBlank
    private String country;

    private String email;

    private String phone;

    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "addresses")
    private User user;

    @ElementCollection
    private Set<Long> sharedWithUsers;

    public Address() {
    }

    public Address(String title, String firstName, String address1, String city, String county, String state, String zipCode, String country) {
        this.title = title;
        this.firstName = firstName;
        this.address1 = address1;
        this.city = city;
        this.county = county;
        this.state = state;
        this.zipCode = zipCode;
        this.country = country;
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getAddress3() {
        return address3;
    }

    public void setAddress3(String address3) {
        this.address3 = address3;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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
        if (!(o instanceof Address address)) return false;
        return getId().equals(address.getId()) && getTitle().equals(address.getTitle()) && getFirstName().equals(address.getFirstName()) && Objects.equals(getMiddleName(), address.getMiddleName()) && Objects.equals(getLastName(), address.getLastName()) && Objects.equals(getUsername(), address.getUsername()) && getGender() == address.getGender() && Objects.equals(getBirthDate(), address.getBirthDate()) && Objects.equals(getCompany(), address.getCompany()) && getAddress1().equals(address.getAddress1()) && Objects.equals(getAddress2(), address.getAddress2()) && Objects.equals(getAddress3(), address.getAddress3()) && getCity().equals(address.getCity()) && getCounty().equals(address.getCounty()) && getState().equals(address.getState()) && getZipCode().equals(address.getZipCode()) && getCountry().equals(address.getCountry()) && Objects.equals(getEmail(), address.getEmail()) && Objects.equals(getPhone(), address.getPhone()) && Objects.equals(getNote(), address.getNote()) && Objects.equals(getUser(), address.getUser()) && Objects.equals(getSharedWithUsers(), address.getSharedWithUsers());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getFirstName(), getMiddleName(), getLastName(), getUsername(), getGender(), getBirthDate(), getCompany(), getAddress1(), getAddress2(), getAddress3(), getCity(), getCounty(), getState(), getZipCode(), getCountry(), getEmail(), getPhone(), getNote(), getUser(), getSharedWithUsers());
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", username='" + username + '\'' +
                ", gender=" + gender +
                ", birthDate=" + birthDate +
                ", company='" + company + '\'' +
                ", address1='" + address1 + '\'' +
                ", address2='" + address2 + '\'' +
                ", address3='" + address3 + '\'' +
                ", city='" + city + '\'' +
                ", county='" + county + '\'' +
                ", state='" + state + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", country='" + country + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", note='" + note + '\'' +
                ", user=" + user +
                ", sharedWithUsers=" + sharedWithUsers +
                '}';
    }
}
