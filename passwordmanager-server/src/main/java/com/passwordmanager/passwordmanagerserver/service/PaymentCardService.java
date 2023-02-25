package com.passwordmanager.passwordmanagerserver.service;

import com.passwordmanager.passwordmanagerserver.model.PaymentCard;
import com.passwordmanager.passwordmanagerserver.repository.PaymentCardRepository;
import com.passwordmanager.passwordmanagerserver.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Set;

@Service
public class PaymentCardService {
    private final UserRepository userRepository;

    private final PaymentCardRepository paymentCardRepository;

    public PaymentCardService(UserRepository userRepository, PaymentCardRepository paymentCardRepository) {
        this.userRepository = userRepository;
        this.paymentCardRepository = paymentCardRepository;
    }

    public Set<PaymentCard> getAllPaymentCards(Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return user.getPaymentCards();
    }

    public PaymentCard getPaymentCardById(Long id, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return user.getPaymentCards()
                .stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public PaymentCard createPaymentCard(PaymentCard paymentCard, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        paymentCard.setUser(user);

        return paymentCardRepository.save(paymentCard);
    }

    public PaymentCard editPaymentCard(PaymentCard paymentCard, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var pc = user.getPaymentCards()
                .stream()
                .filter(p -> p.getId().equals(paymentCard.getId()))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (paymentCard.getTitle() != null)
            pc.setTitle(paymentCard.getTitle());

        if (paymentCard.getCardBrand() != null)
            pc.setCardBrand(paymentCard.getCardBrand());

        if (paymentCard.getNumber() != null)
            pc.setNumber(paymentCard.getNumber());

        if (paymentCard.getSecurityCode() != null)
            pc.setSecurityCode(paymentCard.getSecurityCode());

        if (paymentCard.getExpirationDate() != null)
            pc.setExpirationDate(paymentCard.getExpirationDate());

        if (paymentCard.getNote() != null)
            pc.setNote(paymentCard.getNote());

        return paymentCardRepository.save(pc);
    }

    public void deletePaymentCard(Long id, Principal principal) {
        var user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        paymentCardRepository.delete(user.getPaymentCards()
                .stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }
}
