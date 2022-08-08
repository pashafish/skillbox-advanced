let loadAnimation = gsap.timeline({paused:true});
loadAnimation.set('.hero__left', {y: 50, opacity: 0})
             .set('.hero__descr', {opacity: 0})
             .set('.photos-wrap > img', {opacity: 0, scale: 0.8})
             .set('.photos__author', {opacity: 0});
loadAnimation.to('.hero__left', {y: 0, opacity: 1, duration: 0.6, ease: 'sine.out'}, '.3')
             .to('.hero__descr', {y: 0, opacity: 1, duration: 0.4, ease: 'sine.out'}, '>-0.3')
             .to('.photos-wrap > img:nth-child(1)', {opacity: 1, scale: 1, duration: 0.6, ease: 'sine.out'}, '>-0.3')
             .to('.photos-wrap > img:nth-child(2)', {opacity: 1, scale: 1, duration: 0.6, ease: 'sine.out'}, '<0.2')
             .to('.photos-wrap > img:nth-child(3)', {opacity: 1, scale: 1, duration: 0.6, ease: 'sine.out'}, '<0.2')
             .to('.photos__author', {opacity: 1, duration: 0.4, ease: 'sine.out'}, '>-0.2');

window.addEventListener('load', () => {
  loadAnimation.play();
})

let menuAnimation = gsap.timeline({paused:true, onStart: () => menu.classList.add('menu--open'), onReverseComplete: () => menu.classList.remove('menu--open')});
menuAnimation.set('.menu__top', {opacity: 0})
             .set('.menu__top-bg', {scaleY: 0.5})
             .set('.menu', {backgroundColor: 'rgba(55, 55, 55, 0)'})
             .set('.menu__nav', {y: 20, opacity: 0})
             .set('.social', {y: 30, opacity: 0})
             .set('.menu__right', {y: 50, opacity: 0});
menuAnimation.to('.menu__top', {opacity: 1, duration: 0.6, ease: 'sine.out'})
             .to('.menu__top-bg', {scaleY: 1, duration: 0.6, ease: 'back.out(6)'}, '<')
             .to('.menu', {backgroundColor: 'rgba(55, 55, 55, 1)', duration: 0.6, ease: 'sine.out'},'>-0.5')
             .to('.menu__nav', {y: 0, opacity: 1, duration: 0.5, ease: 'sine.out'}, '>-0.1')
             .to('.social', {y: 0, opacity: 1, duration: 0.4, ease: 'sine.out'}, '>-0.2')
             .to('.menu__right', {y: 0, opacity: 1, duration: 0.4, ease: 'sine.out'}, '<');

let burgerBtn = document.querySelector('.burger');
let closeBtn = document.querySelector('.close');
let menu = document.querySelector('.menu');
burgerBtn.addEventListener('click', () => {
  menuAnimation.restart();
});
closeBtn.addEventListener('click', () => {
  menuAnimation.reverse();
});
