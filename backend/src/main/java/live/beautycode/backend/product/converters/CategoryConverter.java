package ge.beauty_code.backend.product.converters;

import ge.beauty_code.backend.product.model.Category;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class CategoryConverter implements Converter<String, Category> {

    @Override
    public Category convert(String source) {
        return Category.valueOf(source.toUpperCase().replace("-", "_"));
    }
}
