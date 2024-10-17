import DOMEventService from '@/services/DOMEventService';

export default class BaseApiService {
  baseUrl = 'http://localhost:8080/api';
  resource;

  constructor(resource) {
    if (!resource) throw new Error('Resource is not provided');
    this.resource = resource;
  }

  handleError(err) {
    const errMsg = err.message || '알 수 없는 에러 발생';
    DOMEventService.dispatchApiError(errMsg);
  }
}
