package com.market.livemarket.repository;

import com.market.livemarket.dto.PageRequestDTO;
import com.market.livemarket.entity.Product;
import com.market.livemarket.entity.ProductCategory;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Arrays;
import java.util.List;
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
        for(int i = 0; i < 100; i ++) {
            Product product = Product.builder()
                    .pname("Test.." + i)
                    .pdesc("Test desc.." + i)
                    .price(1000)
                    .category(ProductCategory.HOME_APPLIANCES)
                    .build();

            product.addImageString(UUID.randomUUID() + "_" + "Image1.jpg");
            product.addImageString(UUID.randomUUID() + "_" + "Image2.jpg");

            productRepository.save(product);
        }
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
    public void testUpdate() {
        Product product = productRepository.selectOne(1L).get();

        product.changePrice(2000);

        product.clearList();

        product.addImageString(UUID.randomUUID() + "_" + "PImage1.jpg");
        product.addImageString(UUID.randomUUID() + "_" + "PImage2.jpg");

        productRepository.save(product);
    }

    @Test
    public void testPaging() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("pno").descending());

        Page<Product> result = productRepository.findAll(pageable);

        log.info("-----전체 데이터 개수-----");
        log.info(result.getTotalElements());

        log.info("-----실제 내용물 출력-----");
        log.info(result.getContent());
    }

    @Test
    public void TestPagingList() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("pno").descending());

        Page<Object[]> result = productRepository.selectList(pageable);

        result.getContent().forEach(arr -> log.info(Arrays.toString(arr)));
    }

    @Test
    public void testSearchCategory() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder().build();
        ProductCategory category = ProductCategory.HOME_APPLIANCES;

        log.info("result : " + productRepository.searchCategoryList(pageRequestDTO, category));
    }

    @Test
    public void testSearchKeyword() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder().build();
        String keyword = "98";

        log.info("result : " + productRepository.searchKeyword(pageRequestDTO, keyword));
    }

    @Test
    public void testTodaysProduct() {
        List<Product> todaysProduct = productRepository.todaysProduct();

        log.info(todaysProduct);
    }
}