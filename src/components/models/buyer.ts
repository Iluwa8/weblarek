// Типы для способа оплаты
import { TPayment } from "../../types";
import { ValidationErrors } from "../../types";

/**
 * Класс для хранения данных покупателя
 * Все поля приватные, нет привязки к шагам оформления
 */
export class Buyer {
  private payment: TPayment = '';
  private email: string = '';
  private phone: string = '';
  private address: string = '';

  /**
   * Конструктор не принимает параметров, инициализирует поля начальными (пустыми) данными
   */
  constructor() {}

  // ==================== СЕТТЕРЫ ====================

  setPayment(payment: TPayment): void {
    this.payment = payment;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  // ==================== ГЕТТЕРЫ ====================

  getPayment(): TPayment {
    return this.payment;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }

  getAddress(): string {
    return this.address;
  }

  // ==================== ВАЛИДАЦИЯ ====================

  /**
   * Валидирует все поля и возвращает объект с ошибками
   * @returns объект с ошибками (пустой объект если ошибок нет)
   */
  validate(): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!this.payment) {
      errors.payment = 'Не выбран способ оплаты';
    }

    if (!this.address.trim()) {
      errors.address = 'Не указан адрес доставки';
    }

    if (!this.email.trim() && !this.phone.trim()) {
      errors.email = 'Укажите email';
      errors.phone = 'Укажите телефон';
    }

    return errors;
  }

  /**
   * Проверяет, валидны ли данные (нет ли ошибок)
   * @returns true если данные валидны, false если есть ошибки
   */
  isValid(): boolean {
    return Object.keys(this.validate()).length === 0;
  }

  /**
   * Очищает все данные покупателя
   */
  clearData(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }
}



// import { TPayment } from '../../types';

// // Тип для объекта ошибок валидации
// type ValidationErrors = {
//   payment?: string;
//   email?: string;
//   phone?: string;
//   address?: string;
// };

// /**
//  * Класс для хранения данных покупателя с валидацией в сеттерах
//  * Все поля приватные, нет привязки к шагам оформления
//  */
// export class Buyer {
//   private payment: TPayment = '';
//   private email: string = '';
//   private phone: string = '';
//   private address: string = '';
  
//   // Приватное поле для хранения ошибок каждого поля
//   private errors: ValidationErrors = {};

//   /**
//    * Конструктор не принимает параметров, инициализирует поля начальными (пустыми) данными
//    */
//   constructor() {}

//   // ==================== СЕТТЕРЫ С ВАЛИДАЦИЕЙ ====================

//   setPayment(payment: TPayment): void {
//     this.payment = payment;
//     // Валидация только этого поля
//     if (!payment) {
//       this.errors.payment = 'Не выбран способ оплаты';
//     } else {
//       delete this.errors.payment;
//     }
//   }

//   setEmail(email: string): void {
//     this.email = email;
//     // Валидация только этого поля
//     this.validateContacts();
//   }

//   setPhone(phone: string): void {
//     this.phone = phone;
//     // Валидация только этого поля
//     this.validateContacts();
//   }

//   setAddress(address: string): void {
//     this.address = address;
//     // Валидация только этого поля
//     if (!address.trim()) {
//       this.errors.address = 'Не указан адрес доставки';
//     } else {
//       delete this.errors.address;
//     }
//   }

//   // ==================== ГЕТТЕРЫ ====================

//   getPayment(): TPayment {
//     return this.payment;
//   }

//   getEmail(): string {
//     return this.email;
//   }

//   getPhone(): string {
//     return this.phone;
//   }

//   getAddress(): string {
//     return this.address;
//   }

//   // ==================== ВАЛИДАЦИЯ ====================

//   /**
//    * Приватный метод для валидации контактов (email или телефон)
//    * Вызывается из сеттеров email и phone
//    */
//   private validateContacts(): void {
//     if (!this.email.trim() && !this.phone.trim()) {
//       this.errors.email = 'Укажите email';
//       this.errors.phone = 'Укажите телефон';
//     } else {
//       delete this.errors.email;
//       delete this.errors.phone;
//     }
//   }

//   /**
//    * Возвращает текущие ошибки валидации
//    * @returns объект с ошибками
//    */
//   getErrors(): ValidationErrors {
//     return { ...this.errors };
//   }

//   /**
//    * Проверяет валидацию конкретных полей
//    * @param fields - массив имен полей для проверки
//    * @returns массив ошибок для указанных полей
//    */
//   checkValidation(fields: (keyof ValidationErrors)[]): string[] {
//     const fieldErrors: string[] = [];
    
//     fields.forEach(field => {
//       if (this.errors[field]) {
//         fieldErrors.push(this.errors[field]!);
//       }
//     });
    
//     return fieldErrors;
//   }

//   /**
//    * Проверяет, валидны ли данные (нет ли ошибок)
//    * @returns true если данные валидны, false если есть ошибки
//    */
//   isValid(): boolean {
//     return Object.keys(this.errors).length === 0;
//   }

//   /**
//    * Очищает все данные покупателя и ошибки
//    */
//   clearData(): void {
//     this.payment = '';
//     this.email = '';
//     this.phone = '';
//     this.address = '';
//     this.errors = {};
//   }
// }