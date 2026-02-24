import { IApi, IProduct, IOrderRequest, IOrderResponse, IApiProductResponse } from '../../types';

/**
 * Класс коммуникационного слоя
 * Отвечает за взаимодействие с сервером "веб-ларёк"
 * Использует композицию: принимает реализацию IApi в конструкторе
 */
export class AppApi {
  // Приватное поле для хранения экземпляра API клиента
  private api: IApi;

  /**
   * Конструктор принимает готовый экземпляр API клиента
   * @param api - объект, реализующий интерфейс IApi
   */
  constructor(api: IApi) {
    this.api = api;
  }

  /**
   * Получает список товаров с сервера
   * GET-запрос на эндпоинт /product/
   * @returns Promise с массивом товаров
   */
  getProductList(): Promise<IProduct[]> {
    return this.api.get<IApiProductResponse>('/product/')
      .then((response) => response.items);
  }

  /**
   * Отправляет заказ на сервер
   * POST-запрос на эндпоинт /order/
   * @param order - объект с данными заказа
   * @returns Promise с ответом сервера
   */
  createOrder(order: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>('/order/', order);
  }
}