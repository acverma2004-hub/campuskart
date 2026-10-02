package com.campuskart.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "product")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 1000)
    private String description;

    private BigDecimal unitPrice;

    // optional, the UI shows a plain placeholder when this is empty
    private String imageUrl;

    private int unitsInStock;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
