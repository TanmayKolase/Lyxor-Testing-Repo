package com.example.import.repository;

import com.example.import.entity.ImportRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImportRecordRepository extends JpaRepository<ImportRecord, Long> {
    // No custom queries
    // No job status tracking queries
}

