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

    /**
     * Minimal payload — id, price, badge, image, discount. No description or features.
     */
    @GetMapping
    public List<ProductCard> getProducts(@RequestParam(required = false) Category category) {
        if (category != null) {
            return productService.findByCategoryCards(category);
        }
        return productService.findAllCards();
    }

    /**
     * Adds a one-line description on top of the card fields. No full feature list.
     */
    @GetMapping("/summary")
    public List<ProductSummary> getProductSummaries(@RequestParam(required = false) Category category) {
        if (category != null) {
            return productService.findByCategorySummaries(category);
        }
        return productService.findAllSummaries();
    }

    /**
     * Full payload for a single product, including the complete feature list.
     */
    @GetMapping(value = "/{id}")
    public ProductDetail getProduct(@PathVariable String id) {
        return productService.findById(id);
    }
}
