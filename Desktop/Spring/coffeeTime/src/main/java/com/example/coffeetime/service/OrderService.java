package com.example.coffeetime.service;

import com.example.coffeetime.entity.Customer;
import com.example.coffeetime.entity.Order;
import com.example.coffeetime.exception.*;
import com.example.coffeetime.repo.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository repository;

    public Order createOrder(Order order){
        if(order.getId() == null || order.getCustomer().getId() == null){
            throw new InvalidOrderException("Customer is not exists!");
        }
        return this.repository.save(order);
    }

    public Order updateOrder(Order order){
        if(order.getId() == null || order.getId()<=0){
            throw new InvalidUpdateException("Invalid Order ID");
        }
        Optional<Order> optional = repository.findById(order.getId());
        Order ord = optional.orElseThrow(()-> new InvalidUpdateException("Invalid Customer ID"));

        if(order.getId() == null || order.getCustomer().getId() == null){
            throw new InvalidCustomerException("Customer first name can't null or blank");
        }
        return this.repository.save(order);
    }

    public Order deleteOrder(int id){
        if(id <= 0 || !repository.findById(id).isPresent()){
            throw new InvalidDeleteException("Invalid  ID");
        }
        Optional<Order> deleteEntity = this.repository.findById(id);
        Order ord = deleteEntity.orElseThrow(()-> new InvalidDeleteException("Invalid Customer ID"));
        this.repository.deleteById(id);

        return ord;
    }
    public List<Order> getAll(){
        return this.repository.findAll();
    }

    public Optional<Order> getById(int id){
        return this.repository.findById(id);
    }
}
