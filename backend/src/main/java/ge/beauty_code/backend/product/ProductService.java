package ge.beauty_code.backend.product;

import ge.beauty_code.backend.exception.ProductAlreadyExistsException;
import ge.beauty_code.backend.exception.ProductNotFoundException;
import ge.beauty_code.backend.model.ProductCategory;
import ge.beauty_code.backend.model.items.ProductItem;
import ge.beauty_code.backend.product.dto.ProductDto;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public void save(@NonNull ProductItem product) {
        if (!productRepository.save(product)) {
            throw new ProductAlreadyExistsException("პროდუქტი ID-ით " + product.id() + " უკვე არსებობს");
        }
    }

    public ProductDto findById(@NonNull String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("პროდუქტი ID-ით " + id + " ვერ მოიძებნა"));
    }

    public List<ProductDto> findAll() {
        return productRepository.findAll();
    }

    public List<ProductDto> findByCategory(@NonNull ProductCategory category) {
        return productRepository.findByCategory(category);
    }
}
