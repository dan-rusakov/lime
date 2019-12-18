// fullScreen 
(function(){

	var scrollPosition = 0;
	var sectionNumber = 1;
	var canSlide = true;
	var OUT_ANIMATION = 'slideOut';
	var IN_ANIMATION = 'slideIn';
	var newSection;
	var oldSection;
	var currentPosition;
	var activeTheme = document.querySelector('.active-theme');
	window.visual = [
		{
			gradient: 'linear-gradient(0deg, rgba(255,177,60,1) 0%, rgba(187,255,164,1) 50%)',
			whiteImg: 'sprite-imgScreen1White',
			darkImg: 'sprite-imgScreen1Dark'
		},
		{
			gradient: 'linear-gradient(0deg, rgba(254,148,148,1) 0%, rgba(255,177,60,1) 50%)',
			whiteImg: 'sprite-imgScreen2White',
			darkImg: 'sprite-imgScreen2Dark'
		},
		{
			gradient: 'linear-gradient(0deg, rgba(168,187,255,1) 0%, rgba(254,148,148,1) 50%)',
			whiteImg: 'sprite-imgScreen3White_0',
			darkImg: 'sprite-imgScreen3Dark_0'
		},
		{
			gradient: 'linear-gradient(0deg, rgba(218,255,255,1) 0%, rgba(168,187,255,1) 50%)',
			whiteImg: 'sprite-imgScreen4White',
			darkImg: 'sprite-imgScreen4Dark'
		},
		{
			gradient: 'linear-gradient(0deg, rgba(126,245,166,1) 0%, rgba(218,255,255,1) 50%)',
			whiteImg: 'sprite-imgScreen5White',
			darkImg: 'sprite-imgScreen5White'
		},
		{
			gradient: 'linear-gradient(0deg, rgba(238,254,145,1) 0%, rgba(126,245,166,1) 50%)',
			whiteImg: 'sprite-imgScreen6White',
			darkImg: 'sprite-imgScreen6White'
		},
		{
			gradient: 'linear-gradient(0deg, rgba(255,177,60,1) 0%, rgba(187,255,164,1) 50%)',
			whiteImg: 'sprite-imgScreen7White',
			darkImg: 'sprite-imgScreen7White'
		},
		{
			gradient: 'linear-gradient(0deg, rgba(254,148,148,1) 0%, rgba(255,177,60,1) 50%)',
			whiteImg: 'sprite-imgScreen8White',
			darkImg: 'sprite-imgScreen8Dark'
		},
		{
			gradient: 'linear-gradient(0deg, rgba(168,187,255,1) 0%, rgba(254,148,148,1) 50%)',
			whiteImg: 'sprite-imgScreen9White',
			darkImg: 'sprite-imgScreen9White'
		},
		{
			gradient: 'url("img/map.jpeg")',
			whiteImg: 'noImg',
			darkImg: 'noImg'
		},
		{
			gradient: 'linear-gradient(0deg, rgba(218,255,255,1) 0%, rgba(168,187,255,1) 50%)',
			whiteImg: 'noImg',
			darkImg: 'noImg'
		},
	];

	function currentTheme() {
		return document.querySelector('.active-theme').classList[0];
	}

	var sectionHeight = function(){

		var themeHeight = activeTheme.scrollHeight;
		var themeSections = activeTheme.childElementCount;
		return themeHeight / themeSections;

	};

	document.addEventListener('wheel', function(evt){

		var delta = evt.deltaY || evt.detail || evt.wheelDelta;

		if(canSlide){
			if (delta > 0){
				slideScreen('-', 1)  // downscroll
			} else {
				slideScreen('+', 1)  // upscroll 
			}
		}

	});

	function slideScreen(direction, step){

		var startSliding = true;

		if(sectionNumber == 1 && direction == '+' || sectionNumber == activeTheme.childElementCount && direction == '-') startSliding = false;

		if(startSliding){

			canSlide = false;
			sectionNumber -= +(direction + step);
			scrollPosition += +(direction + (sectionHeight() * step));

			newSection = activeTheme.children[sectionNumber - 1].querySelector('.section-content');

			if (direction == '-') oldSection = activeTheme.children[sectionNumber - (step + 1)].querySelector('.section-content');
			else if (direction == '+') oldSection = activeTheme.children[sectionNumber + (step - 1)].querySelector('.section-content');

			animation();
			changeCircleBg(sectionNumber);
			currentPosition = sectionNumber;
			changeImage();

		}

	}	

	function animation(){
		oldSection.addEventListener('animationend', oldSectionAnimEnd);
		oldSection.classList.add(OUT_ANIMATION);
	}

	function oldSectionAnimEnd(){
		oldSection.removeEventListener('animationend', oldSectionAnimEnd);
		oldSection.classList.remove(OUT_ANIMATION);
		activeTheme.style.transform = 'translateY('+scrollPosition+'px)';
		newSection.addEventListener('animationend', newSectionAnimEnd);
		newSection.classList.add(IN_ANIMATION);
	}

	function newSectionAnimEnd(){
		newSection.removeEventListener('animationend', newSectionAnimEnd);
		newSection.classList.remove(IN_ANIMATION);
		canSlide = true;
	}

	var circle = document.querySelector('.graphic-circle');
	var newCircle = document.querySelector('.new-graphic-circle');
	circle.style.background = visual[0].gradient;
	newCircle.style.background = visual[0].gradient;

	function changeCircleBg(position){

		circle.style.background = visual[position - 1].gradient;
		//debugger;
		newCircle.addEventListener('animationend', gradientAminEnd(position));
		newCircle.classList.add('opacity');

	};

	function gradientAminEnd(position){
		return function(){

			
			newCircle.removeEventListener('animationend', gradientAminEnd);
			newCircle.classList.remove('opacity');
			newCircle.style.background = visual[position - 1].gradient;

		}
	}

	var image = document.querySelector('.graphic-img');
	image.classList.remove(image.classList[1]);
	image.classList.add(visual[0].whiteImg);
	image.addEventListener('animationend', imageAnim);

	// function changeImage(position){

	// 	image.classList.add('fadeOut');
	// 	image.addEventListener('animationend', oldImgAminEnd(position));

	// }

	// function oldImgAminEnd(position){
	// 	return function(){

	// 		image.removeEventListener('animationend', oldImgAminEnd);
	// 		image.classList.remove('fadeOut');
	// 		image.classList.remove(image.classList[1]);
	// 		image.classList.add(visual[position - 1].whiteImg);
	// 		image.classList.add('slideInDown');
	// 		image.addEventListener('animationend', newImgAminEnd(position));

	// 	}
	// }

	// function newImgAminEnd(position){
	// 	return function(){

	// 		image.removeEventListener('animationend', newImgAminEnd);
	// 		image.classList.remove('slideInDown');
	// 		canSlide = true;

	// 	}
	// }

	function changeImage(){
		image.classList.add('fadeOutGallery');
	}

	function imageAnim(evt){
		
			if(evt.target.classList.contains('slideInDown')) {

				image.classList.remove('slideInDown');
				canSlide = true;

			} else if(evt.target.classList.contains('fadeOutGallery')) {

				image.classList.remove('fadeOutGallery');
				image.classList.remove(image.classList[1]);
				if (currentTheme() == 'light-theme'){
					image.classList.add(visual[currentPosition - 1].whiteImg);
				} else {
					image.classList.add(visual[currentPosition - 1].darkImg);
				}
				image.classList.add('slideInDown');

			}
	}

	document.querySelector('.change-theme-btn').addEventListener('click', changeTheme);
	var darkTheme = document.querySelector('.dark-theme');
	var lightTheme = document.querySelector('.light-theme');

	function changeTheme(evt){

		var currentTransform = activeTheme.style.transform;
		var rootStyles = document.querySelector(':root');

		if (sectionNumber == 10) {
			$.magnificPopup.open({
				disableOn: 700,
				type: 'inline',
				mainClass: 'mfp-fade',
				removalDelay: 160, 
				preloader: false,
				fixedContentPos: false,
				items: {
					src: '<div class="map"><iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad4bdac9789bd80f6171d54bb3aeb90f1aa4717b58dbf54ad9bac2d13e7edf055&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe></div>'
				},
			}, 0);
			return false;
		}

		if (lightTheme.classList.contains('active-theme')) {
			lightTheme.classList.remove('active-theme');
			darkTheme.classList.add('active-theme');
			rootStyles.style.setProperty('--text-color', '#ffffff');
		} else {
			lightTheme.classList.add('active-theme');
			darkTheme.classList.remove('active-theme');
			rootStyles.style.setProperty('--text-color', '#2D2E30');
		}

		activeTheme = document.querySelector('.active-theme');
		activeTheme.style.transform = currentTransform;
		slider = document.querySelector('.active-theme .kitchen-parts__slider-list');
		galleryBox = $('.active-theme .gallery-box');
		galleryItem = document.querySelectorAll('.active-theme .gallery__item-box');
		setKitchenSliderListeners();
		setSliderHeight();
		setSliderWidth();
		renderGallery();
		if(sectionNumber == 11){
			slideScreen('+', 0);
		} else {
			slideScreen('-', 0);
		}
		var themeBg = currentTheme() == 'light-theme' ? '#fff' : '#444b63';
		document.querySelector('.main-container').style.backgroundColor = themeBg;

	}

	// slider 

	var slidePosition = {
		whiteTheme: 0,
		darkTheme: 0
	};
	var slideNumber = {
		whiteTheme: 1,
		darkTheme: 1
	};
	var slider = document.querySelector('.active-theme .kitchen-parts__slider-list');

	var sliderHeight = function(){

		var sliderItem = document.querySelectorAll('.active-theme .kitchen-parts__slider-item');
		var maxHeight = 0;

		for(var n = 0; n < sliderItem.length; n++){
			if(maxHeight < sliderItem[n].clientHeight) maxHeight = sliderItem[n].clientHeight;
		}

		return maxHeight;

	};

	var sliderWidth = function(){

		var sliderItem = document.querySelectorAll('.active-theme .kitchen-parts__slider-item');
		return sliderItem.length * sliderItem[0].clientWidth;

	};

	var slideWidth = function(){

		var sliderItem = document.querySelector('.active-theme .kitchen-parts__slider-item');
		return sliderItem.clientWidth;

	};

	function setSliderHeight(){

		slider.style.height = sliderHeight() + 'px';

	};setSliderHeight();

	function setSliderWidth(){

		slider.style.width = sliderWidth() + 'px';

	};setSliderWidth();

	function setKitchenSliderListeners(){
		document.querySelector('.active-theme .kitchen-parts__btn_next').addEventListener('click', nextSlide);
		document.querySelector('.active-theme .kitchen-parts__btn_prev').addEventListener('click', prevSlide);
	};setKitchenSliderListeners();

	function nextSlide(evt){
		
		var themeColor = currentTheme() == 'light-theme' ? 'whiteTheme' : 'darkTheme';
		var spriteName = currentTheme() == 'light-theme' ? 'sprite-imgScreen3White_' : 'sprite-imgScreen3Dark_';
		var imgColor = currentTheme() == 'light-theme' ? 'whiteImg' : 'darkImg';

		if(slideNumber[themeColor] < 4){
			if(canSlide){
				canSlide = false;
				slidePosition[themeColor] += -slideWidth();
				slideNumber[themeColor]++;
				slider.style.transform = 'translateX('+slidePosition[themeColor]+'px)';
				window.visual[2][imgColor] = spriteName + (slideNumber[themeColor] - 1);
			}
			currentPosition = 3;
			changeImage();
		}

	}

	function prevSlide(evt){

		var themeColor = currentTheme() == 'light-theme' ? 'whiteTheme' : 'darkTheme';
		var spriteName = currentTheme() == 'light-theme' ? 'sprite-imgScreen3White_' : 'sprite-imgScreen3Dark_';
		var imgColor = currentTheme() == 'light-theme' ? 'whiteImg' : 'darkImg';

		if (slideNumber[themeColor] > 1) {
			if (canSlide) {
				canSlide = false;
				slidePosition[themeColor] += +slideWidth();
				slideNumber[themeColor]--;
				slider.style.transform = 'translateX('+slidePosition[themeColor]+'px)';
				window.visual[2][imgColor] = spriteName + (slideNumber[themeColor] - 1);
				currentPosition = 3;
				changeImage();
			}
		}

	}

	// go to slide from menu

	var menuUrl = document.querySelectorAll('.main-menu');

	for(var m = 0; m < menuUrl.length; m++){
		menuUrl[m].querySelector('#screen2').addEventListener('click', slideToSection(11));
		menuUrl[m].querySelector('#screen3').addEventListener('click', slideToSection(10));
	}

	document.querySelector('.contacts__gallery-btn').addEventListener('click', slideToSection(11));

	function slideToSection(sectionNum){
		return function(evt){
			evt.preventDefault();
			//debugger;
			if(sectionNum - sectionNumber > 0) {
				slideScreen('-', sectionNum - sectionNumber);
			} else if (sectionNum - sectionNumber < 0) {
				slideScreen('+', Math.abs(sectionNum - sectionNumber));
			} else {
				return false;
			}
		}
	};

	// slider gallery

	function renderGallery(){

		$('.active-theme .gallery-box').owlCarousel({
			loop:false,
			nav:true,
			navText: ['<button class="gallery__btn gallery__btn_prev"><div class="gallery__btn-round gallery__btn-round_prev"><i class="gallery__btn-prev-arrow icon-arrow"></i></div>Назад</button>','<button class="gallery__btn gallery__btn_next">Вперед<div class="gallery__btn-round gallery__btn-round_next"><i class="gallery__btn-next-arrow icon-arrow"></i></div></button>'],
			responsiveClass:true, 
			responsive : {
				// breakpoint from 0 up
				0 : {
					items: 1,
					margin: 10
				}, 
				 
				//992-1200
				992 : {
					items: 2,
					margin: 10
				},
				// //1200-1400
				1200 : {
					items: 3,
					margin: 20
				},
				// //1400-max
				1400 : {
					items: 3,
					margin: 110
				}
			}
			
			
		});

		var galleryItem = document.querySelectorAll('.active-theme .gallery__item-box');
		var galleryItemWidth = galleryItem[1].clientWidth;
		for(var i = 0; i < galleryItem.length; i++){
			galleryItem[i].style.height = galleryItemWidth + 'px';
		}

	};renderGallery();

	//burger menu
	$(".burger-menu").click(function(){
		$(this).toggleClass("active")
	})
 
	$(".burger-menu").click(function(){
		$(".mobile-menu").fadeToggle();
	})
})();