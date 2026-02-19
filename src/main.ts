import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";
import { AppApi } from "./components/models/appAPI";

import { Buyer } from "./components/models/buyer";
import { CartItems } from "./components/models/cartItems";
import { MainPageItems } from "./components/models/mainPageItems";

// URL сервера (проверьте в стартере или документации)
// const API_URL = 'https://larek-api.nomoreparties.co/api/weblarek';

// ==================== ИНИЦИАЛИЗАЦИЯ API ====================

// Создаём базовый клиент API
const api = new Api(API_URL);

// Создаём коммуникационный слой (композиция)
const appApi = new AppApi(api);

// ==================== ИНИЦИАЛИЗАЦИЯ МОДЕЛЕЙ ====================

const productsModel = new MainPageItems();
const cartModel = new CartItems();
const buyerModel = new Buyer({
  payment: '',
  email: '',
  phone: '',
  address: ''
});

// ==================== ПОЛУЧЕНИЕ ДАННЫХ С СЕРВЕРА ====================

console.log('=== ЗАГРУЗКА ДАННЫХ С СЕРВЕРА ===');

// Получаем каталог товаров с сервера
appApi.getProductList()
  .then((products) => {
    console.log('1. Товары получены с сервера:', products);
    
    // Сохраняем в модель
    productsModel.setAllProducts(products);
    
    // Проверяем, что сохранилось
    console.log('2. Товары в модели:', productsModel.getAllProducts());
    console.log('3. Количество товаров:', productsModel.getAllProducts().length);
    
    // Тестируем получение по ID (если есть товары)
    if (products.length > 0) {
      const testProduct = productsModel.getProduct(products[0].id);
      console.log('4. Первый товар по ID:', testProduct);
    }
  })
  .catch((error) => {
    console.error('Ошибка загрузки товаров:', error);
  });

// ... после загрузки товаров с сервера

// ==================== ТЕСТИРОВКА CartItems ====================

console.log('\n=== ТЕСТИРОВКА КОРЗИНЫ ===');

// Добавляем первый товар в корзину
const products = productsModel.getAllProducts();
if (products.length > 0) {
  cartModel.addProduct(products[0]);
  console.log('Товар добавлен в корзину:', cartModel.getProductsInCart());
  console.log('Количество товаров:', cartModel.getProductCount());
  console.log('Сумма:', cartModel.getTotalPrice());
  console.log('Товар в корзине?', cartModel.productIsInCart(products[0].id));
}

// ==================== ТЕСТИРОВКА Buyer ====================

console.log('\n=== ТЕСТИРОВКА ПОКУПАТЕЛЯ ===');

// Устанавливаем данные
buyerModel.setPayment('card');
buyerModel.setAddress('г. Москва, ул. Ленина, д. 1');
buyerModel.setEmail('test@example.com');

console.log('Данные покупателя:', buyerModel.getBuyerData());
console.log('Валидность шага 1:', buyerModel.validateFirstStep());
console.log('Валидность шага 2:', buyerModel.validateSecondStep());