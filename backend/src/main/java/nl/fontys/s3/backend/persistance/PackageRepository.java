package nl.fontys.s3.backend.persistance;

import nl.fontys.s3.backend.domain.Parcel;

import java.util.List;

public interface PackageRepository {
    Parcel createPackage(Parcel parcel);
    Parcel getPackage(long id);
    void deletePackage(long id);
    void updatePackage(Parcel parcel);
    List<Parcel> getAllEmployeePackages(long employeeId);
}
