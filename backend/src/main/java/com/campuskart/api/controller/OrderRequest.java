package com.campuskart.api.controller;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

// what the Angular checkout page sends us
@Getter
@Setter
public class OrderRequest {

    @NotBlank
    private String customerName;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String phone;

    @NotBlank
    private String address;

    @NotBlank
    private String city;

    @NotBlank
    private String pincode;

    @NotEmpty
    private List<Line> items;

    @Getter
    @Setter
    public static class Line {
        private Long productId;
        private int quantity;
    }
}
