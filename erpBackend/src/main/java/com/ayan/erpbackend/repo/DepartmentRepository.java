package com.ayan.erpbackend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ayan.erpbackend.entity.Department;
import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Optional<Department> findById(Long id);
}

