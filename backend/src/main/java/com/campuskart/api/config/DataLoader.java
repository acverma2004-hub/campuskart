package com.campuskart.api.config;

import com.campuskart.api.model.Category;
import com.campuskart.api.model.Product;
import com.campuskart.api.repository.CategoryRepository;
import com.campuskart.api.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

// fills the database with some sample products on the very first run
@Component
public class DataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public DataLoader(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) {
            return;
        }

        Category stationery = categoryRepository.save(new Category("Stationery"));
        Category books = categoryRepository.save(new Category("Books"));
        Category gadgets = categoryRepository.save(new Category("Gadgets"));
        Category hostel = categoryRepository.save(new Category("Hostel Essentials"));

        add(stationery, "Spiral Notebook (Pack of 6)", "Six 200-page ruled notebooks. Good for a full semester of notes.", 320, 40);
        add(stationery, "Gel Pens (Pack of 10)", "Smooth 0.5 mm blue and black gel pens.", 120, 80);
        add(stationery, "Geometry Box", "Compass, divider, set squares, protractor and a 15 cm scale.", 150, 25);
        add(stationery, "Sticky Notes (5 colours)", "Five pads of 100 sheets each. Handy for marking pages.", 99, 60);

        add(books, "Let Us C", "A beginner-friendly book for learning C programming from scratch.", 450, 30);
        add(books, "Database System Concepts", "Standard textbook for DBMS covering SQL, normalisation and transactions.", 720, 15);
        add(books, "Operating System Concepts", "Covers processes, scheduling, memory management and file systems.", 680, 12);
        add(books, "Cracking the Coding Interview", "Interview questions with solutions, useful for placement preparation.", 599, 20);

        add(gadgets, "Wired Earphones with Mic", "3.5 mm jack earphones, good enough for lectures and calls.", 249, 50);
        add(gadgets, "Power Bank 10000 mAh", "Dual USB output, enough for about two full phone charges.", 899, 18);
        add(gadgets, "Pen Drive 64 GB", "USB 3.0 pen drive for assignments and project files.", 499, 35);
        add(gadgets, "USB Study Lamp", "Bendable LED lamp that runs from a laptop or power bank.", 279, 22);

        add(hostel, "Electric Kettle 1 L", "Steel body kettle with auto switch-off. Boils water in a few minutes.", 649, 14);
        add(hostel, "Steel Water Bottle 750 ml", "Single wall steel bottle, easy to carry in a bag.", 199, 45);
        add(hostel, "Extension Board (4 sockets)", "4 sockets with a master switch and a 1.5 m cord.", 349, 28);
        add(hostel, "Laundry Bag", "Foldable bag with a drawstring for dirty clothes.", 179, 0);
    }

    private void add(Category category, String name, String description, int price, int stock) {
        Product p = new Product();
        p.setCategory(category);
        p.setName(name);
        p.setDescription(description);
        p.setUnitPrice(BigDecimal.valueOf(price));
        p.setUnitsInStock(stock);
        productRepository.save(p);
    }
}
