package com.passwordmanager.passwordmanagerserver.model;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

/**
 * User entity class for an authorization, implements an UserDetails interface.
 *
 * @see UserDetails
 */
@Slf4j
public class SecurityUser implements UserDetails {
    private final User user;

    /**
     * SecurityUser constructor.
     *
     * @param user User entity
     *
     * @see User
     */
    public SecurityUser(User user) {
        this.user = user;
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    /**
     * Method for getting user's authorities.
     * Gets authorities that is represented in string, separated by comma,
     * splits it and for each authority creates new SinpleGrantedAuthority object.
     *
     * @return List of authorities represents by SimpleGrantedAuthority
     *
     * @see GrantedAuthority
     * @see SimpleGrantedAuthority
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(user
                .getRoles()
                .split(","))
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.isActivated();
    }
}
