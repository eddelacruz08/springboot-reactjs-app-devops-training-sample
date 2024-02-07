package com.devops.training.backend.repository;

import com.devops.training.backend.model.Items;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemsRepository extends JpaRepository<Items, Long> {
    void deleteById(Long id);
}

