package com.example.coffeetime.controller;

import com.example.coffeetime.entity.Customer;
import com.example.coffeetime.entity.Order;
import com.example.coffeetime.repo.CustomerRepository;
import com.example.coffeetime.repo.OrderRepository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

public class OrderController {
    private OrderRepository repository;

    public OrderController(OrderRepository repository) {
        this.repository = repository;
    }


    @GetMapping("/order/create")
    public String getCreateOrder(Model model){
        model.addAttribute("pageTitle", "Create a Customer  | Prgra CoffeTime");
        model.addAttribute("customer", new Customer());
        return  "create-order";
    }
    @PostMapping("/order/create")
    public String create(@ModelAttribute Order order, Model model){
        repository.save(order);
        model.addAttribute("orders", repository.findAll());
        return "order";
    }
    @GetMapping("/order/")
    public String viewAllOrder(Model model){
        model.addAttribute("orders", repository.findAll());
        return "order";
    }
}
