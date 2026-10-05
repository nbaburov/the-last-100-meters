package nl.fontys.s3.backend.persistance;

import nl.fontys.s3.backend.domain.Map;

public interface MapRepository {
    void updateMap(final Map map);
    Map getMap(long id);
}
