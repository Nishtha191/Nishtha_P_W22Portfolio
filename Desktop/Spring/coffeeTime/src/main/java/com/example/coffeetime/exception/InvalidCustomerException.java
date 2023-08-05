package com.example.coffeetime.exception;

public class InvalidCustomerException extends RuntimeException {
    public InvalidCustomerException(String s) {
        super(s);
    }
}
