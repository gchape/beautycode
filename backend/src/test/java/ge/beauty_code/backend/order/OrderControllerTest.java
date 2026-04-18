package ge.beauty_code.backend.order;

import ge.beauty_code.backend.exception.OrderAlreadyExistsException;
import ge.beauty_code.backend.order.dto.OrderDto;
import ge.beauty_code.backend.order.model.OrderItem;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.assertj.MockMvcTester;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.mockito.Mockito.*;

@WebMvcTest(OrderController.class)
class OrderControllerTest {

    @MockitoBean
    private OrderService orderService;

    @Autowired
    private MockMvcTester mockMvcTester;

    @Test
    @WithMockUser(username = "user@gmail.com")
    void shouldReturnOrdersWhenUserIsAuthenticated() {
        var email = "user@gmail.com";

        var id = "1";
        var summary = "2x Epilator";
        var orderedAt = LocalDateTime.now();
        var order = new OrderDto(id, summary, orderedAt);

        when(orderService.findOrdersByUserEmail(email))
                .thenReturn(List.of(order));

        var result = mockMvcTester
                .get()
                .uri("/api/users/orders")
                .accept(MediaType.APPLICATION_JSON)
                .assertThat()
                .hasStatusOk()
                .bodyJson();

        result.extractingPath("$.length()").isEqualTo(1);

        result.extractingPath("$[0].id").isEqualTo(id);
        result.extractingPath("$[0].summary").isEqualTo(summary);
        result.extractingPath("$[0].orderedAt").isEqualTo(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(orderedAt));
    }

    @Test
    void shouldReturnStatusCodeUnauthorizedGetOrdersWhenUserIsNotAuthenticated() {
        mockMvcTester
                .get()
                .uri("/api/users/orders")
                .accept(MediaType.APPLICATION_JSON)
                .assertThat()
                .hasStatus(HttpStatus.UNAUTHORIZED);
    }

    @Test
    void shouldReturnStatusCodeUnauthorizedPostOrdersWhenUserIsNotAuthenticated() {
        mockMvcTester
                .post()
                .uri("/api/users/orders")
                .accept(MediaType.APPLICATION_JSON)
                .assertThat()
                .hasStatus(HttpStatus.UNAUTHORIZED);
    }

    @Test
    @WithMockUser(username = "user@gmail.com")
    void shouldReturnStatusCodeConflictWhenOrderAlreadyExists() {
        var email = "user@gmail.com";

        var id = "1";
        var summary = "2x Epilator";
        var orderedAt = LocalDateTime.now();
        var orderItem = new OrderItem(id, summary, orderedAt);

        doThrow(new OrderAlreadyExistsException("შეკვეთა ID-ით " + id + " უკვე არსებობს"))
                .when(orderService).placeOrder(email, orderItem);

        mockMvcTester
                .post()
                .uri("/api/users/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "id":"%s",
                            "summary":"%s",
                            "orderedAt":"%s"
                        }
                        """.formatted(id, summary, DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(orderedAt)))
                .assertThat()
                .hasStatus(HttpStatus.CONFLICT);
    }

    @Test
    @WithMockUser(username = "user@gmail.com")
    void shouldReturnStatusCodeCreatedWhenOrderIsPlaced() {
        var email = "user@gmail.com";

        var id = "1";
        var summary = "2x Epilator";
        var orderedAt = LocalDateTime.now();
        var orderItem = new OrderItem(id, summary, orderedAt);

        doNothing().when(orderService).placeOrder(email, orderItem);

        mockMvcTester
                .post()
                .uri("/api/users/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "id":"%s",
                            "summary":"%s",
                            "orderedAt":"%s"
                        }
                        """.formatted(id, summary, DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(orderedAt)))
                .assertThat()
                .hasStatus(HttpStatus.CREATED);
    }
}
