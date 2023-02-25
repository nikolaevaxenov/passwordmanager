package com.passwordmanager.passwordmanagerserver.controller;

import com.passwordmanager.passwordmanagerserver.model.PaymentCard;
import com.passwordmanager.passwordmanagerserver.service.PaymentCardService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/paymentcard")
public class PaymentCardController {
    private final PaymentCardService paymentCardService;

    public PaymentCardController(PaymentCardService paymentCardService) {
        this.paymentCardService = paymentCardService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Set<PaymentCard> getAllPaymentCards(Principal principal) {
        return paymentCardService.getAllPaymentCards(principal);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public PaymentCard getPaymentCardById(@PathVariable Long id, Principal principal) {
        return paymentCardService.getPaymentCardById(id, principal);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PaymentCard createPaymentCard(@RequestBody PaymentCard paymentCard, Principal principal) {
        return paymentCardService.createPaymentCard(paymentCard, principal);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public PaymentCard editPaymentCard(@RequestBody PaymentCard paymentCard, Principal principal) {
        return paymentCardService.editPaymentCard(paymentCard, principal);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deletePaymentCard(@PathVariable Long id, Principal principal) {
        paymentCardService.deletePaymentCard(id, principal);
    }
}
