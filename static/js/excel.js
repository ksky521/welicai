var ExcelFormulas = {

  PVIF: function(rate, nper) {
    return Math.pow(1 + rate, nper);
  },

  FVIFA: function(rate, nper) {
    return rate == 0 ? nper : (this.PVIF(rate, nper) - 1) / rate;
  },

  PMT: function(rate, nper, pv, fv, type) {
    if (!fv) fv = 0;
    if (!type) type = 0;

    if (rate == 0) return -(pv + fv) / nper;

    var pvif = Math.pow(1 + rate, nper);
    var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type == 1) {
      pmt /= (1 + rate);
    };

    return pmt;
  },

  IPMT: function(pv, pmt, rate, per) {
    var tmp = Math.pow(1 + rate, per);
    return 0 - (pv * tmp * rate + pmt * (tmp - 1));
  },

  PPMT: function(rate, per, nper, pv, fv, type) {
    if (per < 1 || (per >= nper + 1)) return null;
    var pmt = this.PMT(rate, nper, pv, fv, type);
    var ipmt = this.IPMT(pv, pmt, rate, per - 1);
    return pmt - ipmt;
  },

  DaysBetween: function(date1, date2) {
    var oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
  },

  // Change Date and Flow to date and value fields you use
  XNPV: function(rate, values, dates) {
    var xnpv = 0.0;
    var firstDate = dates[0];
    for (var i = 0; i < values.length; i++) {
      var value = values[i];
      var date = dates[i];
      xnpv += value / Math.pow(1 + rate, this.DaysBetween(firstDate, date) / 365);
    }

    return xnpv;
  },
  FV: function(rate, nper, pmt, pv, type) {
    if (!type) type = 0;

    var pow = Math.pow(1 + rate, nper);
    var fv = 0;

    if (rate) {
      fv = (pmt * (1 + rate * type) * (1 - pow) / rate) - pv * pow;
    } else {
      fv = -1 * (pv + pmt * nper);
    }

    return fv;
  },
  XIRR: function(values, dates, guess) {
    if (!guess) guess = 0.1;

    var x1 = 0.0;
    var x2 = guess;
    var f1 = this.XNPV(x1, values, dates);
    var f2 = this.XNPV(x2, values, dates);

    for (var i = 0; i < 100; i++) {
      if ((f1 * f2) < 0.0) break;
      if (Math.abs(f1) < Math.abs(f2)) {
        f1 = this.XNPV(x1 += 1.6 * (x1 - x2), values, dates);
      } else {
        f2 = this.XNPV(x2 += 1.6 * (x2 - x1), values, dates);
      }
    };

    if ((f1 * f2) > 0.0) return null;

    var f = this.XNPV(x1, values, dates);
    if (f < 0.0) {
      var rtb = x1;
      var dx = x2 - x1;
    } else {
      var rtb = x2;
      var dx = x1 - x2;
    };

    for (var i = 0; i < 100; i++) {
      dx *= 0.5;
      var x_mid = rtb + dx;
      var f_mid = this.XNPV(x_mid, values, dates);
      if (f_mid <= 0.0) rtb = x_mid;
      if ((Math.abs(f_mid) < 1.0e-6) || (Math.abs(dx) < 1.0e-6)) return x_mid;
    };

    return null;
  }

};
