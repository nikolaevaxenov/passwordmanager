package com.passwordmanager.passwordmanagerserver.config;

import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.stereotype.Component;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.support.DefaultTransactionStatus;

@Component
@Primary
@Qualifier(value = "transactionManager")
public class EncryptionTransactionManager extends JpaTransactionManager {
    private final EntityManager entityManager;

    @Value("${dbsecretkey}")
    private String dbSecretKey;

    public EncryptionTransactionManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    protected void prepareSynchronization(DefaultTransactionStatus status, TransactionDefinition definition) {
        super.prepareSynchronization(status, definition);
        if (status.isNewTransaction()) {
            final String query = "SET SESSION my.dbsecretkey='" + dbSecretKey + "'";
            entityManager.createNativeQuery(query).executeUpdate();
        }
    }
}
