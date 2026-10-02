package com.campuskart.api.controller;

import com.campuskart.api.model.Order;
import com.campuskart.api.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Map<String, Object> placeOrder(@Valid @RequestBody OrderRequest request) {
        Order order = orderService.place(request);
        return Map.of(
                "trackingNumber", order.getTrackingNumber(),
                "totalPrice", order.getTotalPrice()
        );
    }
}
