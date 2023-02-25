package com.passwordmanager.passwordmanagerserver.repository;

import com.passwordmanager.passwordmanagerserver.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
