package ge.beauty_code.backend.product;

import ge.beauty_code.backend.product.dto.ProductDto;
import ge.beauty_code.backend.product.model.Category;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/products", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductDto> getProducts(@RequestParam(required = false) Category category) {
        if (category != null) {
            return productService.findByCategory(category);
        }
        return productService.findAll();
    }

    @GetMapping(value = "/{id}")
    public ProductDto getProduct(@PathVariable String id) {
        return productService.findById(id);
    }
}
