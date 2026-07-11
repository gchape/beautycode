package live.beautycode.backend.product.controller;

import live.beautycode.backend.product.dto.ProductCard;
import live.beautycode.backend.product.dto.ProductDetail;
import live.beautycode.backend.product.dto.ProductSummary;
import live.beautycode.backend.product.model.Category;
import live.beautycode.backend.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/products", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductCard> getProducts(@RequestParam(required = false) Category category) {
        if (category != null) {
            return productService.findByCategoryCards(category);
        }
        return productService.findAllCards();
    }

    @GetMapping("/summary")
    public List<ProductSummary> getProductSummaries(@RequestParam(required = false) Category category) {
        if (category != null) {
            return productService.findByCategorySummaries(category);
        }
        return productService.findAllSummaries();
    }

    @GetMapping(value = "/{id}")
    public ProductDetail getProduct(@PathVariable String id) {
        return productService.findById(id);
    }
}
