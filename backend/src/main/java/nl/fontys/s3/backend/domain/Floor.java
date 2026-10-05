package nl.fontys.s3.backend.domain;

import nl.fontys.s3.backend.domain.enums.BuildPieces;
import lombok.*;

//Wrapper class for the array, provides no functionality
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Floor {
    private  long id;
    private  int rowNumber;
    private  int colNumber;
    private  BuildPieces[][] floorMap;
}
