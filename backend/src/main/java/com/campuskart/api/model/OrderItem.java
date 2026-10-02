package com.campuskart.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "order_item")
@Getter
@Setter
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    // copy the name and price at the time of purchase, so old orders don't change later
    private String productName;
    private BigDecimal unitPrice;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
