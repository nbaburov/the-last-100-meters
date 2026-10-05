package nl.fontys.s3.backend.business;
import nl.fontys.s3.backend.domain.Parcel;

import java.util.List;

public interface PackageService {
    Parcel getPackage(long id);
    void deletePackage(long id);
    Parcel createPackage(String barcode);
    void updatePackageArrived(long id);
    List<Parcel> getEmployeePackages(long employeeId);
}
