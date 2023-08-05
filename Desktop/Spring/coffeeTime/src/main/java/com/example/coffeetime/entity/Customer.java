package com.example.coffeetime.entity;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import net.bytebuddy.dynamic.loading.InjectionClassLoader;

import javax.persistence.*;

@Entity
@Table(name = "TABLE_CUSTOMER")
@ApiModel(value = "Customer")
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CUSTOMER_ID")
    private Integer id;
    @Column(nullable = false)
    private String firstName;
    @Column
    private String lastName;
    @Column
    private String phone;
}
