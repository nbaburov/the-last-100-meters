package nl.fontys.s3.backend.business;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import nl.fontys.s3.backend.domain.Robot;
import nl.fontys.s3.backend.domain.enums.RobotStatus;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import nl.fontys.s3.backend.domain.Employee;
import nl.fontys.s3.backend.domain.Parcel;
import nl.fontys.s3.backend.domain.enums.PackageStatus;

@Service
@RequiredArgsConstructor
public class FakeApiHandler {
    private static final List<Parcel> parcels;
    private static final Map<String, Parcel> barcodesToParcels;
    private static final Map<Parcel, String> emailsToParcels;

    private final EmployeeService employeeService;

    static {
        parcels = Arrays.asList(
                new Parcel(1L, "Package 1", 200, 20, 30, 40, PackageStatus.PENDING, null, null),
                new Parcel(2L, "Package 2", 300, 15, 35, 45, PackageStatus.PENDING, null, null),
                new Parcel(3L, "Package 3", 250, 10, 25, 35, PackageStatus.PENDING, null, null),
                new Parcel(4L, "Package 4", 350, 25, 40, 50, PackageStatus.PENDING, null, null),
                new Parcel(5L, "Package 5", 300, 15, 35, 45, PackageStatus.PENDING, null, null)
        );

        barcodesToParcels = Map.of(
                "8710993009240", parcels.get(0),
                "8710993008700", parcels.get(1),
                "asdhaksdh", parcels.get(2),
                "asdjhasdh", parcels.get(3),
                "asdhaksj", parcels.get(4)
                );

        emailsToParcels = Map.of(
                parcels.get(0), "alice@example.com",
                parcels.get(1), "bob@example.com",
                parcels.get(2), "charlie@example.com",
                parcels.get(3), "david@example.com",
                parcels.get(4), "eve@example.com"
        );
    }

    public Parcel retrieveParcel(String barcode) throws NoSuchElementException {
        Parcel parcel = barcodesToParcels.get(barcode);
        String email = emailsToParcels.get(parcel);
        Employee employee = employeeService.getEmployeeByEmail(email);
        parcel.setOwner(employee);
        return parcel;
    }
}
