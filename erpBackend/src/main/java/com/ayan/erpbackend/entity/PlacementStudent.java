package com.ayan.erpbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Placement_Student")
public class PlacementStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "placement_id")
    private Placement placement;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @Column(name = "cvApplication", nullable = false)
    private String cvApplication;

    @Column(name = "about", nullable = false)
    private String about;

    @Column(name = "acceptance")
    private boolean acceptance;

    @Column(name = "comments")
    private String comments;

    @Column(name = "date", nullable = false)
    private Date date;

}