
//MenuToggle
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main')

toggle.onclick = function () {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}
// add hovered class in selected list item

let list = document.querySelectorAll('.naviagtion li');
function activeLink() {
    list.forEach((item) =>
        item.classList.remove('hovered'));
    this.classList.add('hovered');
}
list.forEach((item) =>
    item.addEventListener('mouseover', activeLink)
);

// Alert box toggle
if (document.getElementById('alert')) {    
    let cancelbtn = document.querySelector('.cancel')
    let alert = document.getElementById('alert')

    cancelbtn.onclick = function () {
        alert.style.display = 'none'
    }
}