import { httpService } from '@/services/http/http.service';

const path = "/goods"
export const goodsApiService = {
    getGoodsList: async (): Promise<any> => {
        return await httpService.get(`${path}`)
    },
}
