// Выбор питомца

document.addEventListener('DOMContentLoaded', function() {
  const addPetBtn = document.querySelector('.add-pets-btn');
  const chooseYourPet = document.querySelector('#choose-your-pet');
  
  addPetBtn.addEventListener('click', function() {
    chooseYourPet.style.opacity = '1';
    chooseYourPet.style.visibility = 'visible';
  });

  const choosePetItems = document.querySelectorAll('.choose-pet-item');
  const petsData = document.querySelector('#pets-data');

  choosePetItems.forEach(item => {
    item.addEventListener('click', function() {
      petsData.style.opacity = '1';
      petsData.style.visibility = 'visible';
      chooseYourPet.style.opacity = '0';
      chooseYourPet.style.visibility = 'hidden';
      document.body.classList.add('no-scroll');
    });
  });

  
});


// Обработка нескольких select
document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
  const trigger = wrapper.querySelector('.custom-select-trigger');
  const options = wrapper.querySelector('.custom-options');
  const originalSelect = wrapper.querySelector('.original-select');
  
  // Установка начального значения
  trigger.textContent = originalSelect.options[originalSelect.selectedIndex].text;
  
  trigger.addEventListener('click', function(e) {
    e.stopPropagation();
    trigger.classList.toggle('active');
    // Закрываем все открытые select
    document.querySelectorAll('.custom-options').forEach(opt => {
      if (opt !== options) opt.style.display = 'none';
    });
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
  });
  
  wrapper.querySelectorAll('.custom-option').forEach(option => {
    option.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      trigger.textContent = value;
      originalSelect.value = value;
      options.style.display = 'none';
    });
  });
});

// Закрытие при клике вне select
document.addEventListener('click', function() {
  document.querySelectorAll('.custom-options').forEach(options => {
    options.style.display = 'none';
  });
});


// добавление питомца

