package com.example.coffeetime.controller;

import com.example.coffeetime.entity.Customer;
import com.example.coffeetime.repo.CustomerRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class CustomerController {
    private CustomerRepository repository;

    public CustomerController(CustomerRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/customer/create")
    public String getCreateCustomer(Model model){
        model.addAttribute("pageTitle", "Create a Customer  | Prgra CoffeTime");
        model.addAttribute("customer", new Customer());
        return  "create-customer";
    }
    @PostMapping("/customer/create")
    public String create(@ModelAttribute Customer customer, Model model){
        repository.save(customer);
        model.addAttribute("customers", repository.findAll());
        return "customer";
    }
    @GetMapping("/customer/")
    public String viewAllCustomer(Model model){
        model.addAttribute("customers", repository.findAll());
        return "customer";
    }


}
