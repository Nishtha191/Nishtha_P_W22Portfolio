package com.example.coffeetime.rest;

import com.example.coffeetime.entity.Customer;
import com.example.coffeetime.entity.Order;
import com.example.coffeetime.service.CustomerService;
import com.example.coffeetime.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class OrderApi {
    private final OrderService service;

    @GetMapping("/order")
    public List<Order> getAll(){
        return service.getAll();
    }
    @GetMapping("/order/{id}")
    public Optional<Order> getOrder(@PathVariable int id){
        return service.getById(id);
    }

    @PostMapping("/order")
    public Order create(@RequestBody Order order){
        return this.service.createOrder(order);
    }

    @PutMapping("/order/{id}")
    public Order update(@RequestBody Order order){
        return this.service.updateOrder(order);
    }

    @DeleteMapping("/order/{id}")
    public Order delete(@PathVariable int id){
        return this.service.deleteOrder(id);
    }
}
