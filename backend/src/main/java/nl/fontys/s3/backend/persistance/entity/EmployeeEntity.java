package nl.fontys.s3.backend.persistance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="employees")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeEntity {
    @Id
    @Column(name="empl_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Length(min = 1, max = 50)
    @Column(name = "firstName")
    private String firstName;

    @NotBlank
    @Length(min = 1, max = 50)
    @Column(name = "lastName")
    private String lastName;

    @NotBlank
    @Length(min = 1, max = 50)
    @Column(name = "email")
    private String email;

    @NotBlank
    @Length(min = 1, max = 50)
    @Column(name = "cardBarcode")
    private String cardBarcode;

    @NotBlank
    @Length(min = 1, max = 100)
    @Column(name = "photo")
    private String photo;

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PackageEntity> packages;

    @Column(name = "endFloorIndex")
    private int endFloorIndex;

    @Column(name = "endRow")
    private int endRow;

    @Column(name = "endCol")
    private int endCol;
}
