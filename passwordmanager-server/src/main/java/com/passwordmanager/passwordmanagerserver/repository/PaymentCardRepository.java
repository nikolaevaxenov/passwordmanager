package com.passwordmanager.passwordmanagerserver.repository;

import com.passwordmanager.passwordmanagerserver.model.PaymentCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentCardRepository extends JpaRepository<PaymentCard, Long> {
}
