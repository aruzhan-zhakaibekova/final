var delay = 0;
$('[data-aos]').each(function() {
   if($(this).is(":visible")){
       delay = delay + 400;
       $(this).attr('data-aos-delay', delay);
   }
});

AOS.init();

var ham = document.querySelector('.hamburger-container');
var	pageBody = document.querySelector('.page');
var menu = document.querySelector('.menu');
    ham.onclick = function () {
		if (ham.classList.contains('open')) {
			pageBody.classList.remove('open');
			ham.classList.remove('open');
      menu.style.display = "none";
		} else {
			pageBody.classList.add('open');
			ham.classList.add('open');
      menu.style.display = "block";
		}
	};
