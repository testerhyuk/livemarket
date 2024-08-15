package com.market.livemarket.service;

import com.market.livemarket.dto.PageRequestDTO;
import com.market.livemarket.dto.PageResponseDTO;
import com.market.livemarket.dto.ProductDTO;
import com.market.livemarket.entity.Product;
import com.market.livemarket.entity.ProductCategory;
import com.market.livemarket.entity.ProductImage;
import com.market.livemarket.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2
public class ProductService {
    private final ProductRepository productRepository;

    // 오늘의 새상품 조회
    public List<ProductDTO> getTodaysProduct() {
        List<Product> result = productRepository.todaysProduct();
        List<ProductDTO> resDTO = new ArrayList<>();

        if(result.isEmpty()) {
            return resDTO;
        }

        result.forEach(prd -> {
            ProductDTO productDTO = entityToDTO(prd);
            resDTO.add(productDTO);
        });

        return resDTO;
    }

    // 상품 등록
    public Long register(ProductDTO productDTO) {
        Product product = dtoToEntity(productDTO);

        return productRepository.save(product).getPno();
    }

    // 상품 조회
    public ProductDTO get(Long pno) {
        Optional<Product> result = productRepository.findById(pno);

        Product product = result.orElseThrow();

        return entityToDTO(product);
    }

    // 상품 수정
    public void modify(ProductDTO productDTO) {
        Optional<Product> result = productRepository.findById(productDTO.getPno());
        Product product = result.orElseThrow();

        product.changePrice(productDTO.getPrice());
        product.changePname(productDTO.getPname());
        product.changePdesc(productDTO.getPdesc());
        product.changeProductCategory(ProductCategory.StringToProductCategory(productDTO.getCategory()));

        List<String> uploadFileNames = productDTO.getUploadedFileNames();

        product.clearList();

        if(uploadFileNames != null && !uploadFileNames.isEmpty()) {
            uploadFileNames.forEach(product::addImageString);
        }

        productRepository.save(product);
    }

    // 상품 삭제 -> delFlag만 변경하는 소프트 딜리트
    public void remove(Long pno) {
        Optional<Product> result = productRepository.findById(pno);
        Product product = result.orElseThrow();

        product.changeDelFlag(true);

        productRepository.save(product);
    }

    // 데이터 전체 목록과 페이징
    public PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("pno").descending());

        Page<Object[]> result = productRepository.selectList(pageable);

        List<ProductDTO> dtoList = result.get().map(arr -> {
            ProductDTO productDTO = null;

            Product product = (Product) arr[0];
            ProductImage productImage = (ProductImage) arr[1];

            productDTO = ProductDTO.builder()
                    .pno(product.getPno())
                    .pname(product.getPname())
                    .pdesc(product.getPdesc())
                    .price(product.getPrice())
                    .category(product.getCategory().getCategoryType())
                    .build();

            String imageStr = productImage.getFileName();
            productDTO.setUploadedFileNames(List.of(imageStr));

            return productDTO ;
        }).toList();

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<ProductDTO>withAll()
                .dtoList(dtoList)
                .total(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    // 카테고리 검색과 페이징
    public PageResponseDTO<ProductDTO> getCategorySearchList(PageRequestDTO pageRequestDTO, String category) {
        ProductCategory categoryType = ProductCategory.StringToProductCategory(category);
        return productRepository.searchCategoryList(pageRequestDTO, categoryType);
    }

    // 키워드 검색과 페이징
    public PageResponseDTO<ProductDTO> getKeywordSearchList(PageRequestDTO pageRequestDTO, String keyword) {
        return productRepository.searchKeyword(pageRequestDTO, keyword);
    }

    // dto -> entity
    private Product dtoToEntity(ProductDTO productDTO) {

        Product product = Product.builder()
                .pno(productDTO.getPno())
                .pname(productDTO.getPname())
                .pdesc(productDTO.getPdesc())
                .price(productDTO.getPrice())
                .category(ProductCategory.StringToProductCategory(productDTO.getCategory()))
                .date(productDTO.getDate())
                .build();

        List<String> uploadFileNames = productDTO.getUploadedFileNames();

        if(uploadFileNames == null || uploadFileNames.isEmpty()) {
            return product;
        }

        uploadFileNames.forEach(product::addImageString);

        return product;
    }

    // entity -> dto
    private ProductDTO entityToDTO(Product product) {
        ProductDTO productDTO = ProductDTO.builder()
                .pno(product.getPno())
                .pname(product.getPname())
                .pdesc(product.getPdesc())
                .price(product.getPrice())
                .delFlag(product.isDelFlag())
                .category(product.getCategory().getCategoryType())
                .date(product.getDate())
                .build();

        List<ProductImage> imageList = product.getImageList();

        if(imageList == null || imageList.isEmpty()) {
            return productDTO;
        }

        List<String> fileNameList = imageList.stream().map(ProductImage::getFileName).toList();

        productDTO.setUploadedFileNames(fileNameList);

        return productDTO;
    }
}
