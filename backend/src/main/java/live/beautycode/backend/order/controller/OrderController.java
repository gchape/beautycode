package live.beautycode.backend.order.controller;

import live.beautycode.backend.order.dto.OrderSummary;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/users/orders", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {

    /**
     * Stub until orders-service (Eureka) is live.
     * TODO: replace with a Feign/WebClient call to orders-service, passing authentication.getName() (email)
     *       as the user identifier once the real service defines its user-lookup contract.
     */
    @GetMapping
    public List<OrderSummary> getUserOrders(Authentication authentication) {
        return List.of();
    }
}
