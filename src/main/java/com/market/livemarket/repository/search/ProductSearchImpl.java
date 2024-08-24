package com.market.livemarket.repository.search;

import com.market.livemarket.dto.PageRequestDTO;
import com.market.livemarket.dto.PageResponseDTO;
import com.market.livemarket.dto.ProductDTO;
import com.market.livemarket.entity.*;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPQLQuery;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.*;

@Log4j2
public class ProductSearchImpl extends QuerydslRepositorySupport implements ProductSearch {
    public ProductSearchImpl() {
        super(Product.class);
    }

    public List<ProductDTO> tupleToProductDTO(List<Tuple> productList) {
        List<ProductDTO> dtoList = productList.stream().map(arr -> {
            ProductDTO productDTO = null;

            Product product = (Product) arr.get(0, Product.class);
            ProductImage productImage = (ProductImage) arr.get(1, ProductImage.class);

            productDTO = ProductDTO.builder()
                    .pno(product.getPno())
                    .pname(product.getPname())
                    .pdesc(product.getPdesc())
                    .price(product.getPrice())
                    .category(product.getCategory().getCategoryType())
                    .build();

            String imageStr = productImage.getFileName();
            productDTO.setUploadedFileNames(List.of(imageStr));

            return productDTO;
        }).toList();

        return dtoList;
    }

    public Pageable makePageRequest(PageRequestDTO pageRequestDTO) {

        return PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("pno").descending());
    }

    public JPQLQuery<Product> getPagingWithQDomain(QProduct qProduct, QProductImage qProductImage) {
        qProduct = QProduct.product;
        qProductImage = QProductImage.productImage;

        JPQLQuery<Product> query = from(qProduct);

        query.leftJoin(qProduct.imageList, qProductImage);

        return query;
    }

    public JPQLQuery<Product> getJoinListWithQDomain(QProduct qProduct, QProductImage qProductImage, QMember qMember) {
        qProduct = QProduct.product;
        qProductImage = QProductImage.productImage;
        qMember = QMember.member;

        JPQLQuery<Product> query = from(qProduct);

        query.leftJoin(qProduct.imageList, qProductImage);
        query.leftJoin(qProduct.user, qMember);

        return query;
    }

    // 카테고리별 조회
    @Override
    public PageResponseDTO<ProductDTO> searchCategoryList(PageRequestDTO pageRequestDTO, ProductCategory category) {
        QProduct qproduct = QProduct.product;
        QProductImage qproductImage = QProductImage.productImage;

        JPQLQuery<Product> query = getPagingWithQDomain(qproduct, qproductImage);

        Pageable pageable = makePageRequest(pageRequestDTO);

        // ord가 0번째 즉, 대표 이미지만 가져옴
        query.where(qproductImage.ord.eq(0), qproduct.category.eq(category));

        Objects.requireNonNull(getQuerydsl()).applyPagination(pageable, query);

        List<Tuple> productList = query.select(qproduct, qproductImage).fetch();

        List<ProductDTO> dtoList = tupleToProductDTO(productList);

        long count = query.fetchCount();

        return PageResponseDTO.<ProductDTO>withAll()
                .pageRequestDTO(pageRequestDTO)
                .total(count)
                .dtoList(dtoList)
                .build();
    }

    // 키워드 검색
    @Override
    public PageResponseDTO<ProductDTO> searchKeyword(PageRequestDTO pageRequestDTO, String keyword) {
        QProduct qproduct = QProduct.product;
        QProductImage qproductImage = QProductImage.productImage;

        JPQLQuery<Product> query = getPagingWithQDomain(qproduct, qproductImage);

        Pageable pageable = makePageRequest(pageRequestDTO);

        // 대표 이미지와 검색어가 포함되어 있는 product 가져오기
        query.where(qproductImage.ord.eq(0), qproduct.pname.contains(keyword));

        Objects.requireNonNull(getQuerydsl()).applyPagination(pageable, query);

        List<Tuple> productList = query.select(qproduct, qproductImage).fetch();

        List<ProductDTO> dtoList = tupleToProductDTO(productList);

        long count = query.fetchCount();

        return PageResponseDTO.<ProductDTO>withAll()
                .pageRequestDTO(pageRequestDTO)
                .total(count)
                .dtoList(dtoList)
                .build();
    }

    @Override
    public PageResponseDTO<ProductDTO> myList(PageRequestDTO pageRequestDTO, String email) {
        log.info("querydsl email : " + email);
        QProduct qproduct = QProduct.product;
        QProductImage qproductImage = QProductImage.productImage;
        QMember qMember = QMember.member;

        JPQLQuery<Product> query = getJoinListWithQDomain(qproduct, qproductImage, qMember);

        Pageable pageable = makePageRequest(pageRequestDTO);

        // 대표 이미지와 검색어가 포함되어 있는 product 가져오기
        query.where(qproductImage.ord.eq(0), qMember.email.eq(email));

        Objects.requireNonNull(getQuerydsl()).applyPagination(pageable, query);

        List<Tuple> productList = query.select(qproduct, qproductImage).fetch();

        List<ProductDTO> dtoList = tupleToProductDTO(productList);

        long count = query.fetchCount();

        return PageResponseDTO.<ProductDTO>withAll()
                .pageRequestDTO(pageRequestDTO)
                .total(count)
                .dtoList(dtoList)
                .build();
    }
}
