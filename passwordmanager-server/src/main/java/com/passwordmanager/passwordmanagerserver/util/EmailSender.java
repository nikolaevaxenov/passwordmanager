package com.passwordmanager.passwordmanagerserver.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.util.Objects;

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

    public void sendConfirmationEmail(String email, String token, String locale) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
        if (Objects.equals(locale, "ru")) {
            mimeMessageHelper.setText("""
                <h1>Подтвердите вашу почту для завершения регистрации на PassStorage</h1>
                <p>Спасибо что выбрали PassStorage</p>
                <p>Пожалуйста подтвердите, что\s""" + email + """
                 ваш адрес электронной почты нажав на ссылку ниже в течении 24 часов.</p>
                <a href=\"""" + backendLink + "api/v1/authorization/confirmemail/" + token + "\">ПОДТВЕРДИТЬ</a>",
                    true);
            mimeMessageHelper.setSubject("Подтвердите вашу электронную почту | PassStorage");
        } else {
            mimeMessageHelper.setText("""
                <h1>Verify your e-mail to finish signing up for PassStorage</h1>
                <p>Thank you for choosing PassStorage</p>
                <p>Please confirm that\s""" + email + """
                 is your e-mail address by clicking on the link below within 24 hours.</p>
                <a href=\"""" + backendLink + "api/v1/authorization/confirmemail/" + token + "\">VERIFY</a>",
                    true);
            mimeMessageHelper.setSubject("Confirm your email address | PassStorage");
        }

        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setFrom(senderEmail);

        javaMailSender.send(mimeMessage);
    }

    public void sendNewEmailConfirmation(String email, String token, String locale) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
        if (Objects.equals(locale, "ru")) {
            mimeMessageHelper.setText("""
                <h1>Подтвердите вашу новую электронную почту для продолжения использования PassStorage</h1>
                <p>Пожалуйста подтвердите, что\s""" + email + """
                 ваш адрес электронной почты нажав на ссылку ниже в течении 24 часов.</p>
                <a href=\"""" + backendLink + "api/v1/authorization/confirmnewemail/" + token + "\">ПОДТВЕРДИТЬ</a>",
                    true);
            mimeMessageHelper.setSubject("Подтвердите вашу новую электронную почту | PassStorage");
        } else {
            mimeMessageHelper.setText("""
                <h1>Confirm your new email address for use PassStorage</h1>
                <p>Please confirm that\s""" + email + """
                 is your e-mail address by clicking on the link below within 24 hours.</p>
                <a href=\"""" + backendLink + "api/v1/authorization/confirmnewemail/" + token + "\">VERIFY</a>",
                    true);
            mimeMessageHelper.setSubject("Confirm your new email address | PassStorage");
        }
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setFrom(senderEmail);

        javaMailSender.send(mimeMessage);
    }

    public void sendForgotPasswordConfirmation(String email, String token, String locale) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
        if (Objects.equals(locale, "ru")) {
            mimeMessageHelper.setText("""
                <h1>Забыли пароль?</h1>
                <p>Измените ваш пароль нажав на ссылку ниже в течении 24 часов.</p>
                <a href=\"""" + backendLink + "api/v1/authorization/confirmforgotpassword/" + token + "\">ПОДТВЕРДИТЬ</a>",
                    true);
            mimeMessageHelper.setSubject("Изменение пароля | PassStorage");
        } else {
            mimeMessageHelper.setText("""
                <h1>Forgot your password?</h1>
                <p>Change your password by clicking on the link below within 24 hours.</p>
                <a href=\"""" + backendLink + "api/v1/authorization/confirmforgotpassword/" + token + "\">VERIFY</a>",
                    true);
            mimeMessageHelper.setSubject("Change your password | PassStorage");
        }
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setFrom(senderEmail);

        javaMailSender.send(mimeMessage);
    }
}
