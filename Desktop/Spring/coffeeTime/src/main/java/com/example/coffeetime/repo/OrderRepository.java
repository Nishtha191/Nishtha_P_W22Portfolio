package com.example.coffeetime.repo;

import com.example.coffeetime.entity.Customer;
import com.example.coffeetime.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {

}
