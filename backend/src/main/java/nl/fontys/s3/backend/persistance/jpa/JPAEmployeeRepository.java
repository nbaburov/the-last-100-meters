package nl.fontys.s3.backend.persistance.jpa;

import nl.fontys.s3.backend.persistance.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JPAEmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
    Optional<EmployeeEntity> findByCardBarcode(String cardBarcode);
    Optional<EmployeeEntity> findByEmail(String email);
}
