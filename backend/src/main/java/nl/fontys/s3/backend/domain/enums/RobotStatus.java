package nl.fontys.s3.backend.domain.enums;

public enum RobotStatus {
    IDLE,
    LOADED,
    ERROR,
    RETURNING;

    public String asString() {
        return switch (this){
            case IDLE -> "Idle";
            case LOADED -> "Loaded";
            case ERROR -> "Error";
            case RETURNING -> "Returning";
        };
    }
}
