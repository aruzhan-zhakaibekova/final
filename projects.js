var delay = 0;
$('[data-aos]').each(function() { //add delay to aos animation so that animations are in sequence, not simultaneous
   if($(this).is(":visible")){
       delay = delay + 400;
       $(this).attr('data-aos-delay', delay);
   }
});

AOS.init(); //initialize AOS library

var ham = document.querySelector('.hamburger-container');//hamburger menu for mobile setting things up
var	pageBody = document.querySelector('.page');
var menu = document.querySelector('.menu');
    ham.onclick = function () {
		if (ham.classList.contains('open')) { //hamburger menu for mobile: rotate the menu and page, show links in menu, change page z-index to make link clickable
			pageBody.classList.remove('open');
			ham.classList.remove('open');
      menu.style.display = "none";
		} else {
			pageBody.classList.add('open');
      pageBody.style.zIndex = "-1";
			ham.classList.add('open');
      menu.style.display = "block";
		}
	};
