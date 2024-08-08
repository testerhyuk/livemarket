package com.market.livemarket.repository;

import com.market.livemarket.entity.Product;
import com.market.livemarket.entity.ProductCategory;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Log4j2
class ProductRepositoryTest {
    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testInsert() {
        Product product = Product.builder()
                .pname("Test")
                .pdesc("Test desc")
                .price(1000)
                .category(ProductCategory.HOME_APPLIANCES)
                .build();

        product.addImageString(UUID.randomUUID() + "_" + "Image1.jpg");
        product.addImageString(UUID.randomUUID() + "_" + "Image2.jpg");

        productRepository.save(product);
    }

    @Test
    public void testRead() {
        Long pno = 1L;

        Optional<Product> result = productRepository.selectOne(pno);

        Product product = result.orElseThrow();

        log.info("-----product-----");
        log.info(product);
        log.info("-----productImageList-----");
        log.info(product.getImageList());
    }

    @Test
    @Transactional
    @Commit
    public void testDelete() {
        Long pno = 1L;

        productRepository.updateToDelete(1L, true);
    }

    @Test
    public void testUpdate() {
        Product product = productRepository.selectOne(1L).get();

        product.changePrice(2000);

        product.clearList();

        product.addImageString(UUID.randomUUID() + "_" + "PImage1.jpg");
        product.addImageString(UUID.randomUUID() + "_" + "PImage2.jpg");

        productRepository.save(product);
    }
}