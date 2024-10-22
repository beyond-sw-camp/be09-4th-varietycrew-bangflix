import PostApiService from '@/services/api/PostApiService';
import AuthApiService from '@/services/api/AuthApiService';
import UserApiService from '@/services/api/UserService';
import ThemeApiService from '@/services/api/ThemeApiService';
import ReviewApiService from './ReviewApiService';
import NoticeApiService from '@/services/api/NoticeApiService';
import RankingApiService from './RankingApiService';
import BoardApiService from './BoardApiService';
import CommunityLikeApiService from './CommunityLikeApiService';
import CommentApiService from './CommentApiService';
import StoreApiService from './StoreApiService';
import EventApiService from '@/services/api/EventApiService';

export const $api = {
  posts: new PostApiService(),
  auth: new AuthApiService(),
  user: new UserApiService(),
  theme: new ThemeApiService(),
  review: new ReviewApiService(),
  notice: new NoticeApiService(),
  ranking: new RankingApiService(),
  community: new BoardApiService(),
  comment: new CommentApiService(),
  postLike: new CommunityLikeApiService(),
  store: new StoreApiService(),
  event: new EventApiService(),
};
