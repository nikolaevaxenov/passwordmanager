package com.passwordmanager.passwordmanagerserver.config;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import com.passwordmanager.passwordmanagerserver.service.JpaUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Main application security configuration class
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final RsaKeyProperties rsaKeyProperties;
    private final JpaUserDetailsService jpaUserDetailsService;

    /**
     * SecurityConfig constructor
     * @param rsaKeyProperties ConfigurationProperties class for setting key files paths
     * @param jpaUserDetailsService Implementation of UserDetailsService for JPA access.
     *
     * @see RsaKeyProperties
     * @see JpaUserDetailsService
     */
    public SecurityConfig(RsaKeyProperties rsaKeyProperties, JpaUserDetailsService jpaUserDetailsService) {
        this.rsaKeyProperties = rsaKeyProperties;
        this.jpaUserDetailsService = jpaUserDetailsService;
    }

    /**
     * Method that sets UserDetailsService and PasswordEncoder
     *
     * @param jpaUserDetailsService Implementation of UserDetailsService for JPA access.
     * @return AuthenticationManager instance for user authentication
     *
     * @see JpaUserDetailsService
     * @see AuthenticationManager
     */
    @Bean
    public AuthenticationManager authenticationManager(JpaUserDetailsService jpaUserDetailsService) {
        var authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(jpaUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return new ProviderManager(authProvider);
    }

    /**
     * SecurityFilterChain configuration. Sets cors, csrf, authorizeHttpRequests, userDetailsService, oauth2ResourceServer
     *
     * @param http HttpSecurity instance
     * @return SecurityFilterChain configuration
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/authorization/signin").permitAll()
                        .requestMatchers("/api/v1/authorization/signup").permitAll()
                        .anyRequest().authenticated())
                .userDetailsService(jpaUserDetailsService)
                .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

    /**
     * Instantiate new BCryptPasswordEncoder
     * @return BCryptPasswordEncoder
     */
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Instantiate new JwtDecoder
     * @return JwtDecoder
     *
     * @see NimbusJwtDecoder
     */
    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(rsaKeyProperties.publicKey()).build();
    }

    /**
     * Instantiate new JwtEncoder
     * @return JwtEncoder
     *
     * @see NimbusJwtEncoder
     */
    @Bean
    JwtEncoder jwtEncoder() {
        JWK jwk = new RSAKey.Builder(rsaKeyProperties.publicKey()).privateKey(rsaKeyProperties.privateKey()).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));

        return new NimbusJwtEncoder(jwks);
    }

    /**
     * Sets allowed cors origins, methods, and headers.
     *
     * @return CorsConfigurationSource
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Content-Type"));

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);

        return urlBasedCorsConfigurationSource;
    }
}
