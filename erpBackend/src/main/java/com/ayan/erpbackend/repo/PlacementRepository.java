package com.ayan.erpbackend.repo;

import com.ayan.erpbackend.dto.PlacementOfferResponse;
import com.ayan.erpbackend.entity.Placement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlacementRepository extends JpaRepository<Placement, Long> {


    @Query("SELECT new com.ayan.erpbackend.dto.PlacementOfferResponse("
            +"o.name, " +
            "o.address, " +
            "p.id,"+
            "p.profile, " +
            "p.description, " +
            "p.intake, " +
            "p.minimumGrade) " +
            "FROM Organisation o " +
            "JOIN Placement p ON o.id = p.organisation.id " +
            "ORDER BY o.name")
    List<PlacementOfferResponse> findOrganisationOffers();

}