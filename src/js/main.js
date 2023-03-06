const burgerBtn = document.querySelector('.nav-mobile__burger')
const navigation = document.querySelector('.nav-mobile__links')

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
	}
}

burgerBtn.addEventListener('click', navigationHandler)
navigation.addEventListener('click', closeNavigation)
