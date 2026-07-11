package live.beautycode.backend.order.controller;

import live.beautycode.backend.order.dto.CreateOrderRequest;
import live.beautycode.backend.order.dto.OrderDetail;
import live.beautycode.backend.order.dto.OrderSummary;
import live.beautycode.backend.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping(path = "/api/orders",
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public OrderDetail createOrder(Authentication authentication, @RequestBody CreateOrderRequest request) {
        return orderService.createOrder(authentication.getName(), request);
    }

    @GetMapping(path = "/api/orders/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public OrderDetail getOrder(Authentication authentication, @PathVariable String id) {
        return orderService.findById(id, authentication.getName());
    }

    @GetMapping(path = "/api/users/orders", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<OrderSummary> getUserOrders(Authentication authentication) {
        return orderService.findSummariesByUser(authentication.getName());
    }
}
