package com.mycompany.exception;

public class EmailAlreadyTakenException extends RuntimeException {
    public EmailAlreadyTakenException() {
        super("The provided email is already taken");
    }
}
