package com.passwordmanager.passwordmanagerserver.repository;

import com.passwordmanager.passwordmanagerserver.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
