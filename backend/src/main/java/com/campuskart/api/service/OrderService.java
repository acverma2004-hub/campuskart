package com.campuskart.api.service;

import com.campuskart.api.controller.OrderRequest;
import com.campuskart.api.model.Order;
import com.campuskart.api.model.OrderItem;
import com.campuskart.api.model.Product;
import com.campuskart.api.repository.OrderRepository;
import com.campuskart.api.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public Order place(OrderRequest request) {
        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setEmail(request.getEmail());
        order.setPhone(request.getPhone());
        order.setAddress(request.getAddress());
        order.setCity(request.getCity());
        order.setPincode(request.getPincode());
        order.setCreatedAt(LocalDateTime.now());
        order.setTrackingNumber("CK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        BigDecimal total = BigDecimal.ZERO;
        int totalQuantity = 0;

        for (OrderRequest.Line line : request.getItems()) {
            if (line.getQuantity() < 1) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantity must be at least 1");
            }

            // always take the price from the database, never trust the browser for it
            Product product = productRepository.findById(line.getProductId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "A product in your cart no longer exists"));

            if (product.getUnitsInStock() < line.getQuantity()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Only " + product.getUnitsInStock() + " left of " + product.getName());
            }
            product.setUnitsInStock(product.getUnitsInStock() - line.getQuantity());

            OrderItem item = new OrderItem();
            item.setProductId(product.getId());
            item.setProductName(product.getName());
            item.setUnitPrice(product.getUnitPrice());
            item.setQuantity(line.getQuantity());
            order.addItem(item);

            total = total.add(product.getUnitPrice().multiply(BigDecimal.valueOf(line.getQuantity())));
            totalQuantity += line.getQuantity();
        }

        order.setTotalPrice(total);
        order.setTotalQuantity(totalQuantity);
        return orderRepository.save(order);
    }
}
