window.onload = function () {


	$(".info-left__desc__cd")
  .countdown("2020/7/29", function(event) {
    $(this).text(
      event.strftime('%-D')
    );
  });

};