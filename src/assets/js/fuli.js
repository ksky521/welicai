(function(window, document, $, weui) {
    (function fastClick() {
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
    }());
    // fastClick();
    weui.tab('#tab', {
        defaultIndex: 0,
        onChange: function(index) {
            // console.log(index);
        }
    });


    //复利计算
    $('#sy-btn').click(function() {
        var values = {};
        var done = true;
        ['money', 'rate', 'period'].forEach(function(id) {
            var $node = $('#sy-' + id);
            var val = $node.val();
            if (val) {
                values[id] = val;
            } else {
                done && weui.topTips('请填写正确的字段', {
                    duration: 3000,
                    className: 'custom-classname'
                });
                done = false;

            }
        });
        if (done) {
            var $node = $('#sy-multiple');
            var multiple = $node.val();

            var money = values.money * multiple;
            var rate = (1 + values.rate / 100);
            var period = values.period;
            var total = 0;
            var sum = 0;
            for (var i = 1; i <= period; i++) {
                total += money;
                sum = (sum + money) * rate;
            }

            sum = parseFloat(sum).toFixed(2);

            $('#sy-result').html('￥' + sum);
            $('#sy-principal').html(total);
            $('#sy-interest').html(parseFloat(sum - total).toFixed(2));
            $('#sy-form').show();

        }
    });

    //定投计算
    $('input[type=radio][name=dt-period]').change(function() {
        switch (this.id) {
            case 'r3':
                $('#dt-dayPeriod').show();
                break;
            default:
                $('#dt-dayPeriod').hide();
        }
    });


}(window, document, Zepto, weui));
