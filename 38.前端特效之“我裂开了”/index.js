const $ = document.querySelector.bind(document)

let side1 = $('#side1')
let side2 = $('#side2')

window.addEventListener('scroll', () => {
  side1.style.left = -window.scrollY + 'px'
  side2.style.left = window.scrollY + 'px'
})