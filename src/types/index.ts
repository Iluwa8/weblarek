export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// Интерфейс для продукта

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    isInCard?: true | false;
}

// Типы для способа оплаты
export type PaymentMethod = 'card' | 'cash' | '';

// Интерфейс для покупателя

export interface IBuyer {
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
}

// Тип для ответа сервера с массивом товаров
export interface IApiProductResponse {
  items: IProduct[];
  total: number; // часто сервер возвращает общее количество
}

// Тип для отправки заказа (сверьтесь с Postman!)
export interface IOrderRequest {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
  items: string[]; // обычно отправляются ID товаров
  total: number;
}

// Тип для ответа после создания заказа
export interface IOrderResponse {
  id: string; // ID созданного заказа
  total: number;
}