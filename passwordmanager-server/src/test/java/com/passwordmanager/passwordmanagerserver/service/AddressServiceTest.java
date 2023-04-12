package com.passwordmanager.passwordmanagerserver.service;

import com.passwordmanager.passwordmanagerserver.model.Address;
import com.passwordmanager.passwordmanagerserver.model.User;
import com.passwordmanager.passwordmanagerserver.repository.AddressRepository;
import com.passwordmanager.passwordmanagerserver.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AddressServiceTest {
    @Mock private AddressRepository addressRepository;
    @Mock private UserRepository userRepository;
    @Mock private Principal principal;

    @InjectMocks private AddressService addressService;

    @Test
    void getAllAddresses() {
        var requestUsername = "user2@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var user2 = new User("user2@mail.com", "qwerty", "ROLE_USER");

        var address1 = new Address("First address", "Ivan", "Lorem rd.", "Ipsum", "Dolor county", "SIT", "123456", "Amet");
        address1.setId(1L);
        address1.setUser(user1);
        address1.setSharedWithUsers(Set.of("user2@mail.com"));

        var address2 = new Address("Second address", "Ivan", "Lorem rd.", "Ipsum", "Dolor county", "SIT", "123456", "Amet");
        address2.setId(2L);
        address2.setUser(user2);
        address2.setSharedWithUsers(Set.of());

        user1.setAddresses(Set.of(address1));
        user2.setAddresses(Set.of(address2));

        when(principal.getName()).thenReturn(requestUsername);
        when(addressRepository.findAll()).thenReturn(List.of(address1, address2));
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user2));

        var result = addressService.getAllAddresses(principal);

        assertThat(result).isEqualTo(Set.of(address1, address2));
    }

    @Test
    void getAddressById() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var address1 = new Address("First address", "Ivan", "Lorem rd.", "Ipsum", "Dolor county", "SIT", "123456", "Amet");
        address1.setId(1L);
        address1.setUser(user1);

        user1.setAddresses(Set.of(address1));

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));

        var result = addressService.getAddressById(1L, principal);

        assertThat(result).isEqualTo(address1);
    }

    @Test
    void createAddress() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var address1 = new Address("First address", "Ivan", "Lorem rd.", "Ipsum", "Dolor county", "SIT", "123456", "Amet");
        address1.setId(1L);
        address1.setUser(user1);

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));
        when(addressRepository.save(address1)).thenReturn(address1);

        var result = addressService.createAddress(address1, principal);

        assertThat(result).isEqualTo(address1);
    }

    @Test
    void editAddress() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var address1 = new Address("First address", "Ivan", "Lorem rd.", "Ipsum", "Dolor county", "SIT", "123456", "Amet");
        address1.setId(1L);
        address1.setUser(user1);

        user1.setAddresses(Set.of(address1));

        var address1edited = new Address("Edited address", "Ivan", "Lorem rd.", "Ipsum", "Dolor county", "SIT", "123456", "Amet");
        address1edited.setId(1L);
        address1edited.setUser(user1);

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));
        when(addressRepository.save(address1edited)).thenReturn(address1edited);

        var result = addressService.editAddress(address1edited, principal);

        assertThat(result).isEqualTo(address1edited);
    }

    @Test
    void deleteAddress() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var address1 = new Address("First address", "Ivan", "Lorem rd.", "Ipsum", "Dolor county", "SIT", "123456", "Amet");
        address1.setId(1L);
        address1.setUser(user1);
        address1.setSharedWithUsers(Set.of());

        var address2 = new Address("Second address", "Ivan", "Lorem rd.", "Ipsum", "Dolor county", "SIT", "123456", "Amet");
        address2.setId(2L);
        address2.setUser(user1);
        address2.setSharedWithUsers(Set.of());

        user1.setAddresses(Set.of(address1, address2));

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));

        doNothing().when(addressRepository).delete(address2);

        addressService.deleteAddress(address2.getId(), principal);
        verify(addressRepository, times(1)).delete(address2);
        verifyNoMoreInteractions(addressRepository);
    }
}