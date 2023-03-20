import axios from 'axios';

export const headersAppJSON = { 'Content-Type': 'application/json' };

const baseApiUrl = "https://hungry-lemons-enter-92-49-239-250.loca.lt";


const _axiosInstance = axios.create({
    baseURL: baseApiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const httpService = {
    get: <T>(url: string, p: any = {}): Promise<any> => {
      const { query, ...params } = p;
      const _url = query
        ? url + '?'
        : url;
      return _axiosInstance.get(_url, {
        params: { ...params },
      });
    },
  
    post: <T>(
      url: string,
      body: unknown | undefined,
      p: any = {},
    ): Promise<any> => {
      const { query, ...params } = p;
      return _axiosInstance.post(url, body, { params: query, ...params, data: body });
    },
  
    put: <T>(
      url: string,
      body: unknown,
      p: any = {},
    ): Promise<any> => {
      const { query, ...params } = p;
  
      return _axiosInstance.put(url, body, { params: query, ...params, data: body });
    },
    patch: <T>(
      url: string,
      body: unknown,
      p: any = {},
    ): Promise<any> => {
      const { query, ...params } = p;
      return _axiosInstance.patch(url, body, { params: query, ...params, data: body });
    },
    delete: <T>(
      url: string,
      body: unknown,
      p: any = {},
    ): Promise<any> => {
      const { query, ...params } = p;
      return _axiosInstance.delete(url, { params: query, ...params, data: body });
    },
};