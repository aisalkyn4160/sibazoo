document.addEventListener('DOMContentLoaded', function() {
  // Константы
  const DELIVERY_COST = 450;
  const FREE_DELIVERY_THRESHOLD = 5000;

  // Основные элементы
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalInfo = document.querySelector('.cart-total-info');
  const cartTotalEmpty = document.querySelector('.cart-total-empty');
  const checkoutBtn = document.querySelector('.cart-total-info .btn');
  const progressFill = document.querySelector('.progress-fill');
  const progressValue = document.querySelector('.progress-value');
  const progressText = document.querySelector('.progress-text');

  // Инициализация корзины
  initCart();

  function initCart() {
    // Инициализация счетчиков для всех товаров
    initCounters();
    
    // Скрываем сообщение при загрузке, если есть товары
    const hasItems = document.querySelectorAll('.cart-item').length > 0;
    cartTotalEmpty.style.display = hasItems ? 'none' : 'block';
    cartTotalInfo.style.display = hasItems ? 'flex' : 'none';
    
    // Сбрасываем все значения
    resetCartSummary();
    setupEventListeners();
    updateCart();
  }

  function initCounters() {
    // Инициализация счетчиков для всех товаров
    document.querySelectorAll('.counter').forEach(counter => {
      const minus = counter.querySelector('.counter-minus');
      const plus = counter.querySelector('.counter-plus');
      const value = counter.querySelector('.counter-value');
      
      minus.addEventListener('click', () => {
        let count = parseInt(value.textContent);
        if (count > 1) {
          value.textContent = --count;
          updateCart();
        }
      });
      
      plus.addEventListener('click', () => {
        let count = parseInt(value.textContent);
        value.textContent = ++count;
        updateCart();
      });
    });
  }

  function resetCartSummary() {
    updateElementText('.cart-total-item-count', '0 товаров');
    updateElementText('.cart-total-item-weight', 'Вес заказа: 0 кг');
    updateElementText('.cart-total-item-price', '0 ₽');
    updateElementText('.cart-total-price', '0 ₽');
    
    // Сбрасываем прогресс доставки
    updateDeliveryProgress(0);
    if (progressText) {
      progressText.textContent = `До бесплатной доставки осталось: ${formatPrice(FREE_DELIVERY_THRESHOLD)} ₽`;
    }
  }

  function setupEventListeners() {
    // Обработчик для "Выбрать все"
    document.getElementById('selectAll')?.addEventListener('change', function() {
      const isChecked = this.checked;
      document.querySelectorAll('.cart-select-checkbox input').forEach(checkbox => {
        checkbox.checked = isChecked;
        checkbox.closest('.cart-item').classList.toggle('selected', isChecked);
      });
      updateRemoveButton();
      updateCart();
    });

    // Делегирование событий для кликов
    cartItemsContainer.addEventListener('click', function(e) {
      // Удаление товара
      if (e.target.closest('.cart-item-remove')) {
        e.target.closest('.cart-item').remove();
        updateCart();
        return;
      }
    });

    // Изменение состояния чекбоксов
    cartItemsContainer.addEventListener('change', function(e) {
      if (e.target.matches('.cart-select-checkbox input')) {
        const checkbox = e.target;
        checkbox.closest('.cart-item').classList.toggle('selected', checkbox.checked);
        updateSelectAllCheckbox();
        updateRemoveButton();
        updateCart();
      }
    });

    // Кнопка "Удалить выбранные"
    document.querySelector('.remove-selected')?.addEventListener('click', function() {
      const selectedItems = document.querySelectorAll('.cart-item.selected');
      if (selectedItems.length === 0) {
        alert('Выберите товары для удаления');
        return;
      }
      
      selectedItems.forEach(item => item.remove());
      document.getElementById('selectAll').checked = false;
      updateCart();
    });

    // Оформление заказа
    checkoutBtn?.addEventListener('click', function() {
      const { itemsCount, finalPrice } = calculateTotals();
      
      if (itemsCount === 0) {
        alert('Выберите хотя бы один товар для оформления заказа');
        return;
      }
      
      alert(`Заказ оформлен!\nТоваров: ${itemsCount}\nСумма: ${formatPrice(finalPrice)} ₽`);
    });
  }

  // ... (остальные функции остаются без изменений)
  function calculateTotals() {
    let totalPrice = 0;
    let totalWeight = 0;
    let itemsCount = 0;

    // Учитываем только выбранные товары
    document.querySelectorAll('.cart-item.selected').forEach(item => {
      const price = parsePrice(item.querySelector('.product-price').textContent);
      const weight = parseFloat(item.querySelector('.product-card-size').textContent);
      const quantity = parseInt(item.querySelector('.counter-value').textContent);
      
      totalPrice += price * quantity;
      totalWeight += weight * quantity;
      itemsCount += quantity;
    });

    const deliveryCost = totalPrice >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_COST;
    const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - totalPrice);
    const deliveryProgress = Math.min(100, (totalPrice / FREE_DELIVERY_THRESHOLD) * 100);
    
    return {
      totalPrice,
      totalWeight,
      itemsCount,
      deliveryCost,
      finalPrice: totalPrice + deliveryCost,
      remainingForFreeDelivery,
      deliveryProgress
    };
  }

  function updateDeliveryProgress(progress) {
    // Обновляем круговой индикатор
    const circumference = 2 * Math.PI * 15.9155;
    const dashoffset = circumference - (progress / 100) * circumference;
    
    if (progressFill) {
      progressFill.style.strokeDashoffset = dashoffset;
    }
    
    if (progressValue) {
      progressValue.textContent = `${Math.round(progress)}%`;
    }
  }

  function updateCart() {
    const { 
      totalPrice, 
      totalWeight, 
      itemsCount, 
      deliveryCost, 
      finalPrice,
      remainingForFreeDelivery,
      deliveryProgress
    } = calculateTotals();

    // Получаем общее количество товаров в корзине
    const totalItemsInCart = document.querySelectorAll('.cart-item').length;
    // Получаем количество выбранных товаров
    const selectedItemsCount = itemsCount;

    if (selectedItemsCount > 0) {
      // Если есть выбранные товары - показываем блок оформления
      updateElementText('.cart-total-item-count', `${itemsCount} ${pluralize(itemsCount, ['товар', 'товара', 'товаров'])}`);
      updateElementText('.cart-total-item-weight', `Вес заказа: ${totalWeight} кг`);
      updateElementText('.cart-total-item-price', `${formatPrice(totalPrice)} ₽`);
      updateElementText('.cart-total-price', `${formatPrice(finalPrice)} ₽`);
      
      // Обновляем информацию о доставке
      const deliveryElement = document.querySelector('.cart-total-item:nth-child(2) div');
      if (deliveryElement) {
        deliveryElement.textContent = deliveryCost === 0 ? 'Бесплатно' : `${formatPrice(deliveryCost)} ₽`;
      }
      
      // Обновляем прогресс доставки
      updateDeliveryProgress(deliveryProgress);
      if (progressText) {
        progressText.textContent = deliveryCost === 0 
          ? 'Доставка будет бесплатной' 
          : `Ещё ${formatPrice(remainingForFreeDelivery)} ₽`;
      }

      if(deliveryCost === 0 ){
        document.querySelector('.progress-subtext').style.display = 'none';
        document.querySelector('.truck-icon svg').classList.add('active');
      }else{
        document.querySelector('.progress-subtext').style.display = 'block';
        document.querySelector('.truck-icon svg').classList.remove('active');
      }
      // Показываем блок оформления заказа
      cartTotalInfo.style.display = 'flex';
      cartTotalEmpty.style.display = 'none';
    } else {
      // Если нет выбранных товаров
      cartTotalInfo.style.display = 'none';
      
      // Определяем какое сообщение показывать
      const cartEmptyMessage = document.querySelector('.cart-empty-message');
      const cartContent = document.querySelector('.cart-content');

      if (totalItemsInCart === 0) {
        // cartTotalEmpty.textContent = 'Корзина пуста';
        cartEmptyMessage.style.display = 'block';
        cartContent.style.display = 'none';
      } else {
        cartTotalEmpty.textContent = 'Выберите товары, чтобы продолжить';
      }
      cartTotalEmpty.style.display = 'block';
      
      // Сбрасываем прогресс доставки
      updateDeliveryProgress(0);
      if (progressText && totalItemsInCart > 0) {
        progressText.textContent = `Еще ${formatPrice(FREE_DELIVERY_THRESHOLD)} ₽`;
      }
    }
    
    updateSelectAllCheckbox();
    updateRemoveButton();
  }

  function updateSelectAllCheckbox() {
    const checkboxes = document.querySelectorAll('.cart-select-checkbox input');
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
      selectAll.checked = checkboxes.length > 0 && 
        Array.from(checkboxes).every(cb => cb.checked);
    }
  }

  function updateRemoveButton() {
    const selectedCount = document.querySelectorAll('.cart-item.selected').length;
    const removeBtn = document.querySelector('.remove-selected');
    if (removeBtn) {
      removeBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.46448 6.46448L13.5355 13.5355" stroke="#3C3C3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.46445 13.5355L13.5355 6.46448" stroke="#3C3C3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Удалить выбранные${selectedCount > 0 ? ` (${selectedCount})` : ''}
      `;
    }
  }

  // Вспомогательные функции
  function updateElementText(selector, text) {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  }

  function parsePrice(priceStr) {
    return parseInt(priceStr.replace(/\D/g, '')) || 0;
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price);
  }

  function pluralize(number, words) {
    const cases = [2, 0, 1, 1, 1, 2];
    return words[
      number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]
    ];
  }
});

// cart-total-payment-method cart-total-delivery-method
const cartTotalPaymentMethodBtns = document.querySelectorAll('.cart-total-payment-method div');
const cartTotalDeliveryMethodBtns = document.querySelectorAll('.cart-total-delivery-method div');

console.log(cartTotalPaymentMethodBtns);

cartTotalPaymentMethodBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    cartTotalPaymentMethodBtns.forEach((btn) => {
      btn.classList.remove('active');
    });
    btn.classList.add('active');
  });
});
cartTotalDeliveryMethodBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    cartTotalDeliveryMethodBtns.forEach((btn) => {
      btn.classList.remove('active');
    });
    btn.classList.add('active');
  });
});