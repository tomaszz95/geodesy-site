const burgerBtn = document.querySelector('.nav-mobile__burger')
const navigation = document.querySelector('.nav-mobile__links')
const newsBoxes = document.querySelectorAll('.news__box')
let boxesNumber = 0

// NAVIGATION
const navigationHandler = e => {
	if (e.target.classList.value == 'nav-mobile__burger' || 'nav-mobile__burger--bar') {
		burgerBtn.classList.toggle('active')
		navigation.classList.toggle('active')
	}

	if (burgerBtn.classList.contains('active')) {
		document.body.style.overflowY = 'hidden'
	} else {
		document.body.style.overflowY = 'auto'
	}
}

const closeNavigation = e => {
	if (e.target.classList.value == 'nav-mobile__link') {
		burgerBtn.classList.remove('active')
		navigation.classList.remove('active')
		document.body.style.overflowY = 'auto'
	}
}

// NEWS BOXES
const newsBoxesAnimation = () => {
	newsBoxes.forEach(box => {
		if (
			box.offsetTop - scrollY < 850 &&
			!box.classList.contains('animationRight') &&
			!box.classList.contains('animationLeft') &&
			boxesNumber % 2 === 0
		) {
			box.classList.add('animationRight')
		} else if (
			box.offsetTop - scrollY < 850 &&
			!box.classList.contains('animationLeft') &&
			!box.classList.contains('animationRight') &&
			boxesNumber % 2 === 1
		) {
			box.classList.add('animationLeft')
		} else {
			return
		}
		boxesNumber++
	})
}

window.addEventListener('scroll', newsBoxesAnimation)
burgerBtn.addEventListener('click', navigationHandler)
navigation.addEventListener('click', closeNavigation)
