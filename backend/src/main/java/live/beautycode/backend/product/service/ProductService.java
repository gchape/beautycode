package live.beautycode.backend.product.service;

import live.beautycode.backend.exception.ProductNotFoundException;
import live.beautycode.backend.product.dto.ProductCard;
import live.beautycode.backend.product.dto.ProductDetail;
import live.beautycode.backend.product.dto.ProductSummary;
import live.beautycode.backend.product.model.Category;
import live.beautycode.backend.product.model.Product;
import live.beautycode.backend.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductDetail findById(String id) {
        return productRepository.findById(id)
                .map(Product::toDetail)
                .orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found"));
    }

    public List<ProductCard> findAllCards() {
        return productRepository.findAllCards().stream().map(Product::toCard).toList();
    }

    public List<ProductCard> findByCategoryCards(Category category) {
        return productRepository.findByCategoryCards(category).stream().map(Product::toCard).toList();
    }

    public List<ProductSummary> findAllSummaries() {
        return productRepository.findAllSummaries().stream().map(Product::toSummary).toList();
    }

    public List<ProductSummary> findByCategorySummaries(Category category) {
        return productRepository.findByCategorySummaries(category).stream().map(Product::toSummary).toList();
    }
}
