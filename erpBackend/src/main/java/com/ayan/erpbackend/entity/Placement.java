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

    @ManyToOne
    @JoinColumn(name = "organisation_id", nullable = false)
    private Organisation organisation;

    @Column(name = "profile", nullable = false)
    private String profile;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "intake", nullable = false)
    private int intake;

    @Column(name = "minimum_grade", nullable = false)
    private double minimumGrade;

    @OneToMany(mappedBy = "placement")
    private List<PlacementFilter> placementFilters;


}