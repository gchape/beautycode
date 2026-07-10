package live.beautycode.backend.product;

import live.beautycode.backend.exception.ProductAlreadyExistsException;
import live.beautycode.backend.exception.ProductNotFoundException;
import live.beautycode.backend.product.dto.ProductDto;
import live.beautycode.backend.product.model.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public void save(ProductDto product) {
        if (!productRepository.save(product)) {
            throw new ProductAlreadyExistsException("პროდუქტი ID-ით " + product.id() + " უკვე არსებობს");
        }
    }

    public ProductDto findById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("პროდუქტი ID-ით " + id + " ვერ მოიძებნა"));
    }

    public List<ProductDto> findAll() {
        return productRepository.findAll();
    }

    public List<ProductDto> findByCategory(Category category) {
        return productRepository.findByCategory(category);
    }
}
