// Типы для способа оплаты
type PaymentMethod = 'card' | 'cash' | '';

// Интерфейс для конфигурации покупателя
interface IBuyer {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
}

// Тип для ошибок валидации
type ValidationError = {
  field: string;
  message: string;
};

export class Buyer {
  // Хранимые данные
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;

  // Состояние валидации (для управления кнопками)
  private errors: ValidationError[] = [];
  private isFirstStepValid: boolean = false;
  private isSecondStepValid: boolean = false;

  constructor(config: IBuyer) {
    this.payment = config.payment;
    this.email = config.email;
    this.phone = config.phone;
    this.address = config.address;
  }

  // ==================== СОХРАНЕНИЕ ДАННЫХ ====================

  /**
   * Сохранение способа оплаты
   */
  setPayment(payment: PaymentMethod): void {
    this.payment = payment;
  }

  /**
   * Сохранение адреса доставки
   */
  setAddress(address: string): void {
    this.address = address;
  }

  /**
   * Сохранение email
   */
  setEmail(email: string): void {
    this.email = email;
  }

  /**
   * Сохранение телефона
   */
  setPhone(phone: string): void {
    this.phone = phone;
  }

  // ==================== ПОЛУЧЕНИЕ ДАННЫХ ====================

  /**
   * Получение адреса доставки
   * Проверяет наличие данных (обязательное поле)
   */
  getBuyerAddress(): string {
    this.checkBuyerAddress();
    return this.address;
  }

  /**
   * Получение способа оплаты
   * Проверяет наличие данных (обязательное поле)
   */
  getBuyerPayment(): string {
    this.checkBuyerPayment();
    return this.payment;
  }

  /**
   * Получение email
   * Проверяет наличие данных (обязательно одно из: email или phone)
   */
  getBuyerEmail(): string {
    this.checkBuyerEmail();
    return this.email;
  }

  /**
   * Получение телефона
   * Проверяет наличие данных (обязательно одно из: email или phone)
   */
  getBuyerPhone(): string {
    this.checkBuyerPhone();
    return this.phone;
  }

  // ==================== ПРОВЕРКА ДАННЫХ (ШАГ 1) ====================

  /**
   * Проверка наличия адреса доставки
   * Если данных нет — выводит ошибку и блокирует кнопку
   */
  checkBuyerAddress(): void {
    this.clearError('address');
    
    if (!this.address || this.address.trim() === '') {
      this.addError('address', 'Не указан адрес доставки');
      this.isFirstStepValid = false;
      this.disableContinueButton();
      throw new Error('Не указан адрес доставки');
    }
    
    this.updateFirstStepValidation();
  }

  /**
   * Проверка выбора способа оплаты
   * Если данных нет — выводит ошибку и блокирует кнопку
   */
  checkBuyerPayment(): void {
    this.clearError('payment');
    
    // Исправление ошибки 2367: проверяем длину строки вместо сравнения с ''
    if (!this.payment || this.payment.length === 0) {
      this.addError('payment', 'Не выбран способ оплаты');
      this.isFirstStepValid = false;
      this.disableContinueButton();
      throw new Error('Не выбран способ оплаты');
    }
    
    // Проверка корректности значения
    if (this.payment !== 'card' && this.payment !== 'cash') {
      this.addError('payment', 'Некорректный способ оплаты');
      this.isFirstStepValid = false;
      this.disableContinueButton();
      throw new Error('Некорректный способ оплаты');
    }
    
    this.updateFirstStepValidation();
  }

  /**
   * Проверка первого шага полностью
   * Вызывается перед нажатием "Далее"
   */
  validateFirstStep(): boolean {
    try {
      this.checkBuyerAddress();
      this.checkBuyerPayment();
      return true;
    } catch (error) {
      return false;
    }
  }

  // ==================== ПРОВЕРКА ДАННЫХ (ШАГ 2) ====================

