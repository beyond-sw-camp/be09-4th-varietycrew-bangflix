package com.swcamp9th.bangflixbackend.domain.review.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "review_like")
@IdClass(ReviewLikeId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewLike {

    @Id
    @Column(name = "member_code", nullable = false)
    private Integer memberCode;

    @Id
    @Column(name = "review_code", nullable = false)
    private Integer reviewCode;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "active", nullable = false)
    private Boolean active;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code", insertable = false, updatable = false)
    private ReviewMember member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_code", insertable = false, updatable = false)
    private Review review;
}