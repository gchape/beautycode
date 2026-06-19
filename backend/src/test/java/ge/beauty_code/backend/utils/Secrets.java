package ge.beauty_code.backend.utils;

import java.io.IOException;
import java.util.Properties;

public class Secrets {
    private Secrets() {
    }

    public static String readLocalStackAuthToken() {
        var props = new Properties();
        try {
            props.load(Secrets.class.getResourceAsStream("/localstack.properties"));
            return props.getProperty("LOCALSTACK_AUTH_TOKEN");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
