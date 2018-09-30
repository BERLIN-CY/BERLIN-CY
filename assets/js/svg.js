var r1 = 40;
var r2 = r1;
var innerHeight = 500;

var cy = 50;
var cx1 = 100;
var cx2 = cx1;

$(window).scroll(function() {
  var scrollTop = $(document).scrollTop();
  // mapped distance for r2 circle to move
  var d = (r1 * scrollTop) / innerHeight;
  // get r2 with r1 and d
  r2 = Math.sqrt(r1 * r1 - d * d);

  cx2 = cx1 + d;

  $("#r2").attr("d", d);
  $("#r2").attr("r", r2);
});
