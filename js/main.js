const headerMenu = document.getElementById("header");
const bottomToTopBtn = document.getElementById("bottomToTopBtn");







// Change Header Background on Scrolling
window.addEventListener("scroll", () => {
	if (this.scrollY >= 85) {
		headerMenu.classList.add("on-scroll");
	} else {
		headerMenu.classList.remove("on-scroll");
	}
});

window.onscroll = function() {
	scrollFunction()
	scrollTopFunc()
}

// Header Sticky Add
function scrollFunction() {
	const sn = document.getElementById("sticky_nav");
	if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
		sn.style.background = '#fff'
		sn.style.position = 'fixed'
		sn.style.paddingTop = '10px'
		sn.style.paddingBottom = '10px'

	} else {
		sn.style.position = 'relative'
		sn.style.background = 'transparent'
		sn.style.top = '0'
		sn.style.paddingTop = '15px'
		sn.style.paddingBottom = '15px'
	}
}


function scrollTopFunc() {
	if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
		bottomToTopBtn.style.display = "block";
	} else {
		bottomToTopBtn.style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}












$ = jQuery.noConflict();