document.addEventListener('DOMContentLoaded', function() {
  // Элементы формы
  const petForm = document.querySelector('.pet-filters-form');
  const petBirthdayInput = document.getElementById('pet-birthday');
  const yourPetsInfo = document.querySelector('.your-pets-info');
  const petsData = document.getElementById('pets-data');
  const closeBtn = document.querySelector('.register-close');

  // Сообщения об ошибках
  const errorMessages = {
    day: 'День должен быть от 1 до 31',
    month: 'Месяц должен быть от 1 до 12',
    year: `Год должен быть от 2000 до ${new Date().getFullYear()}`,
    format: 'Используйте формат: дд-мм-гггг',
    gender: 'Выберите пол питомца'
  };

  // Валидация даты
  function validateDate(dateStr) {
    if (!dateStr || dateStr.length !== 10) return { valid: false, error: errorMessages.format };
    
    const parts = dateStr.split('-');
    if (parts.length !== 3) return { valid: false, error: errorMessages.format };

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return { valid: false, error: errorMessages.format };
    }

    if (year < 2000 || year > new Date().getFullYear()) {
      return { valid: false, error: errorMessages.year };
    }

    if (month < 1 || month > 12) return { valid: false, error: errorMessages.month };

    const lastDay = new Date(year, month, 0).getDate();
    if (day < 1 || day > lastDay) return { valid: false, error: errorMessages.day };

    return { valid: true };
  }

  // Обработчик ввода даты
  petBirthdayInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2) value = `${value.slice(0, 2)}-${value.slice(2)}`;
    if (value.length > 5) value = `${value.slice(0, 5)}-${value.slice(5, 9)}`;
    
    e.target.value = value;
  });

  function showError(message) {
    const errorContainer = document.querySelector('.error-container-birthday');
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
    
    setTimeout(() => {
      errorContainer.style.display = 'none';
    }, 5000);
  }

  function showGenderError(message) {
    const errorContainer = document.querySelector('.error-container-gender');
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
    
    setTimeout(() => {
      errorContainer.style.display = 'none';
    }, 5000);
  }

  // Обработчик отправки формы
  petForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Очищаем предыдущие ошибки
    showError('');
    
    // Валидация даты
    const dateValidation = validateDate(petBirthdayInput.value);
    if (!dateValidation.valid) {
      showError(dateValidation.error);
      petBirthdayInput.focus();
      return;
    }
    
    // Валидация пола
    const genderRadio = document.querySelector('input[name="radio-group"]:checked');
    if (!genderRadio) {
      showGenderError(errorMessages.gender);
      return;
    }

    // Сбор данных
    const petData = {
      id: Date.now(), // Уникальный ID
      type: document.querySelector('.pet-filters-item .custom-select-trigger').textContent,
      breed: document.querySelectorAll('.pet-filters-item .custom-select-trigger')[1].textContent,
      name: document.getElementById('pet-name').value || 'Не указано',
      birthday: petBirthdayInput.value,
      weight: document.getElementById('pet-weight').value || '0',
      gender: genderRadio.nextElementSibling.nextElementSibling.textContent,
      castration: document.getElementById('castration').checked ? 'Да' : 'Нет',
      ration: [
        document.getElementById('wet-ration').checked ? 'Влажный' : '',
        document.getElementById('dry-ration').checked ? 'Сухой' : ''
      ].filter(Boolean).join(', ') || 'Не указано',
      avatar: './assets/icons/user_icon.png'
    };

    // Сохранение данных
    let pets = JSON.parse(localStorage.getItem('pets')) || [];
    pets.push(petData);
    localStorage.setItem('pets', JSON.stringify(pets));

    // Отображение карточки
    displayPetCard(petData);
    
    // Закрытие формы
    petsData.style.opacity = '0';
    petsData.style.visibility = 'hidden';
    document.body.classList.remove('no-scroll');
    petForm.reset();
  });

  // Функция отображения карточки
  function displayPetCard(petData) {
    const petCard = document.createElement('div');
    petCard.className = 'pet-card';
    petCard.dataset.petId = petData.id; // Добавляем ID карточки
    
    petCard.innerHTML = `
     <div class="profile-avatar">
        <img src="${petData.avatar}" class="avatar-image" alt="Аватар">
        <button class="edit-avatar-btn pet-edit-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="0.5" y="0.5" width="19" height="19" rx="9.5" fill="#FFA0A0"/>
						<rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="white"/>
						<path d="M14.5 15H5.5C5.295 15 5.125 14.83 5.125 14.625C5.125 14.42 5.295 14.25 5.5 14.25H14.5C14.705 14.25 14.875 14.42 14.875 14.625C14.875 14.83 14.705 15 14.5 15Z" fill="white"/>
						<path d="M13.5103 5.74002C12.5403 4.77002 11.5903 4.74502 10.5953 5.74002L9.99028 6.34502C9.94028 6.39502 9.92028 6.47502 9.94028 6.54502C10.3203 7.87002 11.3803 8.93002 12.7053 9.31002C12.7253 9.31502 12.7453 9.32002 12.7653 9.32002C12.8203 9.32002 12.8703 9.30002 12.9103 9.26002L13.5103 8.65502C14.0053 8.16502 14.2453 7.69002 14.2453 7.21002C14.2503 6.71502 14.0103 6.23502 13.5103 5.74002Z" fill="white"/>
						<path d="M11.8052 9.76502C11.6602 9.69502 11.5202 9.62502 11.3852 9.54502C11.2752 9.48002 11.1702 9.41002 11.0652 9.33502C10.9802 9.28002 10.8802 9.20002 10.7852 9.12002C10.7752 9.11502 10.7402 9.08502 10.7002 9.04502C10.5352 8.90502 10.3502 8.72502 10.1852 8.52502C10.1702 8.51502 10.1452 8.48002 10.1102 8.43502C10.0602 8.37502 9.97516 8.27502 9.90016 8.16002C9.84016 8.08502 9.77016 7.97502 9.70516 7.86502C9.62516 7.73002 9.55516 7.59502 9.48516 7.45502C9.39338 7.25835 9.13525 7.19993 8.98179 7.35339L6.17016 10.165C6.10516 10.23 6.04516 10.355 6.03016 10.44L5.76016 12.355C5.71016 12.695 5.80516 13.015 6.01516 13.23C6.19516 13.405 6.44516 13.5 6.71516 13.5C6.77516 13.5 6.83516 13.495 6.89516 13.485L8.81516 13.215C8.90516 13.2 9.03016 13.14 9.09016 13.075L11.9064 10.2588C12.0568 10.1084 12.0003 9.84959 11.8052 9.76502Z" fill="white"/>
					</svg>
        </button>
        <input type="file" accept="image/*" class="avatar-input" hidden>
      </div>
       <div class="pet-info-items">
        <div class="pet-name profile-info-item">
          <span>Имя</span>
          <span class="pet-name-value">${petData.name}</span>
        </div>
        <div class="pet-breed profile-info-item">
          <span>Порода</span>
          <span class="pet-breed-value">${petData.breed}</span>
        </div>
        <div class="pet-birthday profile-info-item">
          <span>Дата рождения</span>
          <span class="pet-birthday-value">${petData.birthday}</span>
        </div>
        <div class="pet-weight profile-info-item">
          <span>Вес</span>
          <span class="pet-weight-value">${petData.weight} кг</span>
        </div>
        <div class="pet-gender profile-info-item">
          <span>Пол</span>
          <span class="pet-gender-value">${petData.gender}</span>
        </div>
        <div class="pet-ration profile-info-item">
          <span>Рацион</span>
          <span class="pet-ration-value">${petData.ration}</span>
        </div>
        <div class="pet-castration profile-info-item">
          <span>Кастрация</span>
          <span class="pet-castration-value">${petData.castration}</span>
        </div>
      </div>
      <button class="pet-profile-edit-btn">
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M17.5 18.3333H2.5C2.15833 18.3333 1.875 18.05 1.875 17.7083C1.875 17.3666 2.15833 17.0833 2.5 17.0833H17.5C17.8417 17.0833 18.125 17.3666 18.125 17.7083C18.125 18.05 17.8417 18.3333 17.5 18.3333Z" fill="#3C3C3B"/>
										<path d="M15.8505 2.89999C14.2338 1.28332 12.6505 1.24166 10.9921 2.89999L9.9838 3.90832C9.90047 3.99166 9.86714 4.12499 9.90047 4.24166C10.5338 6.44999 12.3005 8.21666 14.5088 8.84999C14.5421 8.85832 14.5755 8.86666 14.6088 8.86666C14.7005 8.86666 14.7838 8.83332 14.8505 8.76666L15.8505 7.75832C16.6755 6.94166 17.0755 6.14999 17.0755 5.34999C17.0838 4.52499 16.6838 3.72499 15.8505 2.89999Z" fill="#3C3C3B"/>
										<path d="M13.0079 9.60835C12.7663 9.49169 12.5329 9.37502 12.3079 9.24169C12.1246 9.13335 11.9496 9.01669 11.7746 8.89169C11.6329 8.80002 11.4663 8.66669 11.3079 8.53335C11.2913 8.52502 11.2329 8.47502 11.1663 8.40835C10.8913 8.17502 10.5829 7.87502 10.3079 7.54169C10.2829 7.52502 10.2413 7.46669 10.1829 7.39169C10.0996 7.29169 9.95795 7.12502 9.83295 6.93335C9.73295 6.80835 9.61628 6.62502 9.50795 6.44169C9.37461 6.21669 9.25795 5.99169 9.14128 5.75835C8.98832 5.43057 8.5581 5.3332 8.30233 5.58897L3.61628 10.275C3.50795 10.3834 3.40795 10.5917 3.38295 10.7334L2.93295 13.925C2.84961 14.4917 3.00795 15.025 3.35795 15.3834C3.65795 15.675 4.07461 15.8334 4.52461 15.8334C4.62461 15.8334 4.72461 15.825 4.82461 15.8084L8.02461 15.3584C8.17461 15.3334 8.38295 15.2334 8.48295 15.125L13.1767 10.4312C13.4274 10.1806 13.3332 9.7493 13.0079 9.60835Z" fill="#3C3C3B"/>
										</svg>
									Изменить данные о питомце
			</button>
    `;
    
    if (yourPetsInfo.innerHTML.includes('У вас нет питомцев')) {
      yourPetsInfo.innerHTML = '';
    }

    yourPetsInfo.appendChild(petCard);
  }

  // Закрытие формы
  closeBtn.addEventListener('click', function() {
    petsData.style.opacity = '0';
    petsData.style.visibility = 'hidden';
    document.body.classList.remove('no-scroll');
  });

  // Обработчик изменения аватара
  document.addEventListener('change', function(e) {
    if (e.target.classList.contains('avatar-input')) {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith('image/')) return;

      const reader = new FileReader();
      const card = e.target.closest('.pet-card');
      const petId = card.dataset.petId;

      reader.onload = function(event) {
        // Обновляем изображение
        card.querySelector('.avatar-image').src = event.target.result;

        // Обновляем Local Storage
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        const petIndex = pets.findIndex(p => p.id == petId);
        
        if (petIndex !== -1) {
          pets[petIndex].avatar = event.target.result;
          localStorage.setItem('pets', JSON.stringify(pets));
        }
      };

      reader.readAsDataURL(file);
    }
  });

  // Загрузка сохраненных питомцев
  function loadPets() {
    const savedPets = JSON.parse(localStorage.getItem('pets')) || [];
    
    if (savedPets.length > 0) {
      yourPetsInfo.innerHTML = '';
      savedPets.forEach(pet => displayPetCard(pet));
    }
  }

  // Инициализация
  loadPets();
});

