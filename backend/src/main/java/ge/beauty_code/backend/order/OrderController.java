package ge.beauty_code.backend.order;

import ge.beauty_code.backend.order.dto.OrderDto;
import ge.beauty_code.backend.order.model.OrderItem;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/users/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<OrderDto> getOrders(@AuthenticationPrincipal UserDetails userDetails) {
        return orderService.findOrdersByUserEmail(userDetails.getUsername());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> placeOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody OrderItem orderItem
    ) {
        orderService.placeOrder(userDetails.getUsername(), orderItem);
        return ResponseEntity.status(201).build();
    }
}
