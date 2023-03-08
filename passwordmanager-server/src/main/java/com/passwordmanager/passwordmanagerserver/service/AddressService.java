package com.passwordmanager.passwordmanagerserver.service;

import com.passwordmanager.passwordmanagerserver.model.Address;
import com.passwordmanager.passwordmanagerserver.repository.AddressRepository;
import com.passwordmanager.passwordmanagerserver.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AddressService {
    private final UserRepository userRepository;

    private final AddressRepository addressRepository;

    public AddressService(UserRepository userRepository, AddressRepository addressRepository) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
    }

    public Set<Address> getAllAddresses(Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var sharedAddresses = addressRepository
                .findAll()
                .stream()
                .filter(p -> p.getSharedWithUsers()
                        .stream()
                        .anyMatch(email -> email.equals(user.getEmail())))
                .collect(Collectors.toSet());

        sharedAddresses.addAll(user.getAddresses());

        return sharedAddresses;
    }

    public Address getAddressById(Long id, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return user.getAddresses()
                .stream()
                .filter(a -> a.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Address createAddress(Address address, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        address.setUser(user);

        return addressRepository.save(address);
    }

    public Address editAddress(Address address, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var addr = user.getAddresses()
                .stream()
                .filter(a -> a.getId().equals(address.getId()))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (address.getTitle() != null)
            addr.setTitle(address.getTitle());

        if (address.getFirstName() != null)
            addr.setFirstName(address.getFirstName());

        if (address.getMiddleName() != null)
            addr.setMiddleName(address.getMiddleName());

        if (address.getLastName() != null)
            addr.setLastName(address.getLastName());

        if (address.getUsername() != null)
            addr.setUsername(address.getUsername());

        if (address.getGender() != null)
            addr.setGender(address.getGender());

        if (address.getBirthdate() != null)
            addr.setBirthdate(address.getBirthdate());

        if (address.getCompany() != null)
            addr.setCompany(address.getCompany());

        if (address.getAddress1() != null)
            addr.setAddress1(address.getAddress1());

        if (address.getAddress2() != null)
            addr.setAddress2(address.getAddress2());

        if (address.getAddress3() != null)
            addr.setAddress3(address.getAddress3());

        if (address.getCity() != null)
            addr.setCity(address.getCity());

        if (address.getCounty() != null)
            addr.setCounty(address.getCounty());

        if (address.getState() != null)
            addr.setState(address.getState());

        if (address.getZipCode() != null)
            addr.setZipCode(address.getZipCode());

        if (address.getCountry() != null)
            addr.setCountry(address.getCountry());

        if (address.getEmail() != null)
            addr.setEmail(address.getEmail());

        if (address.getPhone() != null)
            addr.setPhone(address.getPhone());

        if (address.getNote() != null)
            addr.setNote(address.getNote());

        return addressRepository.save(addr);
    }

    public void deleteAddress(Long id, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        addressRepository.delete(user.getAddresses()
                .stream()
                .filter(a -> a.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }

    public void addSharingAddress(Long id, String email, Principal principal) {
        var owner = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        var otherUser = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var address = owner.getAddresses()
                .stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        address.addSharedWithUsers(otherUser.getEmail());
        addressRepository.save(address);
    }

    public void removeSharingAddress(Long id, String email, Principal principal) {
        var owner = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var address = owner.getAddresses()
                .stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        address.removeSharedWithUsers(email);
        addressRepository.save(address);
    }

    public void removeSharingWithMeAddress(Long id, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var address = addressRepository
                .findAll()
                .stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        address.removeSharedWithUsers(user.getEmail());
        addressRepository.save(address);
    }
}
