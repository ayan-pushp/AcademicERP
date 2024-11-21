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
    @JoinColumn(name = "placement_id")
    private Placement placement;

    @Column(name = "specialisation", nullable = false)
    private String specialisation;

    @Column(name = "domain", nullable = false)
    private String domain;

}