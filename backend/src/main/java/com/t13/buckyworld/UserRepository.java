package com.t13.buckyworld;
import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    //Refer to UserService.java
    List<User> findTop10ByOrderByPointsDesc();
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    List<User> findAllByOrderByPointsDesc();

    @Query("SELECT id FROM User WHERE username = :username")
    Long findIdByUsername(@Param("username") String username);
}
