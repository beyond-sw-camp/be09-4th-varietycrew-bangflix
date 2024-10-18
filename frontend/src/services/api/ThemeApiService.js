import ApiService from '@/services/api/config/ApiService';

export default class ThemeApiService extends ApiService {
  constructor() {
    super('v1/themes');
  }

  getGenres() {
    return this.get('genres');
  }

  /**
   *
   * @param {string} themeName
   * @param {Array} genres // 장르 코드 배열: [number, number]
   * @param {string} filter // like, scrap, review
   * @returns
   */
  searchThemes(themeName = '', genres = [], filter = '') {
    const params = new URLSearchParams();
    params.set('page', '0');
    if (themeName) {
      params.set('content', themeName);
    }
    if (genres.length > 0) {
      params.set('genres', genres.join(','));
    }
    if (filter) {
      params.set('filter', filter);
    }

    return this.get('', params.toString());
  }

  getTheme(themeCode) {
    return this.get(themeCode);
  }

  /**
   *
   * @param {string} type // like, scrap
   * @param {boolean} isActive
   * @returns
   */
  getReactions(type) {
    const params = new URLSearchParams();
    params.set('reaction', type);

    return this.get('reactions/member', params);
  }

  setReactions(type, isActive, themeCode) {
    if (isActive) {
      return this.post(
        {
          themeCode,
          reaction: type,
        },
        'reaction',
      );
    }

    return this.delete(
      {
        themeCode,
        reaction: type,
      },
      'reaction',
    );
  }
}
