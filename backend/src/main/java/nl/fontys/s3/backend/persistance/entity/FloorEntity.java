package nl.fontys.s3.backend.persistance.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nl.fontys.s3.backend.domain.enums.BuildPieces;
import nl.fontys.s3.backend.persistance.converter.BuildPiecesEntityConverter;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "floors")
public class FloorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    private int rowNum;

    private int colNum;

    private int floorNum;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = BuildPiecesEntityConverter.class)
    private BuildPieces[][] floorMap;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "map_id")
    private MapEntity parentMap;
}
