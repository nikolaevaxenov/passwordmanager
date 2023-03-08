package com.passwordmanager.passwordmanagerserver.config;

import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.stereotype.Component;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.support.DefaultTransactionStatus;

/**
 * Class for setting PostgreSQL enviroment variable for encryption data inside database.
 * Extends JpaTransactionManager, uses EntityManager.
 * Overrides prepareSynchronization method.
 *
 * @see JpaTransactionManager
 * @see EntityManager
 */
@Component
@Primary
@Qualifier(value = "transactionManager")
public class EncryptionTransactionManager extends JpaTransactionManager {
    private final EntityManager entityManager;

    /**
     * Secret key for encrypting data in database. Use dbsecretkey variable in application.properties file
     */
    @Value("${dbsecretkey}")
    private String dbSecretKey;

    /**
     * EncryptionTransactionManager constructor
     *
     * @param entityManager EntityManager instance
     *
     * @see EntityManager
     */
    public EncryptionTransactionManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    /**
     * Override of JpaTransactionManager's prepareSynchronization method.
     * Starts preparing for synchronization,
     * if it is new transaction execute SQL query for setting new environment variable with encryption secret key.
     *
     * @param status Transaction's status
     * @param definition Transaction's properties
     *
     * @see DefaultTransactionStatus
     * @see TransactionDefinition
     */
    @Override
    protected void prepareSynchronization(DefaultTransactionStatus status, TransactionDefinition definition) {
        super.prepareSynchronization(status, definition);
        if (status.isNewTransaction()) {
            final String query = "SET SESSION my.dbsecretkey='" + dbSecretKey + "'";
            entityManager.createNativeQuery(query).executeUpdate();
        }
    }
}
