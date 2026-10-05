package nl.fontys.s3.backend.controller.converter;

import nl.fontys.s3.backend.controller.dto.responses.PackageResponseDto;
import nl.fontys.s3.backend.controller.dto.responses.ReducedPackageDto;
import nl.fontys.s3.backend.domain.Parcel;

public class PackageConverter {
    private PackageConverter() {}

    public static PackageResponseDto parcelToResponseDto(Parcel pack) {
        int[] dimension = new int[3];
        dimension[0] = pack.getWidth();
        dimension[1] = pack.getHeight();
        dimension[2] = pack.getWidth();

        return PackageResponseDto.builder()
                .id(pack.getId())
                .description(pack.getDescription())
                .dimensions(dimension)
                .weight(pack.getWeight())
                .status(pack.getStatus().asString())
                .owner(EmployeeConverter.toResponseDTO(pack.getOwner()))
                .assignedRobot(RobotConverter.robotToRobotResponseDto(pack.getRobot()))
                .build();
    }

    public static ReducedPackageDto parcelToReducedPackageDto(Parcel pack) {
        return ReducedPackageDto.builder()
                .id(pack.getId())
                .description(pack.getDescription())
                .status(pack.getStatus().asString())
                .build();
    }
}
