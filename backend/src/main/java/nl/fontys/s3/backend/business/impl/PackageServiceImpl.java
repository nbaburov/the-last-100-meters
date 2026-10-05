package nl.fontys.s3.backend.business.impl;

import lombok.RequiredArgsConstructor;
import nl.fontys.s3.backend.business.FakeApiHandler;
import nl.fontys.s3.backend.business.PackageService;
import nl.fontys.s3.backend.business.RobotService;
import nl.fontys.s3.backend.domain.Parcel;
import nl.fontys.s3.backend.domain.Robot;
import nl.fontys.s3.backend.domain.enums.PackageStatus;
import nl.fontys.s3.backend.persistance.PackageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PackageServiceImpl implements PackageService {

    private final PackageRepository repository;
    private final FakeApiHandler fakeApiHandler;
    private final RobotService robotService;

    @Override
    public Parcel getPackage(long id) {
        return repository.getPackage(id);
    }

    @Override
    public void deletePackage(long id) {
        repository.deletePackage(id);
    }

    @Override
    public Parcel createPackage(String barcode) {
        Parcel parcelData = fakeApiHandler.retrieveParcel(barcode);
        Robot robot = robotService.getIdleRobot();
        robotService.markRobotInUse(robot.getId());
        parcelData.setStatus(PackageStatus.PENDING);
        parcelData.setRobot(robot);
        return repository.createPackage(parcelData);
    }

    @Override
    public void updatePackageArrived(long id) {
        Parcel parcelData = repository.getPackage(id);
        parcelData.setStatus(PackageStatus.DELIVERED);
        Robot robot = parcelData.getRobot();
        robotService.markRobotAsIdle(robot.getId());
        parcelData.setRobot(null);
        repository.updatePackage(parcelData);
    }

    @Override
    public List<Parcel> getEmployeePackages(long employeeId){
        return repository.getAllEmployeePackages(employeeId);
    }
}
