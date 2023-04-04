package com.passwordmanager.passwordmanagerserver.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailSender {
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    public EmailSender(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendConfirmationEmail(String email, String token) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
        String emailText = """
                <h1>Verify your e-mail to finish signing up for PassStorage</h1>
                <p>Thank you for choosing PassStorage</p>
                <p>Please confirm that\s""" + email + """
                 is your e-mail address by clicking on the link below within 24 hours.</p>
                <a href="http://localhost:8080/api/v1/authorization/confirmEmail/""" + token + "\">VERIFY</a>";

        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setFrom(senderEmail);
        mimeMessageHelper.setSubject("Confirm your email address");
        mimeMessageHelper.setText(emailText, true);

        javaMailSender.send(mimeMessage);
    }
}
