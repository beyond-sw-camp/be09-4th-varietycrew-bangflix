import ApiService from '@/services/api/config/ApiService';

export default class AuthApiService extends ApiService {
  constructor() {
    super('v1/auth');
  }

  sendEmailVerifyCode(email) {
    return this.post({ email }, 'send-email');
  }

  verifyEmail(email, code) {
    return this.post({ email, code }, 'confirm-email');
  }
}
