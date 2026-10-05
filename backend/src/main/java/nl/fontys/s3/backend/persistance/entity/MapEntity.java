package nl.fontys.s3.backend.persistance.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "maps")
public class MapEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @ElementCollection
    private List<Integer> dockingStations;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "parentMap")
    @OrderBy("floorNum ASC")
    private List<FloorEntity> floors;
}
