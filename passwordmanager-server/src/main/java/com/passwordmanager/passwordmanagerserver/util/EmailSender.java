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

    @Value("${links.backend}")
    private String backendLink;

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
                <a href=\"""" + backendLink + "api/v1/authorization/confirmemail/" + token + "\">VERIFY</a>";

        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setFrom(senderEmail);
        mimeMessageHelper.setSubject("Confirm your email address | PassStorage");
        mimeMessageHelper.setText(emailText, true);

        javaMailSender.send(mimeMessage);
    }

    public void sendNewEmailConfirmation(String email, String token) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
        String emailText = """
                <h1>Confirm your new email address for use PassStorage</h1>
                <p>Please confirm that\s""" + email + """
                 is your e-mail address by clicking on the link below within 24 hours.</p>
                <a href=\"""" + backendLink + "api/v1/authorization/confirmnewemail/" + token + "\">VERIFY</a>";

        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setFrom(senderEmail);
        mimeMessageHelper.setSubject("Confirm your new email address | PassStorage");
        mimeMessageHelper.setText(emailText, true);

        javaMailSender.send(mimeMessage);
    }

    public void sendForgotPasswordConfirmation(String email, String token) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
        String emailText = """
                <h1>Forgot your password?</h1>
                <p>Change your password by clicking on the link below within 24 hours.</p>
                <a href=\"""" + backendLink + "api/v1/authorization/confirmforgotpassword/" + token + "\">VERIFY</a>";

        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setFrom(senderEmail);
        mimeMessageHelper.setSubject("Change your password | PassStorage");
        mimeMessageHelper.setText(emailText, true);

        javaMailSender.send(mimeMessage);
    }
}
