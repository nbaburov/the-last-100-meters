package nl.fontys.s3.backend.persistance.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import nl.fontys.s3.backend.domain.enums.BuildPieces;

@Converter
public class BuildPiecesEntityConverter implements AttributeConverter<BuildPieces[][], String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(BuildPieces[][] attribute) {
        if (attribute == null) {
            return null;
        }
        try {
            // Convert 2D array to JSON string
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting BuildPieces[][] to JSON string", e);
        }
    }

    @Override
    public BuildPieces[][] convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return new BuildPieces[0][0];
        }
        try {
            // Convert JSON string back to 2D array
            return objectMapper.readValue(dbData, BuildPieces[][].class);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting JSON string to BuildPieces[][]", e);
        }
    }
}
