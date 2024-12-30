package com.mycompany.controller;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mycompany.dto.request.UserRequestDto;
import com.mycompany.dto.response.UserResponseDto;
import com.mycompany.model.User;
import com.mycompany.service.UserService;
import com.mycompany.service.mapper.RequestDtoMapper;
import com.mycompany.service.mapper.ResponseDtoMapper;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final RequestDtoMapper<UserRequestDto, User> userRequestDtoMapper;
    private final ResponseDtoMapper<UserResponseDto, User> userResponseDtoMapper;

    @Autowired
    public UserController(UserService userService,
            RequestDtoMapper<UserRequestDto, User> userRequestDtoMapper,
            ResponseDtoMapper<UserResponseDto, User> userResponseDtoMapper) {
        this.userService = userService;
        this.userRequestDtoMapper = userRequestDtoMapper;
        this.userResponseDtoMapper = userResponseDtoMapper;
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAll() {
        List<UserResponseDto> responseDtoList =
                userService.findAll().stream().map(userResponseDtoMapper::mapToDto).toList();
        return new ResponseEntity<List<UserResponseDto>>(responseDtoList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> add(@RequestBody @Valid UserRequestDto requestDto) {
        User user = userRequestDtoMapper.mapToModel(requestDto);
        userService.save(user);
        return new ResponseEntity<UserResponseDto>(userResponseDtoMapper.mapToDto(user),
                HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> update(@PathVariable Long id,
            @RequestBody @Valid UserRequestDto requestDto) {
        User user = userRequestDtoMapper.mapToModel(requestDto);
        user.setId(id);
        userService.update(user);
        return new ResponseEntity<UserResponseDto>(userResponseDtoMapper.mapToDto(user),
                HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        userService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
