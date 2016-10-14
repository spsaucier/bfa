// Placeholdr, Copyright (c) 2013 Shane Carr
// https://github.com/vote539/placeholdr
// X11 License
(function(b,c,e,d){var h=function(){var a=b(this);a[d]()||(a.addClass(c),'password'===a.attr('type')&&(a.attr('type','text'),a.data(c+'-pwd',!0)),a[d](a.attr(e)))},f=function(){var a=b(this);a.removeClass(c);a.data(c+'-pwd')&&a.attr('type','password');if(a[d]()===a.attr(e))a[d]('')},k=function(){b(this).find('['+e+']').each(function(){b(this).data(c)&&f.call(this)})};b.fn.placeholdr=function(){e in document.createElement('input')||(b(this).find('['+e+']').each(function(){var a=b(this);a.data(c)||
	(a.data(c,!0),h.call(this),a.focus(f),a.blur(h))}),b(this).find('form').each(function(){var a=b(this);a.data(c)||(a.data(c,!0),a.submit(k))}))};b.fn[d]=b.fn.val;b.fn.val=function(a){var g=b(this);if('undefined'===b.type(a)&&g.data(c)&&g[d]()===g.attr(e))return'';'string'===b.type(a)&&f.call(this);return b.fn[d].apply(this,arguments)};b(function(){b(document).placeholdr()});document.write('<style>.placeholdr{color:#AAA;}</style>')})(jQuery,'placeholdr','placeholder','placeholdrVal');

// jQuery.inview
!function(a){'function'==typeof define&&define.amd?define(['jquery'],a):'object'==typeof exports?module.exports=a(require('jquery')):a(jQuery)}(function(a){function i(){var b,c,d={height:f.innerHeight,width:f.innerWidth};return d.height||(b=e.compatMode,(b||!a.support.boxModel)&&(c='CSS1Compat'===b?g:e.body,d={height:c.clientHeight,width:c.clientWidth})),d}function j(){return{top:f.pageYOffset||g.scrollTop||e.body.scrollTop,left:f.pageXOffset||g.scrollLeft||e.body.scrollLeft}}function k(){if(b.length){var e=0,f=a.map(b,function(a){var b=a.data.selector,c=a.$element;return b?c.find(b):c});for(c=c||i(),d=d||j();e<b.length;e++)if(a.contains(g,f[e][0])){var h=a(f[e]),k={height:h[0].offsetHeight,width:h[0].offsetWidth},l=h.offset(),m=h.data('inview');if(!d||!c)return;l.top+k.height>d.top&&l.top<d.top+c.height&&l.left+k.width>d.left&&l.left<d.left+c.width?m||h.data('inview',!0).trigger('inview',[!0]):m&&h.data('inview',!1).trigger('inview',[!1])}}}var c,d,h,b=[],e=document,f=window,g=e.documentElement;a.event.special.inview={add:function(c){b.push({data:c,$element:a(this),element:this}),!h&&b.length&&(h=setInterval(k,250))},remove:function(a){for(var c=0;c<b.length;c++){var d=b[c];if(d.element===this&&d.data.guid===a.guid){b.splice(c,1);break}}b.length||(clearInterval(h),h=null)}},a(f).on('scroll resize scrollstop',function(){c=d=null}),!g.addEventListener&&g.attachEvent&&g.attachEvent('onfocusin',function(){d=null})});

// // Video background
// new Vidage('#VidageVideo');

// Parallax header
$('.video-bg').parallax({
	'y': '40%',
	'opacity': 0
});
window.addEventListener('load', function() {
	var video = document.querySelector('.video-bg video');
	function checkLoad() {
		if (video.readyState === 4) {
			setTimeout(function () {
				// Parallax intro text
				$('.bg-video').parallax({
					'scale': 1.5
				});
			}, 100);
		} else {
			setTimeout(checkLoad, 100);
		}
	}
	checkLoad();
}, false);

// HTML5 Validation
hyperform(document.forms[0]);

// Fade in on scroll
window.sr = ScrollReveal();
sr.reveal('.vidage .text');
sr.reveal('.box', 100);
sr.reveal('.hitter .row', 100);
sr.reveal('.blue-section .row', 100);
sr.reveal('.share', 100);
sr.reveal('.girls blockquote', 100);
sr.reveal('.feed a', 150);

jQuery(function(){
	// Replace placeholder image with autoplaying video
	$('a.vid-img').on('click', function (e) {
		e.preventDefault();
		$(this).next().html('<iframe src="https://www.youtube.com/embed/V0xad8q061I?modestbranding=1&autoplay=true" frameborder="0" allowfullscreen></iframe>').show();
		$(this).hide();
	});

	// Modal Popups
	$('.popup-yt').magnificPopup({
		type:'iframe'
	});

	$('.popup-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',
		// When element is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});


	// IE Placeholders
	jQuery.support.placeholder = (function(){
		var i = document.createElement('input');
		return 'placeholder' in i;
	})();
	if (!jQuery.support.placeholder) $(document).placeholdr();


	// Auto-format phone numbers
	$('input[type=tel]').formatter({
	  'pattern': ' ({{999}}) {{999}}-{{9999}}'
	});


	// Submit form to Zapier
	$('form').submit(function (e) {
		//prevent Default functionality
		e.preventDefault();

		var that = this;

		//get the action-url of the form
		var actionurl = e.currentTarget.action;

		//do your own request an handle the results
		$.ajax({
			url: actionurl,
			type: 'post',
			dataType: 'json',
			data: $(this).serialize(),
			success: function(data) {
				$(that).find('.form').hide()
				.next().show();
			}
		});
	});


	// Fixed menu
	function setMenu() {
		var scrollPos = $(window).scrollTop();
		if (scrollPos <= 200) {
			$('.header.fixed.visible').removeClass('visible')
		} else {
			$('.header.fixed').addClass('visible');
		}
		// // Set girls image to zoom when in view
		// if (scrollPos > $(".video-section h2").offset().top) {
		// 	$(".girls").addClass('in-view');
		// } else {
		// 	$(".girls").removeClass('in-view');
		// }
	}
	$(window).on('scroll', setMenu);
	setMenu();


	// Set girls image to zoom when in view
	$('.girls').on('inview', function(event, isInView) {
		if (isInView) {
			$('.girls').addClass('in-view');
		} else {
			$('.girls').removeClass('in-view');
		}
	});
});