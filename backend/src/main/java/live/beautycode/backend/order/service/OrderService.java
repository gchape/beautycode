package live.beautycode.backend.order.service;

import live.beautycode.backend.exception.OrderNotFoundException;
import live.beautycode.backend.order.Order;
import live.beautycode.backend.order.OrderItem;
import live.beautycode.backend.order.dto.CreateOrderRequest;
import live.beautycode.backend.order.dto.OrderDetail;
import live.beautycode.backend.order.dto.OrderSummary;
import live.beautycode.backend.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderService {

    private static final DateTimeFormatter DATE_FORMATTER =
            DateTimeFormatter.ISO_INSTANT;

    private final OrderRepository orderRepository;

    @Transactional
    public OrderDetail createOrder(String userEmail, CreateOrderRequest request) {
        if (request.items() == null || request.items().isEmpty()) {
            throw new IllegalArgumentException("Order must contain at least one item");
        }

        Order order = new Order();
        order.setUserEmail(userEmail);

        BigDecimal total = BigDecimal.ZERO;
        for (var itemRequest : request.items()) {
            OrderItem item = new OrderItem();
            item.setProductId(itemRequest.productId());
            item.setTitle(itemRequest.title());
            item.setImgUrl(itemRequest.imgUrl());
            item.setBadge(itemRequest.badge());
            item.setUnitPrice(itemRequest.newPrice());
            item.setQuantity(itemRequest.quantity());
            order.addItem(item);

            total = total.add(itemRequest.newPrice().multiply(BigDecimal.valueOf(itemRequest.quantity())));
        }
        order.setTotal(total);

        Order saved = orderRepository.save(order);
        log.info("Order {} created for {}", saved.getId(), userEmail);
        return toDetail(saved);
    }

    public List<OrderSummary> findSummariesByUser(String userEmail) {
        return orderRepository.findByUserEmailOrderByCreatedAtDesc(userEmail).stream()
                .map(this::toSummary)
                .toList();
    }

    public OrderDetail findById(String id, String userEmail) {
        Order order = orderRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new OrderNotFoundException("Order not found: " + id));

        if (!order.getUserEmail().equals(userEmail)) {
            throw new OrderNotFoundException("Order not found: " + id);
        }
        return toDetail(order);
    }

    private OrderSummary toSummary(Order order) {
        String itemsSummary = order.getItems().stream()
                .map(i -> i.getTitle() + " x" + i.getQuantity())
                .reduce((a, b) -> a + ", " + b)
                .orElse("");

        return new OrderSummary(
                order.getId().toString(),
                itemsSummary,
                DATE_FORMATTER.format(order.getCreatedAt().atZone(ZoneOffset.UTC))
        );
    }

    private OrderDetail toDetail(Order order) {
        return new OrderDetail(
                order.getId().toString(),
                order.getStatus().name(),
                order.getTotal(),
                order.getCreatedAt(),
                order.getItems().stream()
                        .map(i -> new OrderDetail.OrderItemDetail(
                                i.getProductId(), i.getTitle(), i.getImgUrl(),
                                i.getBadge(), i.getUnitPrice(), i.getQuantity()
                        ))
                        .toList()
        );
    }
}
