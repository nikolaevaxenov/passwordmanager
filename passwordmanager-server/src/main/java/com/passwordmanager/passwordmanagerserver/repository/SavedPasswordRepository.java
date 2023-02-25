package com.passwordmanager.passwordmanagerserver.repository;

import com.passwordmanager.passwordmanagerserver.model.SavedPassword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedPasswordRepository extends JpaRepository<SavedPassword, Long> {
}
