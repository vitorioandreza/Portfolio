$(function() {
	siteBoot();
	siteScroll();
	siteResize();

	$(window).on('load scroll', siteScroll);
	$(window).on('load resize', debounce(5, siteResize));
    
});

var siteScroll = function () {
	var viewport = $(window).height();
	var windowScroll = $(window).scrollTop();
	$('.site-header').toggleClass('shrink', windowScroll >= 120);

	$('section').each(function() {
        var address = '#' + $(this).attr('id');
        if ($(address).offset()) {
        	var diff = $(address).offset().top - ($(address).outerHeight() * 0.30);

	        if (diff < windowScroll + $('.site-header').outerHeight()) {
	            $('.site-header .menu li a').removeClass('active');
	            $('.site-header .menu li a:not([modal])[href$="' + address + '"]').addClass('active');
	        }
        }
    });

    $('[class*="animate-"]').each(function() {
    	var limit = $(window).outerWidth() < 992 ? $(this).outerHeight() * 0.20 : $(this).outerHeight() * 0.35;
        $(this).toggleClass('visible', windowScroll + viewport >= $(this).offset().top + limit);
    });
}

var siteBoot = function () {
	$('.site-header .toggle').on('click', function () {
		$('.site-header .menu').toggleClass('active');
		$('body').toggleClass('scroll-hidden');
	});

	$('.site-header .menu li a').on('click', function (event) {
		event.preventDefault();

		$('.site-header .menu').removeClass('active');
		$('body').removeClass('scroll-hidden');

		
		if ($(this).attr('modal') !== undefined) {
			$('#sobre').addClass('show');
		} else {
			var sec = $(this).attr('href');

			$('body, html').animate({
				scrollTop: $(sec).offset().top - $('.site-header').height()
			}, 1500);
		}
	});

	$('#sobre .on-close').on('click', function () {
		$('#sobre').removeClass('show');
	});

	$('.scroll-down').on('click', function () {
		var sec = $(this).val();

		$('body, html').animate({
			scrollTop: $(sec).offset().top - $('.site-header').height()
		}, 1500);
	});

	setTimeout(function() {
		$(window).scrollTop(0);
        $('body').removeClass('scroll-hidden');
        $('.preload').fadeOut();
    }, 4820);
}

var siteResize = function () {
	if ($(window).outerWidth() > 991) {
		$('#contato .links a').on('mouseenter', function () {
			var rem = parseInt($(this).find('i').width() + $(this).find('span').width() + 40) / 10;
			$(this).css('width', rem + 'rem');
		}).on('mouseleave', function () {
			$(this).css('width', '5.5rem');
		});
	} else {
		$('#contato .links a').css('width', 'auto');
	}
}


var debounce = function (delay, callback) {
    var timer = 0;
    return function () {
        if (timer)
            clearTimeout(timer);

        timer = setTimeout(callback, delay);
    }
}