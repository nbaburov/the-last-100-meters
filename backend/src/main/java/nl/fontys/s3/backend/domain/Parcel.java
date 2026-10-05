package nl.fontys.s3.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import nl.fontys.s3.backend.domain.enums.PackageStatus;

//Renamed to parcel to avoid conflicting names
@Getter
@Builder
@AllArgsConstructor
public class Parcel {

    private long id;
    private String description;
    private int weight;
    private int height;
    private int width;
    private int length;

    @Setter
    private PackageStatus status;
    @Setter
    private Employee owner;
    @Setter
    private Robot robot;
}
