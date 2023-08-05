package com.example.coffeetime.exception;

public class InvalidOrderException extends RuntimeException {
    public InvalidOrderException(String s) {
        super(s);
    }
}
