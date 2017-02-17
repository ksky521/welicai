<template>
  <div>
    <div class="weui-cells__title">贷款情况</div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label" id="fi1">贷款金额</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="fi1" v-model="total" type="number" placeholder="请输入贷款金额">
        </div>
        <div class="weui-cell__ft">
          <span class="weui-vcode-btn percent">万元</span>
        </div>
      </div>
      <div class="weui-cell  weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd"><label for="fs2" class="weui-label">还款方式</label></div>
        <div class="weui-cell__bd">
          <select id="fs2" class="weui-select" v-model="type">
            <option value="1">等额本息</option>
            <option value="2">等额本金</option>
          </select>
        </div>
      </div>
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd"><label class="weui-label weui-label-lg">贷款利率</label></div>
        <div class="weui-cell__bd">
          <input v-model="rate" class="weui-input" type="number" placeholder="请输入年利率" pattern="[0-9\.]*">
        </div>
        <div class="weui-cell__ft">
          <span class="weui-vcode-btn percent">%</span>
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd"><label for="fs2" class="weui-label">贷款期数</label></div>
        <div class="weui-cell__bd">
          <select class="weui-select" v-model="period">
            <option v-for="n in 30" :value="n * 12">{{n}}年 - {{n*12}}期</option>
          </select>
        </div>
      </div>

    </div>
    <div class="weui-cells__title">提前还款信息</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label for="" class="weui-label">首次还款月</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="smonth" type="month" value="">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label for="" class="weui-label">提前还款月</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="fmonth" type="month" value="">
        </div>
      </div>
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label" id="fi4">还款金额</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="fi4" v-model="money" type="number" placeholder="请输入还款金额">
        </div>
        <div class="weui-cell__ft">
          <span class="weui-vcode-btn percent">万元</span>
        </div>
      </div>
    </div>

    <div class="weui-btn-area"><a @click="doit" class="weui-btn weui-btn_primary">计算</a></div>
  </div>
</template>
<script>
  import weui from 'weui'
  import excel from 'excel'
  export default {
    data () {
      return {
        appData: {
          title: '房贷提前还款方式选择',
          description: '提前还款50万，是选择缩短贷款年限，还是减少每月还款额度呢？'
        },
        total: '300',
        money: '50',
        smonth: '2016-01',
        fmonth: '2017-08',
        type: '1',
        rate: '4.9',
        period: '240'
      }
    },
    created () {
      this.$emit('sendTitleDesc', this.appData)
      document.title = this.appData.title
    },
    methods: {
      reduPeriod: function () {
      },
      reduMoney: function () {
      },
      repay: function (type, rate, period, total) {
        type = type | 0
        var dai = total
        var data = {
          // 本金
          p: [],
          // 利息
          i: [],
          // 本息和值
          s: [],
          // 剩余
          r: []
        }
        if (type === 1) {
          // 等额本息
          var pmt = parseFloat(excel.PMT(rate, period, -total).toFixed(2))
          // 已经还了多少钱：本金+利息
          for (var i = 1; i <= period; i++) {
            var temp = parseFloat(excel.IPMT(rate, i, period, -total).toFixed(2))
            // debugger
            data.i.push(temp)
            data.s.push(pmt)
            var p = parseFloat(pmt - temp).toFixed(2)
            data.p.push(p)
            dai = parseFloat((dai - p).toFixed(2))
            data.r.push(dai)
          }
        } else {
          // 等额本金
          var b = parseFloat((total / period).toFixed(2))
          for (i = 0; i < period; i++) {
            // 上取证书
            temp = parseFloat(((total - b * i) * rate).toFixed(2))
            data.i.push(temp)
            data.p.push(b)
            data.s.push(parseFloat((b + temp).toFixed(2)))
            data.r.push(parseFloat((total - b * (i + 1)).toFixed(2)))
          }
        }
        return data
      },
      doit () {
        var done = true
        var t = this;
        ['total', 'rate', 'money', 'smonth', 'fmonth'].forEach(function (id) {
          if (!t[id]) {
            done && weui.topTips('请填写正确的字段', {
              duration: 3000,
              className: 'custom-classname'
            })
            done = false
          }
        })
        var smonth = new Date(this.smonth)
        var fmonth = new Date(this.fmonth)
        var rate = parseFloat(this.rate)
        rate = rate < 1 ? rate : rate / 100
        rate = rate / 12
        var money = this.money * 10000
        var total = this.total * 10000
        var period = this.period | 0
        if (done) {
          if (+fmonth < +smonth) {
            weui.topTips('提前还款时间太早', {
              duration: 3000,
              className: 'custom-classname'
            })
            return
          }

          let years = fmonth.getYear() - smonth.getYear()
          let months = fmonth.getMonth() - smonth.getMonth()
          var doMonth = years * 12 + months + 1

          // 剩余还款计划
          var data = this.repay(this.type, rate, period, total)
          // 完成还款计划
          var exData = {}
          for (var i in data) {
            exData[i] = data[i].splice(0, doMonth)
          }
          // 剩余贷款
          var newTotal = data.r[0] - money

          console.log(newTotal)
          // 期数不变
          var newData = this.repay(this.type, rate, period - doMonth, newTotal)
          console.log(newData)
          // 月还款额度不变
          var dataS = data.s
          for (i = 0; i < period - doMonth; i++) {
            if (newTotal <= 0) {
              break
            }
            newTotal -= dataS[i]
          }
          var end = new Date(fmonth.getFullYear(), fmonth.getMonth() + i, 1)
          console.log(end)
        }
      }
    }
  }
</script>
