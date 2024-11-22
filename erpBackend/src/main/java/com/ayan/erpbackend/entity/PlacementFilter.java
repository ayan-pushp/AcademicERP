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
@Table(name = "Placement_Filter")
public class PlacementFilter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "placement_id",nullable=false)
    private Placement placement;

    @ManyToOne
    @JoinColumn(name = "domain", referencedColumnName = "domain_id", nullable = false)
    private Domain domain;

    @ManyToOne
    @JoinColumn(name = "specialisation", referencedColumnName = "specialisation_id", nullable = false)
    private Specialisation specialisation;

}