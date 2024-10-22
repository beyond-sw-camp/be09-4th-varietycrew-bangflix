import ApiService from '@/services/api/config/ApiService';

export default class NoticeApiService extends ApiService {
  constructor() {
    super('v1/notice');
  }

  getNoticesByPage(page, size = 6) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('size', size);
    return this.get('', params.toString());
  }

  getNoticeDetailByNoticeCode(id) {
    return this.get(`post/${id}`);
  }
}
