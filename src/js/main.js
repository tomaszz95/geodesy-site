const burgerBtn = document.querySelector('.nav-mobile__burger')
const navigation = document.querySelector('.nav-mobile__links')
const newsBoxes = document.querySelectorAll('.news__box')
const thumbnails = document.querySelectorAll('.aboutus__details-gallery-img')
const popup = document.querySelector('.aboutus__details-popup')
const popupClose = document.querySelector('.aboutus__details-popup--close')
const popupImg = document.querySelector('.aboutus__details-popup--img')
const arrowLeft = document.querySelector('.aboutus__details-popup--arrow-prev')
const arrowRight = document.querySelector('.aboutus__details-popup--arrow-next')
let footerYear = document.querySelector('.footer__year')
let boxesNumber = 0
let currentImgIndex

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
	if (currentImgIndex === thumbnails.length - 1) {
		currentImgIndex = 0
	} else {
		currentImgIndex++
	}
	popupImg.src = thumbnails[currentImgIndex].src
}

const showPrevImg = () => {
	if (currentImgIndex === 0) {
		currentImgIndex = thumbnails.length - 1
	} else {
		currentImgIndex--
	}
	popupImg.src = thumbnails[currentImgIndex].src
}

const closePopup = () => {
	popup.classList.add('hidden')
}

thumbnails.forEach((thumbnail, index) => {
	const showPopup = e => {
		popup.classList.remove('hidden')
		popupImg.src = e.target.src
		currentImgIndex = index
		thumbnails.forEach(element => {
			element.setAttribute('tabindex', -1)
		})
	}
	thumbnail.addEventListener('click', showPopup)

	thumbnail.addEventListener('keydown', e => {
		if (e.code === 'Enter' || e.key === 13) {
			showPopup(e)
		}
	})
})

// FOOTER YEAR
const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

handleCurrentYear()
window.addEventListener('scroll', newsBoxesAnimation)
burgerBtn.addEventListener('click', navigationHandler)
navigation.addEventListener('click', closeNavigation)
popupClose.addEventListener('click', closePopup)
arrowRight.addEventListener('click', showNextImg)
arrowLeft.addEventListener('click', showPrevImg)
document.addEventListener('keydown', e => {
	if (!popup.classList.contains('hidden')) {
		if (e.code === 'ArrowRight' || e.key === 39) {
			showNextImg()
		} else if (e.code === 'ArrowLeft' || e.key === 37) {
			showPrevImg()
		} else if (e.code === 'Escape' || e.key === 27) {
			closePopup()
		}
	}
})
popup.addEventListener('click', e => {
	if (e.target === popup) {
		closePopup()
	}
})
