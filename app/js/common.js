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
			gradient: 'linear-gradient(0deg, rgba(218,255,255,1) 0%, rgba(168,187,255,1) 50%)',
			whiteImg: 'noImg',
			darkImg: 'noImg' 
		},
		{
			gradient: 'url("assets/img/map.jpeg")',
			whiteImg: 'noImg',
			darkImg: 'noImg'
		},
		{
			gradient: 'linear-gradient(0deg, rgba(218,255,255,1) 0%, rgba(168,187,255,1) 50%)',
			whiteImg: 'noImg',
			darkImg: 'noImg'
		},
		{
			gradient: 'linear-gradient(0deg, rgba(168,187,255,1) 0%, rgba(254,148,148,1) 50%)',
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

	var el = document.querySelector('.main-container');

	let pageWidth = window.innerWidth || document.body.clientWidth;
	let treshold = Math.max(1,Math.floor(0.01 * (pageWidth)));
	let touchstartX = 0;
	let touchstartY = 0;
	let touchendX = 0;
	let touchendY = 0;
	var limit = Math.tan(45 * 1.5 / 180 * Math.PI);

	document.addEventListener('touchstart', function(event) {
			touchstartX = event.changedTouches[0].screenX;
			touchstartY = event.changedTouches[0].screenY;
	}, false);

	document.addEventListener('touchend', function(event) {
			touchendX = event.changedTouches[0].screenX;
			touchendY = event.changedTouches[0].screenY;
			handleGesture(event);
	}, false);

	function handleGesture(e) {
		let x = touchendX - touchstartX;
		let y = touchendY - touchstartY;
		let xy = Math.abs(x / y);
		let yx = Math.abs(y / x);
		if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
				if (xy <= limit && canSlide) {
						if (y < -120) {
							slideScreen('-', 1);
						} else if (y > 120) {
							slideScreen('+', 1);
						}
				}
		}
	}

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

	if (document.querySelector('.change-theme-btn')) {
		document.querySelector('.change-theme-btn').addEventListener('click', changeTheme);
	}
	var darkTheme = document.querySelector('.dark-theme');
	var lightTheme = document.querySelector('.light-theme');

	function changeTheme(evt){

		var currentTransform = activeTheme.style.transform;
		var rootStyles = document.querySelector(':root');

		if (sectionNumber == 11) {
			$.magnificPopup.open({
				disableOn: 700,
				type: 'inline',
				mainClass: 'mfp-fade',
				removalDelay: 160, 
				preloader: false,
				fixedContentPos: false,
				items: {
					src: '<div class="map"><iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A5c55a5fa335e6239f1ae854898e91cc21b392ba7bfa34ab8eefff3c6dbfde4aa&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe></div>'
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
		if(document.querySelector('.active-theme .contacts__gallery-btn')){
			document.querySelector('.active-theme .contacts__gallery-btn').addEventListener('click', function(evt){
				evt.preventDefault();
				slideToSection(10);
			});
		} 
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

	if (document.querySelector('.active-theme .kitchen-parts__slider-list')) {

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
				if (!document.querySelector('.about-slider')) {
					window.visual[2][imgColor] = spriteName + (slideNumber[themeColor] - 1);
				}
			}
			if (!document.querySelector('.about-slider')) {
			currentPosition = 3;
			} else {
				currentPosition = 1;
			}
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
				if (!document.querySelector('.about-slider')) {
					window.visual[2][imgColor] = spriteName + (slideNumber[themeColor] - 1);
				}
				if (!document.querySelector('.about-slider')) {
					currentPosition = 3;
					} else {
						currentPosition = 1;
					}
				changeImage(); 
			}
		}

	}

	}

	// go to slide from menu

	var menuUrl = document.querySelectorAll('.main-menu');
	var mobileMenuUrl = document.querySelector('.mobile-menu');

	for(var m = 0; m < menuUrl.length; m++){
		menuUrl[m].querySelector('#screen2').addEventListener('click', function(){
			if(window.location.pathname.length > 1) {
				window.location.href = window.location.origin + '#screen2';
			} else {
				slideToSection(10);
			}
		});
		menuUrl[m].querySelector('#screen3').addEventListener('click', function(){
			if(window.location.pathname.length > 1) {
				window.location.href = window.location.origin + '#screen3';
			} else {
				slideToSection(11);
			}
		});  
	}

	mobileMenuUrl.querySelector('#screen2').addEventListener('click', function(){
		if(window.location.pathname.length > 1) {
			window.location.href = window.location.origin + '#screen2';
		} else {
			slideToSection(10);
		}
	});
  mobileMenuUrl.querySelector('#screen3').addEventListener('click', function(){
		if(window.location.pathname.length > 1) {
			window.location.href = window.location.origin + '#screen3';
		} else {
			slideToSection(11);
		}
	}); 

	
	
	if(document.querySelector('.active-theme .contacts__gallery-btn')) {
		document.querySelector('.active-theme .contacts__gallery-btn').addEventListener('click', function(evt){
			evt.preventDefault();
			slideToSection(10);
		});
	} 

	function slideToSection(sectionNum){
		//	debugger;
			if(sectionNum - sectionNumber > 0) {
				slideScreen('-', sectionNum - sectionNumber);
			} else if (sectionNum - sectionNumber < 0) {
				slideScreen('+', Math.abs(sectionNum - sectionNumber));
			} else {
				return false;
			}
			if(mobileMenuUrl.style.display == 'block') {
				$(".mobile-menu").fadeToggle();
				$(".burger-menu").toggleClass("active");
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
					items: 1,
					margin: 10
				},
				// //1200-1400
				1200 : {
					items: 1,
					margin: 20
				},
				// //1400-max
				1400 : {
					items: 1,
					margin: 110
				}
			}
			
			
		});

		$('#light-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			}
		});

		$('#dark-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			}
		});

		if (document.querySelector('.active-theme .gallery__item-box')) {
			var galleryItem = document.querySelectorAll('.active-theme .gallery__item-box');
			var galleryItemWidth = galleryItem[1].clientWidth;
			for(var i = 0; i < galleryItem.length; i++){
				galleryItem[i].style.height = galleryItemWidth + 'px';
			}
		}

	};renderGallery();

	//burger menu
	$(".burger-menu").click(function(){
		$(this).toggleClass("active");
	})
 
	$(".burger-menu").click(function(){
		$(".mobile-menu").fadeToggle();
	})
	//popup
	$('.open-popup').magnificPopup({
		type:'inline',
		midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	});

	if(window.location.hash == '#screen2') {
		slideToSection(10);
	} else if (window.location.hash == '#screen3') {
		slideToSection(11);
	}

})();