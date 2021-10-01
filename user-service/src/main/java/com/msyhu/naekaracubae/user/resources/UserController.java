package com.msyhu.naekaracubae.user.resources;

import com.msyhu.naekaracubae.user.models.User;
import com.msyhu.naekaracubae.user.repositories.UserRepository;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@RestController
@ApiOperation("상태별 User 조회")
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> findAll() {
        log.info("Find All");

        Iterable<User> all = userRepository.findAll();
        return StreamSupport.stream(all.spliterator(), false).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable("id") Long id) {
        log.info("Find by Id " + id);

        Optional<User> UserInfo = userRepository.findById(id);
        User findUser = UserInfo.orElseThrow(() -> new NoSuchElementException("There is not any resource by id: " + id));

        return findUser;
    }

    @PostMapping
    public User saveUser(@RequestBody User user) {
        log.info("Save User " + user);

        User savedUser = userRepository.save(user);
        return savedUser;
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        log.info("Delete by Id " + id);

        userRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable("id") Long id, @RequestBody User user) {
        log.info("Update User id " + id + " user " + user);

        Optional<User> userInfo = userRepository.findById(id);
        User findUser = userInfo.orElseThrow(() -> new NoSuchElementException("There is not any resource by id: " + id));

        if (findUser.getEmail() != null) {
            findUser.setEmail(user.getEmail());
        }

        if (findUser.getName() != null) {
            findUser.setName(user.getName());
        }

        return userRepository.save(findUser);
    }
}
