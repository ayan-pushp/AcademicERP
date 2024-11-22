package com.ayan.erpbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@EnableJpaRepositories("com.ayan.erpbackend.repo")
public class ErpBackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(ErpBackendApplication.class, args);
    }

}
