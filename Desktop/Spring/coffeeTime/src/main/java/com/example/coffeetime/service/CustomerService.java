package com.example.coffeetime.service;

import com.example.coffeetime.entity.Customer;
import com.example.coffeetime.exception.InvalidCustomerException;
import com.example.coffeetime.exception.InvalidUpdateCustomerException;
import com.example.coffeetime.repo.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository repository;

    public Customer createCustomer(Customer customer){
        if(customer.getFirstName() == null || customer.getFirstName().isEmpty()){
            throw new InvalidCustomerException("Customer first name can't null or blank");
        }
        return this.repository.save(customer);
    }

    public Customer updateCustomer(Customer customer){
        if(customer.getId() == null | customer.getId()<=0){
            throw new InvalidUpdateCustomerException("Invalid Customer ID");
        }
        Optional<Customer> optional = repository.findById(customer.getId());
        Customer cust = optional.orElseThrow(()-> new InvalidUpdateCustomerException("Invalid Customer ID"));

        if(customer.getFirstName() == null || customer.getFirstName().isEmpty()){
            throw new InvalidCustomerException("Customer first name can't null or blank");
        }
        return this.repository.save(customer);
    }

    public Customer deleteCustomer(int id){
        if(id <= 0 || !repository.findById(id).isPresent()){
            throw new InvalidUpdateCustomerException("Invalid Customer ID");
        }
        Optional<Customer> deleteEntity = this.repository.findById(id);
        Customer cust = deleteEntity.orElseThrow(() -> new InvalidUpdateCustomerException("Invalid Delete"));
        this.repository.deleteById(id);

        return cust;
    }


    public List<Customer> getAll(Optional<String> lastName){
        if(lastName.isPresent()){
            return this.repository.findAllByLastName(lastName.get());
        }
        return this.repository.findAll();
    }

    public Optional<Customer> getById(int id){
        return this.repository.findById(id);
    }



}
