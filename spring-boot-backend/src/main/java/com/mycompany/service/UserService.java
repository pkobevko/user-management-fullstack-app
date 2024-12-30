package com.mycompany.service;

import java.util.List;
import org.springframework.lang.NonNull;
import com.mycompany.model.User;

public interface UserService {
    public List<User> findAll();

    public User save(@NonNull User user);

    public void deleteById(long id);

    public User update(User user);
}
