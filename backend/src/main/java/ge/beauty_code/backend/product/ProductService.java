package ge.beauty_code.backend.service;

import ge.beauty_code.backend.dao.ProductDao;
import ge.beauty_code.backend.dto.ProductDto;
import ge.beauty_code.backend.exception.ProductAlreadyExistsException;
import ge.beauty_code.backend.exception.ProductNotFoundException;
import ge.beauty_code.backend.model.ProductCategory;
import ge.beauty_code.backend.model.items.ProductItem;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductDao productDao;

    @Autowired
    public ProductService(ProductDao productDao) {
        this.productDao = productDao;
    }

    public void save(@NonNull ProductItem product) {
        if (!productDao.save(product)) {
            throw new ProductAlreadyExistsException("პროდუქტი ID-ით " + product.id() + " უკვე არსებობს");
        }
    }

    public ProductDto findById(@NonNull String id) {
        return productDao.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("პროდუქტი ID-ით " + id + " ვერ მოიძებნა"));
    }

    public List<ProductDto> findAll() {
        return productDao.findAll();
    }

    public List<ProductDto> findByCategory(@NonNull ProductCategory category) {
        return productDao.findByCategory(category);
    }
}
