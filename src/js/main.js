const burgerBtn = document.querySelector('.nav-mobile__burger')
const navigation = document.querySelector('.nav-mobile__links')
const newsBoxes = document.querySelectorAll('.news__box')
const thumbnails = document.querySelectorAll('.services__details-gallery-img')
const popup = document.querySelector('.services__details-popup')
const popupClose = document.querySelector('.services__details-popup--close')
const popupImg = document.querySelector('.services__details-popup--img')
const arrowLeft = document.querySelector('.services__details-popup--arrow-prev')
const arrowRight = document.querySelector('.services__details-popup--arrow-next')
const slides = document.querySelectorAll('.services__carousel--slide')
const nextSlideBtn = document.querySelector('.services__carousel-button--next')
const prevSlideBtn = document.querySelector('.services__carousel-button--prev')
let footerYear = document.querySelector('.footer__year')
let boxesNumber = 0
let curSlide = 0

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

// POPUP MANAGING
const showNextImg = () => {
	let photoIndex

	if (popupImg.src.includes('ref1')) {
		photoIndex = 1
	} else if (popupImg.src.includes('ref2')) {
		photoIndex = 2
	} else {
		photoIndex = 0
	}

	popupImg.src = thumbnails[photoIndex].src
}

const showPrevImg = () => {
	let photoIndex

	if (popupImg.src.includes('ref1')) {
		photoIndex = 2
	} else if (popupImg.src.includes('ref2')) {
		photoIndex = 0
	} else {
		photoIndex = 1
	}

	popupImg.src = thumbnails[photoIndex].src
}

const showPopup = e => {
	popup.classList.remove('hidden')
	popupImg.src = e.target.src
	thumbnails.forEach(element => {
		element.setAttribute('tabindex', -1)
	})
}

const closePopup = () => {
	popup.classList.add('hidden')
}

// KEYS FUNCTIONALITY
const popupKeys = e => {
	if (!popup.classList.contains('hidden')) {
		if (e.code === 'ArrowRight' || e.key === 39) {
			showNextImg()
		} else if (e.code === 'ArrowLeft' || e.key === 37) {
			showPrevImg()
		} else if (e.code === 'Escape' || e.key === 27) {
			closePopup()
		}
	}
}

// SLIDER
slides.forEach((slide, indx) => {
	slide.style.transform = `translateX(${indx * 100}%)`
})

const nextSlideFunction = () => {
	let maxSlide = slides.length - 1

	if (curSlide === maxSlide) {
		curSlide = 0
	} else {
		curSlide++
	}

	slides.forEach((slide, indx) => {
		slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`
	})
}

const prevSlideFunction = () => {
	let maxSlide = slides.length - 1

	if (curSlide === 0) {
		curSlide = maxSlide
	} else {
		curSlide--
	}

	slides.forEach((slide, indx) => {
		slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`
	})
}

// FOOTER YEAR
const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

if (location.href.includes('services')) {
	popup.addEventListener('click', e => {
		if (e.target === popup) {
			closePopup()
		} else {
			return
		}
	})

	arrowRight.addEventListener('click', showNextImg)
	arrowLeft.addEventListener('click', showPrevImg)
	popupClose.addEventListener('click', closePopup)
	thumbnails.forEach(thumbnail => thumbnail.addEventListener('click', showPopup))
	document.addEventListener('keydown', popupKeys)

	nextSlideBtn.addEventListener('click', nextSlideFunction)
	prevSlideBtn.addEventListener('click', prevSlideFunction)
}

handleCurrentYear()
window.addEventListener('scroll', newsBoxesAnimation)
burgerBtn.addEventListener('click', navigationHandler)
navigation.addEventListener('click', closeNavigation)
