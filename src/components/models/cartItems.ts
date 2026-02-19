import { IProduct } from "../../types";

export class CartItems {
  // Приватное свойство — массив товаров в корзине
  private products: IProduct[] = [];

  constructor () {}

  /**
   * Добавление товара в корзину
   * @param product - товар для добавления
   */
  addProduct(product: IProduct): void {
    // Проверяем, нет ли уже такого товара в корзине
    if (!this.productIsInCart(product.id)) {
      this.products.push(product);
    }
  }

  /**
   * Удаление товара из корзины
   * @param product - товар для удаления (достаточно ID)
   */
  removeProduct(product: IProduct): void {
    this.products = this.products.filter(p => p.id !== product.id);
  }

  /**
   * Получение списка товаров в корзине
   * @returns массив товаров
   */
  getProductsInCart(): IProduct[] {
    return this.products;
  }

  /**
   * Проверка наличия товара в корзине
   * @param id - идентификатор товара
   * @returns true если товар в корзине, иначе false
   */
  productIsInCart(id: string): boolean {
    return this.products.some(product => product.id === id);
  }

  /**
   * Получение количества товаров (вычисляемое значение, не хранится)
   * @returns количество товаров в корзине
   */
  getProductCount(): number {
    return this.products.length;
  }

  /**
   * Получение суммы стоимости товаров (вычисляемое значение, не хранится)
   * @returns общая сумма
   */
  getTotalPrice(): number {
    return this.products.reduce((total, product) => {
      return total + (product.price || 0);
    }, 0);
  }

  /**
   * Оформление заказа
   * Очищает корзину после успешного оформления
   */
  placeAnOrder(): void {
    if (this.products.length === 0) {
      console.warn('Корзина пуста. Невозможно оформить заказ.');
      return;
    }

    // Логика оформления заказа
    console.log('Заказ оформлен:', {
      items: this.products,
      totalCount: this.getProductCount(),
      totalPrice: this.getTotalPrice()
    });

    // Очистка корзины
    this.clearCart();
  }

  /**
   * Очистка корзины (вспомогательный метод)
   */
  clearCart(): void {
    this.products = [];
  }
}