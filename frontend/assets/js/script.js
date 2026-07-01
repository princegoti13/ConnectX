/*
---------------------------------------
Project : ConnectX
File : script.js
Purpose : Landing Page Script
Author : Prince Goti
---------------------------------------
*/

const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");

    const current = +counter.innerText;

    const increment = target / 120;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);

      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});

/*==========================
FAQ
==========================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

const question=item.querySelector(".faq-question");

question.addEventListener("click",()=>{

item.classList.toggle("active");

});

});