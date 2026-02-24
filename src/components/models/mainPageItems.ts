import { IProduct } from '../../types';

/**
 * Класс для управления каталогом товаров на главной странице
 * Хранит массив всех товаров и выбранную карточку товара
 */
export class MainPageItems {
  // Приватное поле для хранения массива товаров
  private products: IProduct[] = [];
  
  // Приватное поле для хранения выбранной карточки товара
  private selectedCard: IProduct | null = null;

  /**
   * Конструктор не принимает параметров, инициализирует поля начальными (пустыми) данными
   */
  constructor() {}

  /**
   * Сохраняет массив товаров в модель
   * @param products - массив товаров для сохранения
   */
  setAllProducts(products: IProduct[]): void {
    this.products = products;
  }

  /**
   * Возвращает массив всех товаров
   * @returns копия массива товаров
   */
  getAllProducts(): IProduct[] {
    return this.products;
  }

  /**
   * Ищет товар по ID в сохраненном массиве
   * @param id - идентификатор товара
   * @returns найденный товар или undefined
   */
  getProduct(id: string): IProduct | undefined {
    return this.products.find(product => product.id === id);
  }

  /**
   * Сохраняет выбранную карточку товара
   * @param product - товар для сохранения как выбранный
   */
  setProductCard(product: IProduct): void {
    this.selectedCard = product;
  }

  /**
   * Возвращает сохраненную выбранную карточку товара
   * @returns выбранный товар или null
   */
  getProductCard(): IProduct | null {
    return this.selectedCard;
  }
}