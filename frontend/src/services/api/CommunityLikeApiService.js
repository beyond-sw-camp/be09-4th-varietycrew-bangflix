import ApiService from '@/services/api/config/ApiService';

export default class CommunityLikeApiService extends ApiService {
  constructor() {
    super('v1/community-like');
  }

  getLikeCount(communityPostCode) {
    return this.get(`${communityPostCode}`);
  }

  toggleLike(communityPostCode) {
    return this.post({ communityPostCode });
  }
}
