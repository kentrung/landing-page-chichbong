$(function () {
  $.ajax({
    url: "http://119.82.135.247:3002/api/geolocate",
    type: "GET",
  })
    .done(function (res) {
      const iso_code = res.data.iso_code || "VN";
      i18n.init(
        {
          resGetPath: "./assets/js/languages/__lng__.json",
          debug: false,
          fallbackLng: "vn",
          load: "unspecific",
        },
        function () {
          $("body").i18n();
        }
      );
      if (iso_code == "CN") {
        setCurrentLanguage(".china");
      } else if (iso_code == "TH") {
        setCurrentLanguage(".thailand");
      } else {
        setCurrentLanguage(".vietnam");
      }
    })
    .fail(function () {});

  function configDropdownLanguage(language) {
    if (language === ".thailand") {
      $.i18n.setLng("th", function () {
        $("body").i18n();
      });
      $(".header-language-switch-current").html("TH");
      $(".header-language-switch-current-img").attr(
        "src",
        "assets/images/country/thailand.png"
      );
    } else if (language === ".china") {
      $.i18n.setLng("cn", function () {
        $("body").i18n();
      });
      $(".header-language-switch-current").html("CN");
      $(".header-language-switch-current-img").attr(
        "src",
        "assets/images/country/china.png"
      );
    } else {
      $.i18n.setLng("vn", function () {
        $("body").i18n();
      });
      $(".header-language-switch-current").html("VN");
      $(".header-language-switch-current-img").attr(
        "src",
        "assets/images/country/vietnam.png"
      );
    }
  }
  function setCurrentLanguage(language) {
    $(".header-language-switch-dropdown").hide();
    $(".header-language-switch-dropdown li").removeClass("active");
    $(language).parent().addClass("active");
    configDropdownLanguage(language);
  }

  // Change languages
  $(".china").on("click", function () {
    setCurrentLanguage(".china");
  });
  $(".thailand").on("click", function () {
    setCurrentLanguage(".thailand");
  });
  $(".vietnam").on("click", function () {
    setCurrentLanguage(".vietnam");
  });

  // click show dropdown language
  let isShowDropdownLang = false;
  $(".header-language-switch-view").on("click", function () {
    isShowDropdownLang
      ? $(".header-language-switch-dropdown").hide()
      : $(".header-language-switch-dropdown").show();
    isShowDropdownLang = !isShowDropdownLang;
  });

  // hidden dropdown language
  $(document).mouseup(function (e) {
    const container = $(".header-language-switch-dropdown");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.hide();
      isShowDropdownLang = false;
    }
  });
});
