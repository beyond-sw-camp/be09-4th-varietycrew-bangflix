import ApiService from './config/ApiService';

export default class RankingApiService extends ApiService {
  constructor() {
    super('v1/rankings');
  }

  getMemberRanking() {
    return this.get('members');
  }

  getReviewRanking() {
    return this.get('reviews');
  }

  getRakingWeeks() {
    return this.get('reviews/dates/2024');
  }

  getReviewRankingByDate(date) {
    return this.get('reviews/date', `date=${date}`);
  }
}
