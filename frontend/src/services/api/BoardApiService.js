import ApiService from '@/services/api/config/ApiService';

export default class BoardApiService extends ApiService {
  constructor() {
    super('v1/community');
  }

  getCommunityPosts() {
    return this.get('');
  }

  getCommentCount(communityPostCode) {
    return this.get(`post/${communityPostCode}/comments/count`);
  }

  getPostDetailByPostCode(communityPostCode) {
    return this.get(`post/${communityPostCode}`);
  }

  getCommentsByPostCode(communityPostCode) {
    return this.get(`post/${communityPostCode}/comments`);
  }

  submitComment(communityPostCode, commentData) {
    return this.post({ content: commentData.content }, `post/${communityPostCode}/comments`);
  }

  updateComment(communityPostCode, commentCode, content) {
    return this.put({ content }, `post/${communityPostCode}/comments/${commentCode}`);
  }

  deleteComment(communityPostCode, commentCode) {
    return this.delete({}, `post/${communityPostCode}/comments/${commentCode}`);
  }
}
