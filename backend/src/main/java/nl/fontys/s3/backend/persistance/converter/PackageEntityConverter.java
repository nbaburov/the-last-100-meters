package nl.fontys.s3.backend.persistance.converter;

import nl.fontys.s3.backend.domain.Parcel;
import nl.fontys.s3.backend.domain.Robot;
import nl.fontys.s3.backend.persistance.entity.PackageEntity;

public class PackageEntityConverter {

    public static Parcel toDomain(PackageEntity packageEntity) {
        Robot robot;
        if (null == packageEntity.getRobot()) {
            robot = null;
        }else{
            robot = RobotEntityConverter.toDomain(packageEntity.getRobot());
        }


        return Parcel.builder()
                .id(packageEntity.getId())
                .description(packageEntity.getDescription())
                .weight(packageEntity.getWeight())
                .height(packageEntity.getHeight())
                .width(packageEntity.getWidth())
                .length(packageEntity.getLength())
                .status(packageEntity.getStatus())
                .owner(EmployeeEntityConverter.toDomain(packageEntity.getOwner()))
                .robot(robot)
                .build();
    }

    public static PackageEntity toEntity(Parcel parcel) {
        PackageEntity packageEntity = new PackageEntity();
        packageEntity.setId(parcel.getId());
        packageEntity.setDescription(parcel.getDescription());
        packageEntity.setWeight(parcel.getWeight());
        packageEntity.setHeight(parcel.getHeight());
        packageEntity.setWidth(parcel.getWidth());
        packageEntity.setLength(parcel.getLength());
        packageEntity.setStatus(parcel.getStatus());
        packageEntity.setOwner(EmployeeEntityConverter.toEntity(parcel.getOwner()));
        if (parcel.getRobot() != null) {
            packageEntity.setRobot(RobotEntityConverter.toEntity(parcel.getRobot()));
        }else {
            packageEntity.setRobot(null);
        }
        return packageEntity;
    }
}
