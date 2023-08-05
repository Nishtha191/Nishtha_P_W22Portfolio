package com.example.coffeetime.rest;

import com.example.coffeetime.entity.Customer;
import com.example.coffeetime.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerApi {
    private final CustomerService service;


    @GetMapping("/customer")
    public List<Customer> getAll(
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestHeader(value = "X_SUPPLIER", required=false)String supplier
    ){
        System.out.println(supplier);
        return service.getAll(Optional.ofNullable(lastName));
    }
    @GetMapping("/customer/{id}")
    public Optional<Customer> getCustomer(@PathVariable int id){
        return service.getById(id);
    }
    @PostMapping("/customer")
    public Customer create(@RequestBody Customer customer){
        return this.service.createCustomer(customer);
    }

    @PutMapping("/customer/{id}")
    public Customer update(@RequestBody Customer customer){
        return this.service.updateCustomer(customer);
    }

    @DeleteMapping("/customer/{id}")
    public Customer delete(@PathVariable int id){
        return this.service.deleteCustomer(id);
    }
}
