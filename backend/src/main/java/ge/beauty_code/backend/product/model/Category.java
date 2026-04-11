package ge.beauty_code.backend.product.model;

public enum Category {
    EPILATOR() {
        @Override
        public String toString() {
            return "epilator";
        }
    },
    HAIR_DRYER() {
        @Override
        public String toString() {
            return "hair-dryer";
        }
    },
    FACIAL_CLEANSER() {
        @Override
        public String toString() {
            return "facial-cleanser";
        }
    }
}
