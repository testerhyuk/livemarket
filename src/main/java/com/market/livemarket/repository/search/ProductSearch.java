package com.market.livemarket.repository.search;

import com.market.livemarket.dto.PageRequestDTO;
import com.market.livemarket.dto.PageResponseDTO;
import com.market.livemarket.dto.ProductDTO;
import com.market.livemarket.entity.ProductCategory;

public interface ProductSearch {
    PageResponseDTO<ProductDTO> searchCategoryList(PageRequestDTO pageRequestDTO, ProductCategory category);

    PageResponseDTO<ProductDTO> searchKeyword(PageRequestDTO pageRequestDTO, String keyword);
}
