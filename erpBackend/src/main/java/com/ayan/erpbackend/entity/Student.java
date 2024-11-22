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
@Table(name = "Student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="roll_number",unique = true,nullable = false)
    private String rollNumber;

    @Column(name = "first_name",nullable = false)
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email",unique = true, nullable = false)
    private String email;

    @Column(name = "cgpa")
    private double cgpa;

    @Column(name = "total_credits")
    private double totalCredits;

    @Column(name = "graduation_year",nullable = false)
    private int graduationYear;

    @ManyToOne
    @JoinColumn(name = "domain", referencedColumnName = "domain_id", nullable = false)
    private Domain domain;

    @ManyToOne
    @JoinColumn(name = "specialisation", referencedColumnName = "specialisation_id", nullable = false)
    private Specialisation specialisation;

    @ManyToOne
    @JoinColumn(name = "placement_id", referencedColumnName = "id")
    private Placement placement;


}
