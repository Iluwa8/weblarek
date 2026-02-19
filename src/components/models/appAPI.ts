import { IApi, IProduct, IOrderRequest, IOrderResponse, IApiProductResponse } from '../../types';

export class AppApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  /**
   * Получение каталога товаров с сервера
   * @returns Promise с массивом товаров
   */
  getProductList(): Promise<IProduct[]> {
    return this.api.get<IApiProductResponse>('/product/')
      .then((response) => response.items);
  }

  /**
   * Отправка заказа на сервер
   * @param order - данные заказа
   * @returns Promise с ответом сервера
   */
  createOrder(order: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>('/order/', order);
  }
}