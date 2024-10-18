import ApiService from '@/services/api/config/ApiService';

export default class ReviewApiService extends ApiService {
  constructor() {
    super('v1/reviews');
  }

  getStatisticsByThemeCode(themeCode) {
    return this.get(`statistics/${themeCode}`);
  }

  getReviewsByThemeCode(themeCode, page = 0, filter = '') {
    const params = new URLSearchParams();
    params.append('page', page);
    if (filter) {
      params.append('filter', filter);
    }

    return this.get(themeCode, params.toString());
  }
}
