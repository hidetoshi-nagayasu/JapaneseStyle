$(function() {

	let imageArray = [];
	let imageSrcArray = [];
	$(".gallery-contents").find("img").each(function() {
		imageArray.push( $(this) );
		imageSrcArray.push( $(this).attr("src") );
	});
	
	$(".gallery-contents .img-parent").on('click', function() {
		$(".lightbox").fadeIn(300);
    $(".lightbox").append("<img src='" + $(this).children("img").attr("src") + "' alt='" + $(this).children("img").attr("alt") + "' />");
    $(".filter").css("background-image", "url(" + $(this).children("img").attr("src") + ")");
		$("html").css("overflow", "hidden");
		
		let currentSrc = $(this).children("img").attr("src");

    if (imageSrcArray[imageSrcArray.length - 1] == currentSrc) {
      $(".arrowr").css("display", "none");
      $(".arrowl").css("display", "block");
    } else if (imageSrcArray[0] == currentSrc) {
      $(".arrowr").css("display", "block");
      $(".arrowl").css("display", "none");
    } else {
      $(".arrowr").css("display", "block");
      $(".arrowl").css("display", "block");
    }
  });

  $(".close").click(function() {
    $(".lightbox").fadeOut(300);
    // $("h1").remove();
    $(".lightbox img").remove();
    $("html").css("overflow", "auto");
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $(".lightbox").fadeOut(300);
      $(".lightbox img").remove();
      $("html").css("overflow", "auto");
    }
  });

  $(".arrowr").click(function() {
    var imgSrc = $(".lightbox img").attr("src");
		var search = $(".gallery-contents").find("img[src$='" + imgSrc + "']");

		let srcIndex = $.inArray(imgSrc, imageSrcArray);
    var newImage = imageSrcArray[srcIndex + 1];
    /*$(".lightbox img").attr("src", search.next());*/
    $(".lightbox img").attr("src", newImage);
    $(".filter").css("background-image", "url(" + newImage + ")");

    if ( imageSrcArray[imageSrcArray.length - 1] != newImage ) {
			$(".arrowl").css("display", "block");
    } else {
      $(".arrowr").css("display", "none");
    }
  });

  $(".arrowl").click(function() {
    var imgSrc = $(".lightbox img").attr("src");
		var search = $(".gallery-contents").find("img[src$='" + imgSrc + "']");
		let srcIndex = $.inArray(imgSrc, imageSrcArray);
    var newImage = imageSrcArray[srcIndex - 1];
    /*$(".lightbox img").attr("src", search.next());*/
    $(".lightbox img").attr("src", newImage);
		$(".filter").css("background-image", "url(" + newImage + ")");

		console.log(imageSrcArray[0]);
		console.log(newImage);

    if ( imageSrcArray[0].toString() != newImage.toString() ) {
      $(".arrowr").css("display", "block");
    } else {
      $(".arrowl").css("display", "none");
    }
  });

  $('#scroll').on('click', function() {
    const speed = 1000;
    const href = $(this).attr("href");
    const target = $(href == "#" || href == "" ? 'html' : href);
    const position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });

  // ギャラリーエリアに来たらアニメーション表示
  $(window).scroll(function () {
    const $galleryContents = $('.img-parent');
    if ($(this).scrollTop() > 60) {
      $galleryContents.each(function(i) {
        $(this).delay(100 * i).fadeIn(100);
      });
    }
});

});