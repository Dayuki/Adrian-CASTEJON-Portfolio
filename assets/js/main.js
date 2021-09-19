/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    var $window = $(window),
        $body = $('body'),
        $nav = $('#nav');
		$clickables = $('.item');

    // Breakpoints.
    breakpoints({
        wide: ['961px', '1880px'],
        normal: ['961px', '1620px'],
        narrow: ['961px', '1320px'],
        narrower: ['737px', '960px'],
        mobile: [null, '736px']
    });

    // Play initial animations on page load.
    $window.on('load', function() {
		$clickables.each(function(){
			$(this).on("click", () => {
				console.log();
                if($(this).data('path') == "assets/projects/AcheronEscape/Main.swf")
                    return;
                $('embed').attr('src', $(this).data('path'));
			});
		})
		// for (var i = 0; i < $clickables.length; i++) {
		// 	$clickables[i].on("click", function(){
		// 		console.log("oui");
		// 	})
		// }
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    $("#contact-form").submit(function(e){
    e.preventDefault();
    var ar = $(this).serializeArray();
    $.post("assets/php/contact.php",ar,function(data){
        console.log($("input[name=email]"));
        $("input[name=email]").val("");
        $("input[name=name]").val("");
        $("input[name=object]").val("");
        $("textarea[name=message]").val("Message sent!");
    });
});
    $('body').append(`
    <div class="lightbox">
      <a href="#lightbox" class="lightbox-close lightbox-toggle">X</a>
      <div class="lightbox-container">
        <div class="row">
          <div class="col-sm-12 lightbox-column">
            
          </div>
        </div>
      </div>
    </div>
  `);

$('.lightbox-toggle').on('click', (event) => {
  event.preventDefault();
  $('.lightbox').fadeToggle('fast');
  
  let context = $(event.currentTarget).attr('data-lightbox-type');
  let content = $(event.currentTarget).attr('data-lightbox-content');
  console.log(event);
  if (context == 'video') {
    $('.lightbox-column').append(`
        <div class="lightbox-video">
        <iframe src="${content}" frameborder="0" allowfullscreen> </iframe>
        </div>
    `);
  } else if (context == 'image') {
    $('.lightbox-column').append(`
        <img src="${content}" class="img-" frameborder="0" allowfullscreen>
    `);
  }
});

$('.lightbox-close').on('click', (event) => {
  event.preventDefault();
  $('.lightbox-column > *').remove();
});

    // Nav.
    var $nav_a = $nav.find('a');

    $nav_a
        .addClass('scrolly')
        .on('click', function(e) {

            var $this = $(this);

            // External link? Bail.
            if ($this.attr('href').charAt(0) != '#')
                return;

            // Prevent default.
            e.preventDefault();

            // Deactivate all links.
            $nav_a.removeClass('active');

            // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
            $this
                .addClass('active')
                .addClass('active-locked');

        })
        .each(function() {

            var $this = $(this),
                id = $this.attr('href'),
                $section = $(id);

            // No section for this link? Bail.
            if ($section.length < 1)
                return;

            // Scrollex.
            $section.scrollex({
                mode: 'middle',
                top: '-10vh',
                bottom: '-10vh',
                initialize: function() {

                    // Deactivate section.
                    $section.addClass('inactive');

                },
                enter: function() {

                    // Activate section.
                    $section.removeClass('inactive');

                    // No locked links? Deactivate all links and activate this section's one.
                    if ($nav_a.filter('.active-locked').length == 0) {

                        $nav_a.removeClass('active');
                        $this.addClass('active');

                    }

                    // Otherwise, if this section's link is the one that's locked, unlock it.
                    else if ($this.hasClass('active-locked'))
                        $this.removeClass('active-locked');

                }
            });

        });

    // Scrolly.
    $('.scrolly').scrolly();

    // Header (narrower + mobile).

    // Toggle.
    $(
            '<div id="headerToggle">' +
            '<a href="#header" class="toggle"></a>' +
            '</div>'
        )
        .appendTo($body);

    // Header.
    $('#header')
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'left',
            target: $body,
            visibleClass: 'header-visible'
        });

})(jQuery);
