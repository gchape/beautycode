package live.beautycode.backend.product.controller;

import live.beautycode.backend.product.dto.ProductDto;
import live.beautycode.backend.product.model.Category;
import live.beautycode.backend.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(
        path = "/api/products",
        produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductDto> getProducts(
            @RequestParam(required = false) Category category
    ) {
        if (category != null) {
            return productService.findByCategory(category);
        }
        return productService.findAll();
    }

    @GetMapping(value = "/{id}")
    public ProductDto getProduct(
            @PathVariable String id
    ) {
        return productService.findById(id);
    }
}
