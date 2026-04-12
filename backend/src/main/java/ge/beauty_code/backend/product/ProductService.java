package ge.beauty_code.backend.product;

import ge.beauty_code.backend.exception.ProductAlreadyExistsException;
import ge.beauty_code.backend.exception.ProductNotFoundException;
import ge.beauty_code.backend.product.dto.ProductDto;
import ge.beauty_code.backend.product.model.Category;
import ge.beauty_code.backend.product.model.ProductItem;
import org.jspecify.annotations.NullMarked;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@NullMarked
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public void save(ProductItem product) {
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
