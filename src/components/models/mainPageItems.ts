import { IProduct } from "../../types";

export class MainPageItems {
  private products: IProduct[] = [];
  private selectedProductCard: IProduct | null = null;

  constructor () {
    this.products = [];
    this.selectedProductCard = null;
  }

    /**
   * Получение массива всех товаров
   * @returns массив товаров
   */
  getAllProducts(): IProduct[] {
    return this.products;
  }

  /**
   * Установка массива товаров
   * @param products - массив товаров для сохранения
   */
  setAllProducts(products: IProduct[]): void {
    this.products = products;
  }

  /**
   * Получение товара по ID
   * @param id - идентификатор товара
   * @returns найденный товар или null
   */
  getProduct(id: string): IProduct | null {
    return this.products.find(product => product.id === id) || null;
  }

  /**
   * Установка выбранной карточки товара
   * @param product - товар для установки как выбранный
   */
  setProductCard(product: IProduct): void {
    this.selectedProductCard = product;
  }

  /**
   * Получение выбранной карточки товара
   * @returns выбранный товар или null
   */
  getProductCard(): IProduct | null {
    return this.selectedProductCard;
  }
}