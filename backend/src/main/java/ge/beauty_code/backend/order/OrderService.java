package ge.beauty_code.backend.order;

import ge.beauty_code.backend.exception.OrderAlreadyExistsException;
import ge.beauty_code.backend.order.dto.OrderDto;
import ge.beauty_code.backend.order.model.OrderItem;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public void placeOrder(@NonNull String userEmail, @NonNull OrderItem orderItem) {
        if (!orderRepository.save(userEmail, orderItem)) {
            throw new OrderAlreadyExistsException("მომხმარებელი Email-ით " + userEmail + " არ არსებობს ან შეკვეთა ID-ით " + orderItem.id() + " უკვე არსებობს");
        }
    }

    public List<OrderDto> findOrdersByUserEmail(@NonNull String email) {
        return orderRepository.findOrdersByUserEmail(email);
    }
}
