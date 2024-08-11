package com.market.livemarket.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "imageList")
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pno;

    private String pname;
    private int price;
    private String pdesc;
    private boolean delFlag;

    private ProductCategory category;

    @ElementCollection
    @Builder.Default
    private List<ProductImage> imageList = new ArrayList<>();

    @CreatedDate
    private LocalDate date;

    public void changeProductCategory(ProductCategory category) {
        this.category = category;
    }

    public void changePname(String pname) {
        this.pname = pname;
    }

    public void changePrice(int price) {
        this.price = price;
    }

    public void changePdesc(String pdesc) {
        this.pdesc = pdesc;
    }

    public void changeDelFlag(boolean delFlag) {
        this.delFlag = delFlag;
    }

    public void addImage(ProductImage image) {
        // 이미지 여러개가 들어올 경우 size를 통해서 ord값 유동적으로 넣어주기 위함
        image.changeOrd(imageList.size());
        imageList.add(image);
    }

    public void addImageString(String fileName) {
        ProductImage productImage = ProductImage.builder()
                .fileName(fileName)
                .build();

        addImage(productImage);
    }

    public void clearList() {
        this.imageList.clear();
    }
}
