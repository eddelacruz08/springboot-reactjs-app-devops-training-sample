package com.devops.training.backend.controller;

import com.devops.training.backend.model.Items;
import com.devops.training.backend.repository.ItemsRepository;
import com.devops.training.backend.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/items")
public class ItemsController {
    @Autowired
    private final ItemsRepository itemsRepository;

    public ItemsController(ItemsRepository itemsRepository) {
        this.itemsRepository = itemsRepository;
    }

    @GetMapping
    public List<Items> getItems() {
        return itemsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Items getItems(@PathVariable Long id) {
        return itemsRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createItems(@RequestBody Items items) throws URISyntaxException {
        Items savedItems = itemsRepository.save(items);
        if (savedItems != null) {
            ApiResponse response = new ApiResponse(200, "Item created successfully", savedItems);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ApiResponse response = new ApiResponse(404, "Item not found", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity updateItems(@PathVariable Long id, @RequestBody Items items) {
        Items currentItems = itemsRepository.findById(id).orElseThrow(RuntimeException::new);

        currentItems.setName(!Objects.equals(items.getName(), "") ? items.getName() : currentItems.getName());
        currentItems.setCategory(!Objects.equals(items.getCategory(), "") ? items.getCategory() : currentItems.getCategory());
        currentItems.setQuantity(items.getQuantity() != 0 ? items.getQuantity() : currentItems.getQuantity());
        currentItems.setDescription(!Objects.equals(items.getDescription(), "") ? items.getDescription() : currentItems.getDescription());
        currentItems.setReferenceNo(!Objects.equals(items.getReferenceNo(), "") ? items.getReferenceNo() : currentItems.getReferenceNo());

        Items updatedItems = itemsRepository.save(currentItems);
        if (updatedItems != null) {
            ApiResponse response = new ApiResponse(200, "Item updated successfully", currentItems);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ApiResponse response = new ApiResponse(404, "Item not found", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteItems(@PathVariable Long id) {
        Items currentItems = itemsRepository.findById(id).orElseThrow(RuntimeException::new);
        itemsRepository.deleteById(id);
        if (currentItems != null) {
            ApiResponse response = new ApiResponse(200, "Item deleted successfully", currentItems);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            ApiResponse response = new ApiResponse(404, "Item not found", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}
