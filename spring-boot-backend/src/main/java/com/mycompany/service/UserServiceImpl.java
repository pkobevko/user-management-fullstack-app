package com.mycompany.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mycompany.exception.EmailAlreadyTakenException;
import com.mycompany.model.User;
import com.mycompany.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyTakenException();
        }
        return userRepository.save(user);
    }

    @Override
    public void deleteById(long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User update(User user) {
        userRepository.findByEmail(user.getEmail()).ifPresent(userWithSameEmail -> {
            if (!userWithSameEmail.getId().equals(user.getId())) {
                throw new EmailAlreadyTakenException();
            }
        });
        return userRepository.save(user);
    }
}
