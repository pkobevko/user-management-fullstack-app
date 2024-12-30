package com.mycompany.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class UserRequestDto {
    @Size(min = 1, max = 255)
    private String firstName;
    @Size(min = 1, max = 255)
    private String lastName;
    @Email
    private String email;

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }
}
