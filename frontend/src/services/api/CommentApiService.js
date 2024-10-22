import ApiService from '@/services/api/config/ApiService';

export default class CommentApiService extends ApiService {
  constructor() {
    super('v1/comments');
  }
}
