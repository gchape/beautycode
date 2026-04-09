package ge.beauty_code.backend.service;

import ge.beauty_code.backend.dao.OrderDao;
import ge.beauty_code.backend.dto.OrderDto;
import ge.beauty_code.backend.exception.OrderAlreadyExistsException;
import ge.beauty_code.backend.model.items.OrderItem;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderDao orderDao;

    @Autowired
    public OrderService(OrderDao orderDao) {
        this.orderDao = orderDao;
    }

    public void placeOrder(@NonNull String userEmail, @NonNull OrderItem orderItem) {
        if (!orderDao.save(userEmail, orderItem)) {
            throw new OrderAlreadyExistsException("მომხმარებელი Email-ით " + userEmail + " არ არსებობს ან შეკვეთა ID-ით " + orderItem.id() + " უკვე არსებობს");
        }
    }

    public List<OrderDto> findOrdersByUserEmail(@NonNull String email) {
        return orderDao.findOrdersByUserEmail(email);
    }
}
