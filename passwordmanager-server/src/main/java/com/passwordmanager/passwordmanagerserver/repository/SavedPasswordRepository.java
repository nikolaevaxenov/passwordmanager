package com.passwordmanager.passwordmanagerserver.repository;

import com.passwordmanager.passwordmanagerserver.model.SavedPassword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SavedPasswordRepository extends JpaRepository<SavedPassword, Long> {
}
