import BaseApiService from '@/services/api/config/BaseApiService';
import DOMEventService from '@/services/DOMEventService';
import { useUserStore } from '@/stores/user';
import TokenRefreshStatus from '@/utils/TokenRefreshStatus';

export default class ApiService extends BaseApiService {
  #userStore;

  constructor(resource) {
    super(resource);

    const userStore = useUserStore();
    this.#userStore = userStore;
  }

  async #handleTokenExpired(url, options) {
    // 한 페이지에 여러 request가 동작할 수도 있음 -> 토큰 갱신이 여러번 요청 되는 경우를 막기
    if (!TokenRefreshStatus.isRefreshing) {
      TokenRefreshStatus.isRefreshing = true;

      // 토큰 갱신 진행
      const url = `${this.baseUrl}/v1/auth/refresh`;
      const refreshToken = this.#userStore.refreshToken;
      const response = await fetch(url, {
        method: 'POST',
        body: { refreshToken },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // 리프레시 토큰도 만료인 경우
        DOMEventService.dispatchExpiredToken();
        return;
      }

      // 토큰 재셋팅
      const { status, msg, result } = await response.json();
      this.#userStore.setToken(result.accessToken);

      // 다시 요청
      TokenRefreshStatus.requestQueue.forEach(req => this.#callApi(req.url, req.options));

      // clear
      TokenRefreshStatus.isRefreshing = false;
      TokenRefreshStatus.requestQueue = [];
    } else {
      TokenRefreshStatus.requestQueue.push({ url, options });
    }
  }

  // 요청을 처리하는 부분
  async #callApi(url, options) {
    try {
      // headers 값 셋팅
      const myHeaders = new Headers();

      if (this.#userStore.accessToken) {
        myHeaders.append('Authorization', `Bearer ${this.#userStore.accessToken}`);
      }

      // form data가 아니면 Content-Type 추가
      if (options?.body && !(options.body instanceof FormData)) {
        myHeaders.append('Content-Type', 'application/json');
      }

      const fetchOptions = { ...options };
      fetchOptions['headers'] = myHeaders;

      // 요청 시작
      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        // 토큰이 만료된 경우에는 따로 처리
        if (response.status === 401) {
          return this.#handleTokenExpired(url, fetchOptions);
        }

        throw response;
      }

      return await response.json();
    } catch (err) {
      // 서버에서 보내주는 에러 메시지 뽑기
      err.json().then(errResponse => {
        this.handleError(errResponse?.msg || '서버 요청 중 문제가 발생했습니다.');
      });
    }
  }

  async get(subUrl, queryParams) {
    let url = `${this.baseUrl}/${this.resource}`;
    if (subUrl) {
      url += `/${subUrl}`;
    }
    if (queryParams) {
      url += `?${queryParams}`;
    }

    const responseData = await this.#callApi(url);
    return responseData.result;
  }

  async post(data = {}, subUrl) {
    let url = `${this.baseUrl}/${this.resource}`;
    if (subUrl) {
      url += `/${subUrl}`;
    }

    let requestBody = JSON.stringify(data);

    // formData 자체로 넘어올 예정
    if (data instanceof FormData) {
      requestBody = data;
    }

    const options = {
      method: 'POST',
      body: requestBody,
    };

    const responseData = await this.#callApi(url, options);
    DOMEventService.dispatchApiSuccess(responseData.msg || '성공');

    return responseData.result;
  }

  async put(data = {}, subUrl) {
    let url = `${this.baseUrl}/${this.resource}`;
    if (subUrl) {
      url += `/${subUrl}`;
    }

    let requestBody = JSON.stringify(data);

    // formData 자체로 넘어올 예정
    if (data instanceof FormData) {
      requestBody = data;
    }

    const options = {
      method: 'PUT',
      body: requestBody,
    };

    const responseData = await this.#callApi(url, options);
    DOMEventService.dispatchApiSuccess(responseData.msg || '성공');

    return responseData.result;
  }

  async delete(data, subUrl) {
    let url = `${this.baseUrl}/${this.resource}`;
    if (subUrl) {
      url += `/${subUrl}`;
    }

    const options = {
      method: 'DELETE',
      body: JSON.stringify(data),
    };

    const responseData = await this.#callApi(url, options);
    DOMEventService.dispatchApiSuccess(responseData.msg || '성공');

    return responseData.result;
  }
}
