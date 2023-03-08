package com.passwordmanager.passwordmanagerserver.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

/**
 * Class for RSA key configuration properties.
 * Sets by rsa.public-key and rsa.private-key properties in application.properties file.
 *
 * @param publicKey RSA public key location
 * @param privateKey RSA private key location
 *
 * @see RSAPublicKey
 * @see RSAPrivateKey
 */
@ConfigurationProperties(prefix = "rsa")
public record RsaKeyProperties(RSAPublicKey publicKey, RSAPrivateKey privateKey) {

}
