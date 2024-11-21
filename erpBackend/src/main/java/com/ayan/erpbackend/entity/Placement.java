package com.ayan.erpbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Placement")
public class Placement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "organisation", nullable = false)
    private String organisation;

    @Column(name = "profile", nullable = false)
    private String profile;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "intake", nullable = false)
    private int intake;

    @Column(name = "minimumGrade", nullable = false)
    private double minimumGrade;

    @OneToMany(mappedBy = "placement")
    private List<PlacementStudent> placementStudents;

    @OneToMany(mappedBy = "placement")
    private List<PlacementFilter> placementFilters;

}