// Обработчик кликов по документу (для динамических элементов)
document.addEventListener('click', function(e) {
  // 1. Клик по кнопке "Изменить аватар"
  if (e.target.closest('.edit-avatar-btn')) {
    const card = e.target.closest('.pet-card');
    const fileInput = card.querySelector('.avatar-input');
    fileInput.click();
  }
});

// Обработчик выбора файла
document.addEventListener('change', function(e) {
  if (e.target.classList.contains('avatar-input')) {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    const card = e.target.closest('.pet-card');
    const petId = card.dataset.petId;

    reader.onload = function(event) {
      // 1. Обновляем изображение на странице
      const img = card.querySelector('.avatar-image');
      img.src = event.target.result;

      // 2. Обновляем данные в Local Storage
      const pets = JSON.parse(localStorage.getItem('pets')) || [];
      const petIndex = pets.findIndex(p => p.id == petId);
      
      if (petIndex !== -1) {
        pets[petIndex].avatar = event.target.result;
        localStorage.setItem('pets', JSON.stringify(pets));
      }
    };

    reader.readAsDataURL(file);
  }
});

  // Обработчик загрузки аватара
  document.addEventListener('change', function(e) {
    if (e.target.matches('input[type="file"]')) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const avatar = e.target.closest('.profile-avatar').querySelector('img');
          avatar.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  });



// Обработчик клика на кнопку "Изменить данные"
document.addEventListener('DOMContentLoaded', function() {
  const profileEditBtns = document.querySelectorAll('.pet-profile-edit-btn');
  console.log(profileEditBtns);
  const petsData = document.querySelector('#pets-data');


  profileEditBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('Клик по кнопке "Изменить данные"');
        petsData.style.opacity = '1';
        petsData.style.visibility = 'visible';
    });
  });

})




