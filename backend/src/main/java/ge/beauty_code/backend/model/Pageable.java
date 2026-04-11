package ge.beauty_code.backend.model;

sealed public interface Pageable {
    record Page(int limit, String nextToken) implements Pageable {
    }
}
