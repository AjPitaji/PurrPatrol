$(document).ready(function () {
  const eye = $(".eye");

  $("#bg").mousemove(function (event) {
    const eyeX = eye.offset().left + eye.width() / 2;
    const eyeY = eye.offset().top + eye.height() / 2;
    const rad = Math.atan2(event.pageX - eyeX, event.pageY - eyeY);
    const rot = rad * (180 / Math.PI) * -1 + 180;

    eye.css({
      "-webkit-transform": "rotate(" + rot + "deg)",
      "-moz-transform": "rotate(" + rot + "deg)",
      "-ms-transform": "rotate(" + rot + "deg)",
      transform: "rotate(" + rot + "deg)",
    });
  });
});

$(document).ready(function () {
  const eye = $(".eye1");

  $("#bg").mousemove(function (event) {
    const eyeX = eye.offset().left + eye.width() / 2;
    const eyeY = eye.offset().top + eye.height() / 2;
    const rad = Math.atan2(event.pageX - eyeX, event.pageY - eyeY);
    const rot = rad * (180 / Math.PI) * -1 + 180;

    eye.css({
      "-webkit-transform": "rotate(" + rot + "deg)",
      "-moz-transform": "rotate(" + rot + "deg)",
      "-ms-transform": "rotate(" + rot + "deg)",
      transform: "rotate(" + rot + "deg)",
    });
  });
});