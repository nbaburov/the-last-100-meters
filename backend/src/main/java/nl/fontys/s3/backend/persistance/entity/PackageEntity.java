package nl.fontys.s3.backend.persistance.entity;

import jakarta.persistence.*;
import lombok.Data;
import nl.fontys.s3.backend.domain.enums.PackageStatus;

@Entity
@Data
@Table(name = "packages")
public class PackageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "description")
    private String description;

    @Column(name = "weight", nullable = false)
    private int weight;

    @Column(name = "height", nullable = false)
    private int height;

    @Column(name = "width", nullable = false)
    private int width;

    @Column(name = "length", nullable = false)
    private int length;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private PackageStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empl_id", nullable = false)
    private EmployeeEntity owner;

    @OneToOne
    @JoinColumn(name = "robot_id")
    private RobotEntity robot;
}
