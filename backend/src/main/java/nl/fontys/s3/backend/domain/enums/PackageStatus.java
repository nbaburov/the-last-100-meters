package nl.fontys.s3.backend.domain.enums;

public enum PackageStatus {
    PENDING,
    DELIVERED,
    FAILED,
    LOCKER;

    public String asString() {
        return switch (this) {
            case PENDING -> "Pending";
            case DELIVERED -> "Delivered";
            case FAILED -> "Failed";
            case LOCKER -> "Locker";
        };
    }
}
