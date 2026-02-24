import { Api } from './components/base/Api';
import { AppApi } from './components/models/appAPI';
import { MainPageItems } from './components/models/mainPageItems';
import { CartItems } from './components/models/cartItems';
import { Buyer } from './components/models/buyer';

const API_URL = import.meta.env.VITE_API_URL || 'https://larek-api.nomoreparties.co/api/weblarek';

const api = new Api(API_URL);
const appApi = new AppApi(api);

const productsModel = new MainPageItems();
const cartModel = new CartItems();
const buyerModel = new Buyer();

console.log('=== НАЧАЛО ТЕСТИРОВАНИЯ ВСЕХ МЕТОДОВ МОДЕЛЕЙ ===');

appApi.getProductList()
  .then((products) => {
    
    // ========== ТЕСТИРОВАНИЕ MainPageItems ==========
    
    console.log('\n--- MainPageItems ---');
    
    // Тест setAllProducts
    productsModel.setAllProducts(products);
    console.log('1. setAllProducts: загружено', products.length, 'товаров');
    
    // Тест getAllProducts
    const allProducts = productsModel.getAllProducts();
    console.log('2. getAllProducts: получено', allProducts.length, 'товаров');
    
    // Тест getProduct (существующий)
    const firstProduct = productsModel.getProduct(products[0].id);
    console.log('3. getProduct (существующий):', firstProduct ? firstProduct.title : 'не найден');
    
    // Тест getProduct (несуществующий)
    const notFound = productsModel.getProduct('fake-id');
    console.log('4. getProduct (несуществующий):', notFound === undefined ? 'undefined (OK)' : 'ОШИБКА');
    
    // Тест setProductCard
    productsModel.setProductCard(products[0]);
    console.log('5. setProductCard: установлен товар', products[0].id);
    
    // Тест getProductCard
    const selected = productsModel.getProductCard();
    console.log('6. getProductCard:', selected ? selected.id === products[0].id ? 'OK' : 'ОШИБКА' : 'null (ОШИБКА)');
    
    
    // ========== ТЕСТИРОВАНИЕ CartItems ==========
    
    console.log('\n--- CartItems ---');
    
    // Тест addProduct (первый)
    cartModel.addProduct(products[0]);
    console.log('7. addProduct (1):', cartModel.getProducts().length, 'товар');
    
    // Тест addProduct (дубликат)
    cartModel.addProduct(products[0]);
    console.log('8. addProduct (дубликат):', cartModel.getProducts().length, 'товар (дубликат отклонен)');
    
    // Тест addProduct (второй)
    cartModel.addProduct(products[1]);
    console.log('9. addProduct (2):', cartModel.getProducts().length, 'товара');
    
    // Тест addProduct (третий)
    cartModel.addProduct(products[2]);
    console.log('10. addProduct (3):', cartModel.getProducts().length, 'товара');
    
    // Тест productIsInCart (есть в корзине)
    const isInCart = cartModel.productIsInCart(products[0].id);
    console.log('11. productIsInCart (есть):', isInCart);
    
    // Тест productIsInCart (нет в корзине)
    const isNotInCart = cartModel.productIsInCart('fake-id');
    console.log('12. productIsInCart (нет):', isNotInCart);
    
    // Тест getProductCount
    console.log('13. getProductCount:', cartModel.getProductCount());
    
    // Тест getTotalPrice
    console.log('14. getTotalPrice:', cartModel.getTotalPrice());
    
    // Тест getProducts
    const cartProducts = cartModel.getProducts();
    console.log('15. getProducts:', cartProducts.length, 'товаров');
    
    // Тест removeProduct (первый)
    cartModel.removeProduct(products[0].id);
    console.log('16. removeProduct (1):', cartModel.getProducts().length, 'товара');
    
    // Тест removeProduct (несуществующий)
    cartModel.removeProduct('fake-id');
    console.log('17. removeProduct (несуществующий):', cartModel.getProducts().length, 'товара (без изменений)');
    
    // Тест clearCart
    cartModel.clearCart();
    console.log('18. clearCart:', cartModel.getProducts().length, 'товаров');
    
    
    // ========== ТЕСТИРОВАНИЕ Buyer (Вариант 1 - простой) ==========
    
    console.log('\n--- Buyer (простой вариант) ---');
    
    // Тест setPayment / getPayment
    buyerModel.setPayment('card');
    console.log('19. setPayment/getPayment:', buyerModel.getPayment());
    
    // Тест setAddress / getAddress
    buyerModel.setAddress('г. Москва, ул. Ленина, д. 1');
    console.log('20. setAddress/getAddress:', buyerModel.getAddress());
    
    // Тест setEmail / getEmail
    buyerModel.setEmail('test@example.com');
    console.log('21. setEmail/getEmail:', buyerModel.getEmail());
    
    // Тест setPhone / getPhone
    buyerModel.setPhone('+79991234567');
    console.log('22. setPhone/getPhone:', buyerModel.getPhone());
    
    // Тест validate (все поля заполнены)
    let errors = buyerModel.validate();
    console.log('23. validate (все поля):', Object.keys(errors).length === 0 ? 'нет ошибок (OK)' : 'есть ошибки (ОШИБКА)');
    
    // Тест isValid
    console.log('24. isValid:', buyerModel.isValid());
    
    // Тест validate (пустые поля)
    const emptyBuyer = new Buyer();
    errors = emptyBuyer.validate();
    console.log('25. validate (пустой):', errors);
    
    // Тест isValid (пустой)
    console.log('26. isValid (пустой):', emptyBuyer.isValid());
    
    // Тест clearData
    buyerModel.clearData();
    console.log('27. clearData:', buyerModel.getPayment(), buyerModel.getAddress(), buyerModel.getEmail(), buyerModel.getPhone());
    
    
    console.log('\n=== ВСЕ ТЕСТЫ ЗАВЕРШЕНЫ ===');
  })
  .catch((error) => {
    console.error('Ошибка:', error);
  });