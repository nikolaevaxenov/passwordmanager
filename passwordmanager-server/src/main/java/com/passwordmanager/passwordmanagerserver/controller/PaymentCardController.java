package com.passwordmanager.passwordmanagerserver.controller;

import com.fasterxml.jackson.databind.node.TextNode;
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

    @PostMapping("/shared/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void addSharingPaymentCard(@PathVariable Long id, @RequestBody TextNode email, Principal principal) {
        paymentCardService.addSharingPaymentCard(id, email.asText(), principal);
    }

    @PutMapping("shared/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void removeSharingWithMePaymentCard(@PathVariable Long id, Principal principal) {
        paymentCardService.removeSharingWithMePaymentCard(id, principal);
    }

    @DeleteMapping("/shared/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void removeSharingPaymentCard(@PathVariable Long id, @RequestBody TextNode email, Principal principal) {
        paymentCardService.removeSharingPaymentCard(id, email.asText(), principal);
    }
}
