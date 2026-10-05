package nl.fontys.s3.backend.domain.enums;

public enum BuildPieces {
    EMPTY("P"),
    WALL("W"),
    ELEVATOR("E"),
    STATION("S"),
    END("X");

    private final String value;

    private BuildPieces(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static BuildPieces fromString(String value) {
        for (BuildPieces b : values()) {
            if (b.value.equals(value)) {
                return b;
            }
        }
        return null;
    }
}

