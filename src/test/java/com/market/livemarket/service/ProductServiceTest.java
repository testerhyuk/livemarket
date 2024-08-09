package com.market.livemarket.service;

import com.market.livemarket.dto.PageRequestDTO;
import com.market.livemarket.dto.PageResponseDTO;
import com.market.livemarket.dto.ProductDTO;
import com.market.livemarket.entity.ProductCategory;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Log4j2
class ProductServiceTest {
    @Autowired
    private ProductService productService;

    @Test
    public void testList() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder().build();

        PageResponseDTO<ProductDTO> responseDTO = productService.getList(pageRequestDTO);

        log.info("responseDTO : " + responseDTO.getDtoList());
    }

    @Test
    public void testRegister() {
        ProductDTO productDTO = ProductDTO.builder()
                .pname("신규 상품")
                .pdesc("신규 추가 상품입니다")
                .price(3000)
                .category(String.valueOf(ProductCategory.FOOD))
                .build();

        productDTO.setUploadedFileNames(
                List.of(UUID.randomUUID() + "_" + "test1.jpg", UUID.randomUUID() + "_" + "test2.jpg")
        );

        productService.register(productDTO);
    }
}