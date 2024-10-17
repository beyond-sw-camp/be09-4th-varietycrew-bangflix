package com.swcamp9th.bangflixbackend.domain.ranking.dto;

import com.swcamp9th.bangflixbackend.domain.review.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReviewLikeCountDTO {
    private Integer reviewCode;
    private long count;
}