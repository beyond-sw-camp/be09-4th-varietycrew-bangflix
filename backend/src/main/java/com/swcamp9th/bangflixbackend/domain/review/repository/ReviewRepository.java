package com.swcamp9th.bangflixbackend.domain.review.repository;

import com.swcamp9th.bangflixbackend.domain.review.dto.StatisticsReviewDTO;
import com.swcamp9th.bangflixbackend.domain.review.entity.Review;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    @Query("SELECT r FROM Review r JOIN FETCH r.member JOIN FETCH r.theme "
        + "WHERE r.theme.themeCode = :themeCode AND r.active = true "
        + "ORDER BY r.createdAt desc ")
    List<Review> findByThemeCodeAndActiveTrueWithFetchJoin(@Param("themeCode") Integer themeCode, Pageable pageable);

    @Query("SELECT new com.swcamp9th.bangflixbackend.domain.review.dto.StatisticsReviewDTO(" +
        // 평균 점수 계산
        "AVG(r.totalScore), " +

        // Score 비율 계산
        "CAST(COUNT(CASE WHEN r.totalScore = 10 THEN 1 END) / COUNT(r.totalScore) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.totalScore = 8 THEN 1 END) / COUNT(r.totalScore) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.totalScore = 6 THEN 1 END) / COUNT(r.totalScore) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.totalScore = 4 THEN 1 END) / COUNT(r.totalScore) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.totalScore = 2 THEN 1 END) / COUNT(r.totalScore) * 100 AS int), " +

        // Level 비율 계산
        "CAST(COUNT(CASE WHEN r.level = 'ONE' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.level = 'TWO' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.level = 'THREE' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.level = 'FOUR' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.level = 'FIVE' THEN 1  END) / COUNT(r) * 100 AS int), " +

        // HorrorLevel 비율 계산
        "CAST(COUNT(CASE WHEN r.horrorLevel = 'ONE' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.horrorLevel = 'TWO' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.horrorLevel = 'THREE' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.horrorLevel = 'FOUR' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.horrorLevel = 'FIVE' THEN 1  END) / COUNT(r) * 100 AS int), " +

        // Active 비율 계산
        "CAST(COUNT(CASE WHEN r.activity = 'ONE' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.activity = 'TWO' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.activity = 'THREE' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.activity = 'FOUR' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.activity = 'FIVE' THEN 1  END) / COUNT(r) * 100 AS int), " +

        // Interior 비율 계산
        "CAST(COUNT(CASE WHEN r.interior = 'ONE' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.interior = 'TWO' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.interior = 'THREE' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.interior = 'FOUR' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.interior = 'FIVE' THEN 1  END) / COUNT(r) * 100 AS int), " +

        // Probability 비율 계산
        "CAST(COUNT(CASE WHEN r.probability = 'ONE' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.probability = 'TWO' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.probability = 'THREE' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.probability = 'FOUR' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.probability = 'FIVE' THEN 1  END) / COUNT(r) * 100 AS int), " +

        // Composition 비율 계산
        "CAST(COUNT(CASE WHEN r.composition = 'ONE' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.composition = 'TWO' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.composition = 'THREE' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.composition = 'FOUR' THEN 1  END) / COUNT(r) * 100 AS int), " +
        "CAST(COUNT(CASE WHEN r.composition = 'FIVE' THEN 1  END) / COUNT(r) * 100 AS int)) " +

        "FROM Review r WHERE r.theme.themeCode = :themeCode AND r.active = true"
    )
    StatisticsReviewDTO findStatisticsByThemeCode(@Param("themeCode") Integer themeCode);
}