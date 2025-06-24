window.gMapsCallback = function () {
  $(window).trigger("gMapsLoaded");
};

$(document).ready(function () {
  $(this).scrollTop(0);

  $(window).scroll(function () {
    $(".bg").css({
      opacity: 1 - $(this).scrollTop() / 300,
    });
  });

  function loadGoogleMaps() {
    var script_tag = document.createElement("script");
    script_tag.setAttribute("type", "text/javascript");
    script_tag.setAttribute(
      "src",
      "http://maps.google.com/maps/api/js?key=API_KEY&sensor=false&callback=gMapsCallback",
    );
    (
      document.getElementsByTagName("head")[0] || document.documentElement
    ).appendChild(script_tag);
  }

  function readyMap(location, lat, lng) {
    function initialize() {
      var mapOptions = {
        zoom: 17,
        center: new google.maps.LatLng(lat, lng),
      };

      var map = new google.maps.Map(
        document.getElementById("map-" + location),
        mapOptions,
      );

      var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        optimized: false,
      });
    }

    $(window).bind("gMapsLoaded", initialize);
    loadGoogleMaps();
  }

  // When return from thank you.
  var thankYou = getParameterByName("thank-you");

  switch (thankYou) {
    case "1":
      $("body").addClass("no-scroll");
      $(".thank-you").show();
      $(".thank-you-1").show();

      readyMap("tw", 24.828089, 121.755484);

      break;

    case "2":
      $("body").addClass("no-scroll");
      $(".thank-you").show();
      $(".thank-you-2").show();

      readyMap("kk", 5.856891, 118.080124);

      break;

    case "3":
      $("body").addClass("no-scroll");
      $(".thank-you").show();
      $(".thank-you-3").show();
      break;
  }

  // Form
  var step = 1,
    $back = $(".back");
  ($close = $(".close")),
    ($closeThankYou = $(".close-thank-you")),
    ($box = $(".mask .box-3")),
    ($submit = $(".submit")),
    ($form = $("#frm-rsvp"));

  // always show section-1
  $(".section-" + step)
    .show()
    .closest("form")[0]
    .reset();

  $(".rsvp").on("click", function () {
    $(".mask").fadeIn();
    $("body").addClass("no-scroll");
  });

  $close.on("click", function () {
    $(".mask").fadeOut();

    $("body").removeClass("no-scroll");
  });

  $closeThankYou.on("click", function () {
    $(".thank-you").fadeOut();

    $("body").removeClass("no-scroll");
  });

  $('input[name="who"]').on("click", function () {
    var value = $(this).val();

    $(".section-" + step).fadeOut();

    step = 2;

    $(".section-" + step).fadeIn();
    $box.height($(".section-" + step).outerHeight());

    $("html, body").animate(
      {
        scrollTop: $("#frm-rsvp .box-2").offset().top - 20,
      },
      200,
    );

    $back.fadeIn();
  });

  $('input[name="where"]').on("click", function () {
    var value = $(this).val();

    $(".section-" + step).fadeOut();

    step = 3;

    // check the value
    if (value === "Taiwan" || value === "Sabah") {
      $(".is-coming").addClass("show");
    } else {
      $(".is-coming").removeClass("show");
    }

    if (value === "Taiwan") {
      $(".is-taiwan").addClass("show");
    } else {
      $(".is-taiwan").removeClass("show");
    }

    if (value === "Invitation Card") {
      $(".card").addClass("show");
    } else {
      if ($(".card:eq(0)").hasClass("show") === false) {
        $(".card").removeClass("show");
      }
    }

    if (value === "Regards") {
      $(".not-coming").addClass("show");
    } else {
      $(".not-coming").removeClass("show");
    }

    $(".section-" + step).fadeIn();
    $box.height($(".section-" + step).outerHeight());

    $("html, body").animate(
      {
        scrollTop: $("#frm-rsvp .box-2").offset().top - 20,
      },
      200,
    );

    $('[name="name"]').focus();

    $back.fadeIn();
  });

  $back.on("click", function () {
    $(".section-" + step).fadeOut();

    step -= 1;

    $(".section-" + step).fadeIn();
    $box.height($(".section-" + step).outerHeight());

    $("html, body").animate(
      {
        scrollTop: $("#frm-rsvp .box-2").offset().top - 20,
      },
      200,
    );

    if (step === 1) {
      $back.fadeOut();
    }
  });

  $form.on("submit", function (e) {
    return true;
  });

  // To get the query
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
});
