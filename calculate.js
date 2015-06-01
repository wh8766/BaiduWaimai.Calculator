// Closure
(function () {
    /**
     * Decimal adjustment of a number.
     *
     * @param {String}  type  The type of adjustment.
     * @param {Number}  value The number.
     * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number} The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function (value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function (value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function (value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();
(function () {
    $("#commit_cart .red-tip").first().remove();

    var total = Number($("#total_money").text());
    //    var reduce = Number($(".item-price-all span").last().text());
    var reduce = 0;
    var sendFee = Number($("#sendFee").text());
    var feeAll = 0;

    var every = $("#commit_cart .red-tip");
    every.each(function () {
        var t = $(this).text()
        feeAll += Number(t.substr(1));
    });

    $(".premium-icon").each(function () {
        var _reduce = $(this).parents(".item").find(".item-price-all span").text();
        reduce += Number(_reduce);
    })

    console.log("拼单合计" + feeAll);
    console.log("运费" + sendFee);
    console.log("各种优惠" + reduce);
    console.log("支付费用" + total);

    var o = 0;
    var perSendFee = sendFee / every.size();
    console.log("人均承担运费" + perSendFee);
    var cal = function (fee) {
        var re = Math.round10(fee - fee * (reduce) / feeAll + perSendFee, -1)
        o += re;
        return re;
    }
    every.each(function () {
        var fee = $(this).text().substr(1);
        $(this).text("原费用：" + fee + "，满减分摊后：" + cal(Number(fee)));
    })
    console.log("计算支付费用合计" + o);
})();
