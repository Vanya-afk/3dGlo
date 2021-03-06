window.addEventListener('DOMContentLoaded', () => {
   'use strict';
   //Таймер
   const countTimer = (deadline) => {
      const timerHours = document.querySelector('#timer-hours'),
         timerMinutes = document.querySelector('#timer-minutes'),
         timerSeconds = document.querySelector('#timer-seconds');
      const getTimeRemaining = () => {
         const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaning = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaning % 60),
            minutes = Math.floor((timeRemaning / 60) % 60),
            hours = Math.floor(timeRemaning / 60 / 60);
         return {
            timeRemaning,
            hours,
            minutes,
            seconds
         };
      };
      const updateClock = () => {
         const timer = getTimeRemaining();
         timerHours.textContent = timer.hours;
         timerMinutes.textContent = timer.minutes;
         timerSeconds.textContent = timer.seconds;
         if (timer.timeRemaning > 0) {
            if (timerHours.textContent < 10) {
               timerHours.textContent = '0' + timerHours.textContent;
            }
            if (timerMinutes.textContent < 10) {
               timerMinutes.textContent = '0' + timerMinutes.textContent;
            }
            if (timerSeconds.textContent < 10) {
               timerSeconds.textContent = '0' + timerSeconds.textContent;
            }
         } else if (timer.timeRemaning <= 0) {
            timerHours.textContent = '0' + '0';
            timerMinutes.textContent = '0' + '0';
            timerSeconds.textContent = '0' + '0';
         }
      };
      setInterval(updateClock, 1000);
      updateClock();
   };
   countTimer('17 september 2020');


   // Меню
   const toggleMenu = () => {
      const btnMenu = document.querySelector('.menu'),
         menu = document.querySelector('menu');



      menu.addEventListener('click', (event) => {
         let target = event.target;
         if (target) {
            menu.classList.toggle('active-menu');
         }
      });


      btnMenu.addEventListener('click', () => {
         menu.classList.toggle('active-menu');
      });

   };
   toggleMenu();


   //popup
   const togglePopUp = () => {
      const popup = document.querySelector('.popup'),
         popupBtn = document.querySelectorAll('.popup-btn');

      popupBtn.forEach((elem) => {
         elem.addEventListener('click', () => {
            popup.style.display = 'block';
            let count = 0;
            const popupContent = document.querySelector('.popup-content');
            const popupContentMove = () => {
               if (window.innerWidth > 768) {
                  count++;
                  let idInterval = setTimeout(popupContentMove, 15);
                  if (count < 38) {
                     popupContent.style.left = count + '%';
                  } else {
                     clearInterval(idInterval);
                  }
               } else {
                  popupContent.style.left = 18 + '%';
               }
            };
            window.addEventListener('resize', popupContentMove);
            popupContentMove();
         });
      });


      popup.addEventListener('click', (event) => {
         let target = event.target;

         if (target.classList.contains('popup-close')) {
            popup.style.display = 'none';
         } else {
            target = target.closest('.popup-content');
            if (!target) {
               popup.style.display = 'none';
            }
         }
      });
   };
   togglePopUp();


   // скролл
   const scroll = document.querySelectorAll('a[href*="#"]');
   scroll.forEach((elem) => {
      elem.addEventListener('click', (e) => {
         e.preventDefault();
         const block = elem.getAttribute('href');
         document.querySelector('' + block).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         });
      });
   });



   // Табы
   const tabs = () => {
      const tabHeader = document.querySelector('.service-header'),
         tab = tabHeader.querySelectorAll('.service-header-tab'),
         tabContent = document.querySelectorAll('.service-tab');

      const toggleTabContent = (index) => {
         for (let i = 0; i < tabContent.length; i++) {
            if (index === i) {
               tab[i].classList.add('active');
               tabContent[i].classList.remove('d-none');
            } else {
               tab[i].classList.remove('active');
               tabContent[i].classList.add('d-none');
            }
         }
      };

      tabHeader.addEventListener('click', (event) => {
         let target = event.target;
         target = target.closest('.service-header-tab');

         if (target) {

            tab.forEach((item, i) => {

               if (item === target) {
                  toggleTabContent(i);
               }

            });

         }

      });

   };
   tabs();

   //Слайдер
   const slider = () => {
      const slide = document.querySelectorAll('.portfolio-item'),
         portfolioDots = document.querySelector('.portfolio-dots'),
         slider = document.querySelector('.portfolio-content');


      let currentSlide = 0,
         interval,
         dot;
      for (let i = 0; i < slide.length; i++) {
         dot = document.createElement('li');
         dot.classList.add('dot');
         portfolioDots.append(dot);
         document.querySelectorAll('.dot')[0].classList.add('dot-active');
      }
      let dots = portfolioDots.querySelectorAll('li');
      dots = Array.from(dots);

      const prevSlide = (elem, index, strClass) => {
         elem[index].classList.remove(strClass);
      };
      const nextSlide = (elem, index, strClass) => {
         elem[index].classList.add(strClass);
      };

      const autoPlaySlide = () => {
         prevSlide(slide, currentSlide, 'portfolio-item-active');
         prevSlide(dots, currentSlide, 'dot-active');
         currentSlide++;
         if (currentSlide >= slide.length) {
            currentSlide = 0;
         }
         nextSlide(slide, currentSlide, 'portfolio-item-active');
         nextSlide(dots, currentSlide, 'dot-active');
      };

      const startSlide = (time = 3000) => {
         interval = setInterval(autoPlaySlide, time);
      };

      const stopSlide = () => {
         clearInterval(interval);
      };

      slider.addEventListener('click', (event) => {
         event.preventDefault();

         let target = event.target;

         if (!target.matches('.portfolio-btn,.dot')) {
            return;
         }
         prevSlide(slide, currentSlide, 'portfolio-item-active');
         prevSlide(dots, currentSlide, 'dot-active');

         if (target.matches('#arrow-right')) {
            currentSlide++;
         } else if (target.matches('#arrow-left')) {
            currentSlide--;
         } else if (target.matches('.dot')) {
            dots.forEach((elem, index) => {
               if (elem === target) {
                  currentSlide = index;
               }
            });
         }

         if (currentSlide >= slide.length) {
            currentSlide = 0;
         }

         if (currentSlide < 0) {
            currentSlide = slide.length - 1;
         }
         nextSlide(slide, currentSlide, 'portfolio-item-active');
         nextSlide(dots, currentSlide, 'dot-active');
      });

      slider.addEventListener('mouseover', (event) => {
         if (event.target.matches('.portfolio-btn') || (event.target.matches('.dot'))) {
            stopSlide();
         }
      });
      slider.addEventListener('mouseout', (event) => {
         if (event.target.matches('.portfolio-btn') || (event.target.matches('.dot'))) {
            startSlide();
         }
      });


      startSlide();
   };
   slider();

   //Ховер на *Наша команда*
   let commandPhoto = document.querySelectorAll('.command__photo');
   commandPhoto = Array.from(commandPhoto);
   commandPhoto.forEach((elem) => {
      elem.addEventListener('mouseenter', (e) => {
         let firstPhoto = e.target.src;
         e.target.src = e.target.dataset.img;
         e.target.dataset.img = firstPhoto;
      });
      elem.addEventListener('mouseout', (e) => {
         let secondtPhoto = e.target.src;
         e.target.src = e.target.dataset.img;
         e.target.dataset.img = secondtPhoto;
      });
   });

   //Блокировка в стоимости
   let calcIitem = document.querySelectorAll('.calc-item');
   calcIitem = Array.from(calcIitem);
   calcIitem.shift();
   calcIitem.forEach((elem) => {
      elem.addEventListener('input', (e) => {
         elem.value = elem.value.replace(/\D/, '');
      });
   });

   //Калькулятор
   const calc = (price = 100) => {
      const calcBlock = document.querySelector('.calc-block'),
         calcType = document.querySelector('.calc-type'),
         calcSquare = document.querySelector('.calc-square'),
         calcCount = document.querySelector('.calc-count'),
         calcDay = document.querySelector('.calc-day'),
         totalValue = document.getElementById('total');

      const countSum = () => {
         let total = 0,
            countValue = 1,
            dayValue = 1,
            n = 0;
         const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

         if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
         }

         if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
         } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
         }

         if (typeValue && squareValue) {
            let step = 10;
            let n = 0;
            total = price * typeValue * squareValue * countValue * dayValue;
            let interval = setInterval(() => {
               n += +step;
               if (n === total) {
                  clearInterval(interval);
               }
               totalValue.textContent = n;
            }, 1);
         } else {
            totalValue.textContent = 0;
         }
      };

      calcBlock.addEventListener('change', (event) => {
         const target = event.target;
         if (target === calcType || target === calcSquare || target === calcCount || target === calcDay) {
            countSum();
         }
      });
   };
   calc(100);

   // send-ajax-form

   const sendForm = () => {
      const errorMessage = 'Что-то пошло не так...',
         loadMessage = 'Загрузка',
         successMessage = 'Спасибо! Мы скоро с вами свяжемся';

      const allForm = document.querySelectorAll('form');
      allForm.forEach((form) => {
         const statusMessage = document.createElement('div');
         statusMessage.style.cssText = 'font-size: 2rem;';
         statusMessage.style.color = '#fff';


         const formPhone = form.querySelector('.form-phone');
         formPhone.addEventListener('input', () => {
            formPhone.value = formPhone.value.replace(/[^0-9+]/, '');
         });


         const formName = form.querySelector('input[name="user_name"]');
         formName.addEventListener('input', () => {
            formName.value = formName.value.replace(/[^ а-яё]/ig, '');
         });

         const mess = document.querySelector('.mess');
         mess.addEventListener('input', () => {
            mess.value = mess.value.replace(/[^ а-яё]/ig, '');
         });
         form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form);
            let body = {};
            formData.forEach((value, key) => {
               body[key] = value;
            });
            const success = (request) => {
               if (request.status !== 200) {
                  throw new Error('status network not 200');
               }
               statusMessage.textContent = successMessage;
               const inputForm = form.querySelectorAll('input');
               inputForm.forEach(elem => {
                  elem.value = '';
               });

               const deleteStatusMessage = () => {
                  statusMessage.remove();
               };
               setTimeout(deleteStatusMessage, 3000);
            };
            const error = () => {
               statusMessage.textContent = errorMessage;
               console.error();
            };
            postData(body)
               .then(success)
               .catch(error);
         });

         const postData = (body) => {
            return fetch('./server.php', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(body)
            });
         };
      });

   };
   sendForm();
});