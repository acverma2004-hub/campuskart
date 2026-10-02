package com.campuskart.api.controller;

import com.campuskart.api.model.Product;
import com.campuskart.api.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // GET /api/products                    -> everything
    // GET /api/products?categoryId=2       -> one category
    // GET /api/products?keyword=pen        -> search by name
    @GetMapping
    public List<Product> getProducts(@RequestParam(required = false) Long categoryId,
                                     @RequestParam(required = false) String keyword) {
        if (keyword != null && !keyword.isBlank()) {
            return productRepository.findByNameContainingIgnoreCase(keyword.trim());
        }
        if (categoryId != null) {
            return productRepository.findByCategoryId(categoryId);
        }
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }
}
