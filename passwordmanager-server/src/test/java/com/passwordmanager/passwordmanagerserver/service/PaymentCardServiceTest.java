package com.passwordmanager.passwordmanagerserver.service;

import com.passwordmanager.passwordmanagerserver.model.PaymentCard;
import com.passwordmanager.passwordmanagerserver.model.SavedPassword;
import com.passwordmanager.passwordmanagerserver.model.User;
import com.passwordmanager.passwordmanagerserver.repository.PaymentCardRepository;
import com.passwordmanager.passwordmanagerserver.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PaymentCardServiceTest {
    @Mock private PaymentCardRepository paymentCardRepository;
    @Mock private UserRepository userRepository;
    @Mock private Principal principal;

    @InjectMocks private PaymentCardService paymentCardService;

    @Test
    void getAllPaymentCards() {
        var requestUsername = "user2@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var user2 = new User("user2@mail.com", "qwerty", "ROLE_USER");

        var paymentCard1 = new PaymentCard("First card", "1234 5678 8901 2345", "123", new Date());
        paymentCard1.setId(1L);
        paymentCard1.setUser(user1);
        paymentCard1.setSharedWithUsers(Set.of("user2@mail.com"));

        var paymentCard2 = new PaymentCard("Second card", "1234 5678 8901 2345", "123", new Date());
        paymentCard2.setId(2L);
        paymentCard2.setUser(user2);
        paymentCard2.setSharedWithUsers(Set.of());

        user1.setPaymentCards(Set.of(paymentCard1));
        user2.setPaymentCards(Set.of(paymentCard2));

        when(principal.getName()).thenReturn(requestUsername);
        when(paymentCardRepository.findAll()).thenReturn(List.of(paymentCard1, paymentCard2));
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user2));

        var result = paymentCardService.getAllPaymentCards(principal);

        assertThat(result).isEqualTo(Set.of(paymentCard1, paymentCard2));
    }

    @Test
    void getPaymentCardById() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var paymentCard1 = new PaymentCard("First card", "1234 5678 8901 2345", "123", new Date());
        paymentCard1.setId(1L);
        paymentCard1.setUser(user1);

        user1.setPaymentCards(Set.of(paymentCard1));

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));

        var result = paymentCardService.getPaymentCardById(1L, principal);

        assertThat(result).isEqualTo(paymentCard1);
    }

    @Test
    void createPaymentCard() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var paymentCard1 = new PaymentCard("First card", "1234 5678 8901 2345", "123", new Date());
        paymentCard1.setId(1L);
        paymentCard1.setUser(user1);

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));
        when(paymentCardRepository.save(paymentCard1)).thenReturn(paymentCard1);

        var result = paymentCardService.createPaymentCard(paymentCard1, principal);

        assertThat(result).isEqualTo(paymentCard1);
    }

    @Test
    void editPaymentCard() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var paymentCard1 = new PaymentCard("First card", "1234 5678 8901 2345", "123", new Date());
        paymentCard1.setId(1L);
        paymentCard1.setUser(user1);

        user1.setPaymentCards(Set.of(paymentCard1));

        var paymentCard1edited = new PaymentCard("Edited card", "1234 5678 8901 2345", "123", new Date());
        paymentCard1edited.setId(1L);
        paymentCard1edited.setUser(user1);

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));
        when(paymentCardRepository.save(paymentCard1edited)).thenReturn(paymentCard1edited);

        var result = paymentCardService.editPaymentCard(paymentCard1edited, principal);

        assertThat(result).isEqualTo(paymentCard1edited);
    }

    @Test
    void deletePaymentCard() {
        var requestUsername = "user1@mail.com";

        var user1 = new User("user1@mail.com", "qwerty", "ROLE_USER");

        var paymentCard1 = new PaymentCard("First card", "1234 5678 8901 2345", "123", new Date());
        paymentCard1.setId(1L);
        paymentCard1.setUser(user1);
        paymentCard1.setSharedWithUsers(Set.of());

        var paymentCard2 = new PaymentCard("Second card", "1234 5678 8901 2345", "123", new Date());
        paymentCard2.setId(2L);
        paymentCard2.setUser(user1);
        paymentCard2.setSharedWithUsers(Set.of());

        user1.setPaymentCards(Set.of(paymentCard1, paymentCard2));

        when(principal.getName()).thenReturn(requestUsername);
        when(userRepository.findByEmail(requestUsername)).thenReturn(Optional.of(user1));

        doNothing().when(paymentCardRepository).delete(paymentCard2);

        paymentCardService.deletePaymentCard(paymentCard2.getId(), principal);
        verify(paymentCardRepository, times(1)).delete(paymentCard2);
        verifyNoMoreInteractions(paymentCardRepository);
    }
}