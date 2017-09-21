(function(window, document, $) {
  function fastClick() {
    var supportTouch = function() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    }();
    var _old$On = $.fn.on;

    $.fn.on = function() {
      if (/click/.test(arguments[0]) && typeof arguments[1] == 'function' && supportTouch) { // 只扩展支持touch的当前元素的click事件
        var touchStartY, callback = arguments[1];
        _old$On.apply(this, ['touchstart', function(e) {
          touchStartY = e.changedTouches[0].clientY;
        }]);
        _old$On.apply(this, ['touchend', function(e) {
          if (Math.abs(e.changedTouches[0].clientY - touchStartY) > 10) return;

          e.preventDefault();
          callback.apply(this, [e]);
        }]);
      } else {
        _old$On.apply(this, arguments);
      }
      return this;
    };
  }


  fastClick();
}(window, document, Zepto));
