package com.passwordmanager.passwordmanagerserver.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.passwordmanager.passwordmanagerserver.types.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.ColumnTransformer;

import java.util.Date;
import java.util.Objects;
import java.util.Set;

/**
 * Entity class that's represents address
 * Includes:
 * <ul>
 *     <li>Title - Required</li>
 *     <li>First name - Required</li>
 *     <li>Middle name</li>
 *     <li>Last name</li>
 *     <li>Username</li>
 *     <li>Gender</li>
 *     <li>Birthdate</li>
 *     <li>Company</li>
 *     <li>Address 1 - Required</li>
 *     <li>Address 2</li>
 *     <li>Address 3</li>
 *     <li>City - Required</li>
 *     <li>County - Required</li>
 *     <li>State - Required</li>
 *     <li>Zip code - Required</li>
 *     <li>Country - Required</li>
 *     <li>Email</li>
 *     <li>Phone number</li>
 *     <li>Note</li>
 * </ul>
 */
@Entity
@Table(name = "addresses")
public class Address {
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
            read = "PGP_SYM_DECRYPT(first_name::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String firstName;

    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(middle_name::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String middleName;

    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(last_name::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String lastName;

    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(username::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String username;

    private Gender gender;

    @Temporal(TemporalType.DATE)
    private Date birthdate;

    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(company::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String company;

    @NotBlank
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(address1::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String address1;

    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(address2::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String address2;

    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(address3::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String address3;

    @NotBlank
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(city::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String city;

    @NotBlank
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(county::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String county;

    @NotBlank
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(state::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String state;

    @NotBlank
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(zip_code::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String zipCode;

    @NotBlank
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(country::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String country;

    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(email::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String email;

    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(phone::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String phone;

    @Column(columnDefinition = "TEXT")
    @ColumnTransformer(
            read = "PGP_SYM_DECRYPT(note::bytea, current_setting('my.dbsecretkey'))",
            write = "PGP_SYM_ENCRYPT (?, current_setting('my.dbsecretkey'))"
    )
    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "addresses")
    private User user;

    private String owner_email;

    @ElementCollection
    private Set<String> sharedWithUsers;

    /**
     * Empty constructor for address entity.
     */
    public Address() {
    }

    /**
     * Constructor for address entity.
     *
     * @param title Address's title
     * @param firstName Person's first name
     * @param address1 Represent address line
     * @param city Represent city name
     * @param county Represent county name
     * @param state Represent state name
     * @param zipCode Represent zip code
     * @param country Represent country name
     */
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

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthDate) {
        this.birthdate = birthDate;
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
        if (!(o instanceof Address address)) return false;
        return getId().equals(address.getId()) && getTitle().equals(address.getTitle()) && getFirstName().equals(address.getFirstName()) && Objects.equals(getMiddleName(), address.getMiddleName()) && Objects.equals(getLastName(), address.getLastName()) && Objects.equals(getUsername(), address.getUsername()) && getGender() == address.getGender() && Objects.equals(getBirthdate(), address.getBirthdate()) && Objects.equals(getCompany(), address.getCompany()) && getAddress1().equals(address.getAddress1()) && Objects.equals(getAddress2(), address.getAddress2()) && Objects.equals(getAddress3(), address.getAddress3()) && getCity().equals(address.getCity()) && getCounty().equals(address.getCounty()) && getState().equals(address.getState()) && getZipCode().equals(address.getZipCode()) && getCountry().equals(address.getCountry()) && Objects.equals(getEmail(), address.getEmail()) && Objects.equals(getPhone(), address.getPhone()) && Objects.equals(getNote(), address.getNote()) && getUser().equals(address.getUser()) && getOwner_email().equals(address.getOwner_email()) && Objects.equals(getSharedWithUsers(), address.getSharedWithUsers());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getFirstName(), getMiddleName(), getLastName(), getUsername(), getGender(), getBirthdate(), getCompany(), getAddress1(), getAddress2(), getAddress3(), getCity(), getCounty(), getState(), getZipCode(), getCountry(), getEmail(), getPhone(), getNote(), getUser(), getOwner_email(), getSharedWithUsers());
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
                ", birthDate=" + birthdate +
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
                ", owner_email='" + owner_email + '\'' +
                ", sharedWithUsers=" + sharedWithUsers +
                '}';
    }
}
