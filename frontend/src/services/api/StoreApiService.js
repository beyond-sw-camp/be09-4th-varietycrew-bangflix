import ApiService from './config/ApiService';

export default class StoreApiService extends ApiService {
  constructor() {
    super('v1/stores');
  }

  getStoreByStoreCode(storeCode) {
    return this.get(storeCode);
  }

  getStoreBestReview(storeCode) {
    return this.get(`bestreview/${storeCode}`);
  }
}
