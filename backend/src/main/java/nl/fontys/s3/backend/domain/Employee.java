package nl.fontys.s3.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String cardBarcode;
    private String photo;
    private int endFloorIndex;
    private int endRow;
    private int endCol;
}