  /**
   * Проверка email
   * Если email не заполнен — проверяет наличие телефона
   * Одно из полей (email или phone) должно быть заполнено обязательно
   */
  checkBuyerEmail(): void {
    this.clearError('email');
    
    const hasEmail = !!this.email && this.email.trim() !== '';
    const hasPhone = !!this.phone && this.phone.trim() !== '';
    
    if (!hasEmail && !hasPhone) {
      this.addError('email', 'Укажите email или номер телефона');
      this.addError('phone', 'Укажите email или номер телефона');
      this.isSecondStepValid = false;
      this.disablePayButton();
      throw new Error('Укажите email или номер телефона');
    }
    
    this.updateSecondStepValidation();
  }

  /**
   * Проверка телефона
   * Если телефон не заполнен — проверяет наличие email
   * Одно из полей (email или phone) должно быть заполнено обязательно
   */
  checkBuyerPhone(): void {
    this.clearError('phone');
    
    const hasEmail = !!this.email && this.email.trim() !== '';
    const hasPhone = !!this.phone && this.phone.trim() !== '';
    
    if (!hasPhone && !hasEmail) {
      this.addError('phone', 'Укажите номер телефона или email');
      this.addError('email', 'Укажите номер телефона или email');
      this.isSecondStepValid = false;
      this.disablePayButton();
      throw new Error('Укажите номер телефона или email');
    }
    
    this.updateSecondStepValidation();
  }

  /**
   * Проверка второго шага полностью
   * Вызывается перед нажатием "Оплатить"
   */
  validateSecondStep(): boolean {
    try {
      this.checkBuyerEmail();
      this.checkBuyerPhone();
      return true;
    } catch (error) {
      return false;
    }
  }

  // ==================== ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ ====================

  /**
   * Проверка всех данных перед оформлением заказа
   */
  validateAll(): boolean {
    return this.validateFirstStep() && this.validateSecondStep();
  }

  /**
   * Получение списка ошибок
   */
  getErrors(): ValidationError[] {
    return this.errors;
  }

  /**
   * Очистка всех данных покупателя
   * Вызывается после успешной оплаты
   */
  clearBuyerData(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.errors = [];
    this.isFirstStepValid = false;
    this.isSecondStepValid = false;
  }

  /**
   * Получение всех данных покупателя
   */
  getBuyerData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address
    };
  }

  // ==================== ПРИВАТНЫЕ МЕТОДЫ ====================

  private addError(field: string, message: string): void {
    this.errors.push({ field, message });
    console.error(`Ошибка валидации [${field}]: ${message}`);
  }

  private clearError(field: string): void {
    this.errors = this.errors.filter(e => e.field !== field);
  }

  private updateFirstStepValidation(): void {
    // Исправление ошибки 2322: явное приведение к boolean через !!
    const hasAddress: boolean = !!this.address && this.address.trim() !== '';
    const hasPayment: boolean = (this.payment === 'card' || this.payment === 'cash');
    
    this.isFirstStepValid = hasAddress && hasPayment;
    
    if (this.isFirstStepValid) {
      this.enableContinueButton();
    }
  }

  private updateSecondStepValidation(): void {
    // Исправление ошибки 2322: явное приведение к boolean
    const hasEmail: boolean = !!this.email && this.email.trim() !== '';
    const hasPhone: boolean = !!this.phone && this.phone.trim() !== '';
    
    // Одно из полей должно быть заполнено
    this.isSecondStepValid = hasEmail || hasPhone;
    
    if (this.isSecondStepValid) {
      this.enablePayButton();
    }
  }

  private disableContinueButton(): void {
    // Логика блокировки кнопки "Далее"
    console.log('Кнопка "Далее" заблокирована');
  }

  private enableContinueButton(): void {
    console.log('Кнопка "Далее" активна');
  }

  private disablePayButton(): void {
    console.log('Кнопка "Оплатить" заблокирована');
  }

  private enablePayButton(): void {
    console.log('Кнопка "Оплатить" активна');
  }
}