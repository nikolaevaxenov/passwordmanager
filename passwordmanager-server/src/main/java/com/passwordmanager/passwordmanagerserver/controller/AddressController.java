package com.passwordmanager.passwordmanagerserver.controller;

import com.passwordmanager.passwordmanagerserver.model.Address;
import com.passwordmanager.passwordmanagerserver.service.AddressService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/address")
public class AddressController {
    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Set<Address> getAllAddresses(Principal principal) {
        return addressService.getAllAddresses(principal);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Address getAddressById(@PathVariable Long id, Principal principal) {
        return addressService.getAddressById(id, principal);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Address createAddress(@RequestBody Address address, Principal principal) {
        return addressService.createAddress(address, principal);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public Address editAddress(@RequestBody Address address, Principal principal) {
        return addressService.editAddress(address, principal);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteAddress(@PathVariable Long id, Principal principal) {
        addressService.deleteAddress(id, principal);
    }
}
