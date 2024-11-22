package com.ayan.erpbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Domain")
public class Domain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "domain_id")
    private Long id;

    @Column(name = "program", nullable = false)
    private String program;

    @Column(name = "batch", nullable = false)
    private String batch;

    @Column(name = "capacity", nullable = false)
    private int capacity;

    @Column(name = "qualification", nullable = false)
    private String qualification;
}