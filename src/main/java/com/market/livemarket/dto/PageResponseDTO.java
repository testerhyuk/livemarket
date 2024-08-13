package com.market.livemarket.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class PageResponseDTO<E> {
    private List<E> dtoList;
    private List<Integer> pageNumList;
    private PageRequestDTO pageRequestDTO;
    private boolean prev, next;
    private int totalCount, prevPage, nextPage, totalPage, current;

    @Builder(builderMethodName = "withAll")
    public PageResponseDTO(List<E> dtoList, PageRequestDTO pageRequestDTO, long total) {
        this.dtoList = dtoList;
        this.pageRequestDTO = pageRequestDTO;
        this.totalCount = (int) total;

        // 끝 페이지 계산
        int end = (int) (Math.ceil(pageRequestDTO.getPage() / 10.0)) * 10;

        // 시작 페이지는 '끝 페이지 - 9'
        int start = end - 9;

        // 보여져야할 마지막 페이지
        int last = (int) (Math.ceil(totalCount / (double) pageRequestDTO.getSize()));

        // 토탈값이 총 페이지 사이즈보다 작다면 마지막 페이지는 last
        end = Math.min(end, last);

        // 시작 페이지가 1이 아니라면 이전 버튼으로 이전 페이지로 이동 가능
        this.prev = start > 1;

        // 토탈값이 총 페이지 사이즈보다 크다면 다음 페이지로 이동 가능
        this.next = totalCount > end * pageRequestDTO.getSize();

        this.pageNumList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());

        // 더이상 이전 페이지로 이동하지 못한다면 0 아니면 start - 1
        this.prevPage = prev ? start - 1 : 0;

        // 더이상 다음 페이지로 이동하지 못한다면 0 아니면 end + 1
        this.nextPage = next ? end + 1 : 0;

        this.totalPage = this.pageNumList.size();

        this.current = pageRequestDTO.getPage();
    }
}
