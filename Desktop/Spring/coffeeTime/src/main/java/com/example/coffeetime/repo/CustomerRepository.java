package com.example.coffeetime.repo;

import com.example.coffeetime.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query("SELECT c from Customer c WHERE upper(c.lastName) = upper( :lastName)")

    List<Customer> findAllByLastName(@Param("lastName") String lastName);
}


