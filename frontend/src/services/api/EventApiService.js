import ApiService from '@/services/api/config/ApiService';

export default class EventApiService extends ApiService {
  constructor() {
    super('v1/event');
  }

  getEvents() {
    return this.get();
  }

  getEventDetailByEventPostCode(id) {
    return this.get(`post/${id}`);
  }
}
