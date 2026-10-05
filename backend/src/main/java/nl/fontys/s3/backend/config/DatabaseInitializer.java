package nl.fontys.s3.backend.config;

import java.util.List;

import nl.fontys.s3.backend.BackendApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import nl.fontys.s3.backend.controller.converter.MapConverter;
import nl.fontys.s3.backend.controller.dto.requests.UpdateMapRequest;
import nl.fontys.s3.backend.domain.Map;
import nl.fontys.s3.backend.domain.enums.RobotStatus;
import nl.fontys.s3.backend.persistance.converter.MapEntityConverter;
import nl.fontys.s3.backend.persistance.entity.EmployeeEntity;
import nl.fontys.s3.backend.persistance.entity.FloorEntity;
import nl.fontys.s3.backend.persistance.entity.MapEntity;
import nl.fontys.s3.backend.persistance.entity.RobotEntity;
import nl.fontys.s3.backend.persistance.jpa.FloorJpaRepo;
import nl.fontys.s3.backend.persistance.jpa.JPAEmployeeRepository;
import nl.fontys.s3.backend.persistance.jpa.MapJpaRepo;
import nl.fontys.s3.backend.persistance.jpa.RobotJpaRepo;

@Component
@AllArgsConstructor
public class DatabaseInitializer {

        private MapJpaRepo mapJpaRepo;
        private FloorJpaRepo floorJpaRepo;
        private JPAEmployeeRepository employeeJpaRepo;
        private RobotJpaRepo robotJpaRepo;

        @EventListener(ApplicationReadyEvent.class)
        @Transactional
        public void initDatabaseData() {
                // Check if data already exists
                if (!mapJpaRepo.findAll().isEmpty() ||
                                !robotJpaRepo.findAll().isEmpty() ||
                                !employeeJpaRepo.findAll().isEmpty()) {
                        return;
                }

                // Create default map
                MapEntity map = constructInitialMap();
                List<FloorEntity> floors = map.getFloors();
                map.setFloors(null);
                map = mapJpaRepo.save(map);
                FloorEntity currentFloor;
                for (int i = 0; i < floors.size(); i++) {
                        currentFloor = floors.get(i);
                        currentFloor.setParentMap(map);
                        currentFloor.setFloorNum(i);
                        floorJpaRepo.save(currentFloor);
                }

                // Populate Robots
                for (int i = 0; i < 10; i++) {
                        RobotEntity robot;
                        if(i == 3)
                        {
                                robot = RobotEntity.builder()
                                        .status(RobotStatus.ERROR)
                                        .build();
                        }
                        else {
                                robot = RobotEntity.builder()
                                        .status(RobotStatus.IDLE)
                                        .build();
                        }

                        robotJpaRepo.save(robot);
                }

                // Populate Employees
                EmployeeEntity employee1 = EmployeeEntity.builder()
                                .firstName("Alice")
                                .lastName("Smith")
                                .email("alice@example.com")
                                .cardBarcode("5127726")
                                .photo("photo1.jpg")
                                .endFloorIndex(1)
                                .endRow(0)
                                .endCol(0)
                                .build();
                employeeJpaRepo.save(employee1);

                EmployeeEntity employee2 = EmployeeEntity.builder()
                                .firstName("Bob")
                                .lastName("Jones")
                                .email("bob@example.com")
                                .cardBarcode("5599873")
                                .photo("photo2.jpg")
                                .endFloorIndex(2)
                                .endRow(4)
                                .endCol(3)
                                .build();
                employeeJpaRepo.save(employee2);

                EmployeeEntity employee3 = EmployeeEntity.builder()
                                .firstName("Charlie")
                                .lastName("Brown")
                                .email("charlie@example.com")
                                .cardBarcode("5140447")
                                .photo("photo3.jpg")
                                .endFloorIndex(3)
                                .endRow(2)
                                .endCol(2)
                                .build();
                employeeJpaRepo.save(employee3);

                EmployeeEntity employee4 = EmployeeEntity.builder()
                                .firstName("David")
                                .lastName("Wilson")
                                .email("david@example.com")
                                .cardBarcode("5145805")
                                .photo("photo4.jpg")
                                .endFloorIndex(2)
                                .endRow(5)
                                .endCol(0)
                                .build();
                employeeJpaRepo.save(employee4);

                EmployeeEntity employee5 = EmployeeEntity.builder()
                                .firstName("Eve")
                                .lastName("Taylor")
                                .email("eve@example.com")
                                .cardBarcode("5189322")
                                .photo("photo5.jpg")
                                .endFloorIndex(1)
                                .endRow(5)
                                .endCol(4)
                                .build();
                employeeJpaRepo.save(employee5);
        }

        private MapEntity constructInitialMap() {
                Character[][][] map = {
                                {
                                                { 'P', 'W', 'E', 'P', 'P', 'W', 'P', 'P' },
                                                { 'P', 'W', 'P', 'W', 'P', 'W', 'P', 'S' },
                                                { 'P', 'W', 'P', 'W', 'P', 'W', 'P', 'S' },
                                                { 'P', 'W', 'W', 'W', 'P', 'W', 'P', 'S' },
                                                { 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'S' },
                                                { 'P', 'W', 'W', 'P', 'P', 'W', 'P', 'P' }
                                },
                                {
                                                { 'P', 'P', 'E', 'P', 'P', 'W', 'W', 'W' },
                                                { 'P', 'W', 'W', 'P', 'P', 'W', 'W', 'W' },
                                                { 'P', 'W', 'P', 'W', 'P', 'W', 'P', 'P' },
                                                { 'P', 'W', 'W', 'P', 'P', 'W', 'P', 'P' },
                                                { 'P', 'W', 'P', 'W', 'P', 'P', 'P', 'P' },
                                                { 'P', 'W', 'W', 'P', 'P', 'W', 'P', 'P' }
                                },
                                {
                                                { 'P', 'P', 'E', 'P', 'P', 'W', 'W', 'W' },
                                                { 'P', 'W', 'W', 'W', 'P', 'W', 'W', 'W' },
                                                { 'P', 'P', 'P', 'W', 'P', 'W', 'W', 'W' },
                                                { 'P', 'W', 'P', 'W', 'P', 'W', 'W', 'W' },
                                                { 'P', 'P', 'P', 'P', 'P', 'W', 'W', 'W' },
                                                { 'P', 'W', 'W', 'W', 'P', 'W', 'W', 'W' }
                                },
                                {
                                                { 'P', 'P', 'E', 'P', 'P', 'W', 'W', 'W' },
                                                { 'P', 'W', 'W', 'W', 'P', 'W', 'W', 'W' },
                                                { 'P', 'P', 'P', 'P', 'P', 'W', 'W', 'W' },
                                                { 'P', 'W', 'P', 'W', 'P', 'W', 'W', 'W' },
                                                { 'P', 'W', 'P', 'W', 'P', 'W', 'W', 'W' },
                                                { 'P', 'W', 'W', 'W', 'P', 'W', 'W', 'W' }
                                }
                };

                UpdateMapRequest stub = new UpdateMapRequest(map);

                Map actualMap = MapConverter.requestToMap(stub);
                actualMap.setId(0);

                return MapEntityConverter.toEntity(actualMap);
        }
}
