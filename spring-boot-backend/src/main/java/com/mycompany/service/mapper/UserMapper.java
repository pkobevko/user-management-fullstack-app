package com.mycompany.service.mapper;

import org.springframework.stereotype.Component;
import com.mycompany.dto.request.UserRequestDto;
import com.mycompany.dto.response.UserResponseDto;
import com.mycompany.model.User;

@Component
public class UserMapper implements RequestDtoMapper<UserRequestDto, User>,
        ResponseDtoMapper<UserResponseDto, User> {
    @Override
    public UserResponseDto mapToDto(User user) {
        UserResponseDto responseDto = new UserResponseDto();
        responseDto.setId(user.getId());
        responseDto.setFirstName(user.getFirstName());
        responseDto.setLastName(user.getLastName());
        responseDto.setEmail(user.getEmail());
        return responseDto;
    }

    @Override
    public User mapToModel(UserRequestDto dto) {
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        return user;
    }
}
