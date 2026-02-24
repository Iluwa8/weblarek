import { IProduct } from '../../types';

/**
 * Класс для управления корзиной покупок
 * Хранит массив товаров, добавленных в корзину
 */
export class CartItems {
  // Приватное поле для хранения товаров в корзине
  private products: IProduct[] = [];

  /**
   * Конструктор не принимает параметров, инициализирует поля начальными (пустыми) данными
   */
  constructor() {}

  /**
   * Добавляет товар в корзину
   * Проверяет, что товар еще не добавлен (по ID)
   * @param product - товар для добавления
   */
  addProduct(product: IProduct): void {
    if (!this.productIsInCart(product.id)) {
      this.products.push(product);
    }
  }

  /**
   * Удаляет товар из корзины по ID
   * @param productId - идентификатор товара для удаления
   */
  removeProduct(productId: string): void {
    this.products = this.products.filter(product => product.id !== productId);
  }

  /**
   * Возвращает массив товаров в корзине
   * @returns копия массива товаров
   */
  getProducts(): IProduct[] {
    return this.products;
  }

  /**
   * Проверяет, находится ли товар в корзине
   * @param productId - идентификатор товара
   * @returns true если товар в корзине, false если нет
   */
  productIsInCart(productId: string): boolean {
    return this.products.some(product => product.id === productId);
  }

  /**
   * Возвращает количество товаров в корзине
   * @returns число товаров
   */
  getProductCount(): number {
    return this.products.length;
  }

  /**
   * Вычисляет общую стоимость товаров в корзине
   * @returns сумма цен всех товаров (товары без цены считаются как 0)
   */
  getTotalPrice(): number {
    return this.products.reduce((total, product) => {
      return total + (product.price || 0);
    }, 0);
  }

  /**
   * Очищает корзину (удаляет все товары)
   */
  clearCart(): void {
    this.products = [];
  }
}