<template>
  <div>
    <div class="weui-cells__title">每期投入</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input v-model="money" class="weui-input" type="number" pattern="[0-9\.]*" placeholder="请输入投入金额">
        </div>
        <div class="weui-cell__ft weui-cell__ft_rg">
          <div class="weui-radio-group">
            <label class="weui-radio-button" for="r9">
              <input id="r9" v-model="multiple" name="multiple" type="radio" value="10000">
              <span>万元</span>
            </label>
            <label class="weui-radio-button" for="r7">
              <input id="r7" v-model="multiple" name="multiple" type="radio" value="1">
              <span>元</span>
            </label>
          </div>
        </div>
      </div>

    </div>
    <div class="weui-cells__title">预期年利率</div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__bd">
          <input v-model="rate" class="weui-input" type="number" placeholder="请输入年利率" pattern="[0-9\.]*">
        </div>
        <div class="weui-cell__ft">
          <span class="weui-vcode-btn percent">%</span>
        </div>
      </div>
    </div>

    <div class="weui-cells__title">周期</div>
    <div class="weui-cells weui-cells_radio">
      <label class="weui-cell weui-check__label" for="r1">
        <div class="weui-cell__bd">
          <p>按年</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" v-model="percent" value="year" id="r1">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label class="weui-cell weui-check__label" for="r2">
        <div class="weui-cell__bd">
          <p>按月</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" v-model="percent" class="weui-check" value="month" id="r2">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label class="weui-cell weui-check__label" for="r3">
        <div class="weui-cell__bd">
          <p>按天</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" v-model="percent" class="weui-check" id="r3" value="day">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <div v-if="percent==='day'" class="weui-cell" >
        <div class="weui-cell__bd">
          <input v-model="days" class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入多少天投入一笔">
        </div>
      </div>
    </div>

    <div class="weui-cells__title">定投期数</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="period" type="number" pattern="[0-9]*" placeholder="请输入期数">
        </div>
        <div class="weui-cell__ft weui-cell__ft_rg">
          <div class="weui-radio-group">
            <label class="weui-radio-button" for="r0">
              <input id="r0" v-model="ptype" name="ptype" type="radio" value="1">
              <span>期数</span>
            </label>
            <label class="weui-radio-button" for="r6">
              <input id="r6" v-model="ptype" name="ptype" type="radio" value="year">
              <span>年限</span>
            </label>
          </div>
        </div>
      </div>
    </div>


    <div class="weui-btn-area"> <a @click="doit"class="weui-btn weui-btn_primary">计算</a> </div>

    <div v-show="result" class="weui-form-preview result1-form">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">最终金额</label>
          <em class="weui-form-preview__value">¥{{result}}</em>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">总投入</label>
          <span class="weui-form-preview__value">{{total}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">利息收入</label>
          <span class="weui-form-preview__value">{{interest}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">总投入期数</label>
          <span class="weui-form-preview__value">{{rperiod}}期</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import weui from 'weui'
  // import formula from 'formula'
  import excel from 'excel'
  export default {
    data () {
      return {
        appData: {
          title: '定期定额投资收益',
          description: ''
        },
        money: '',
        percent: 'year',
        multiple: '1',
        rate: '',
        interest: 0,
        period: '',
        total: 0,
        days: '',
        result: 0,
        ptype: '1',
        rperiod: 0
      }
    },
    created () {
      this.$emit('sendTitleDesc', this.appData)
      document.title = this.appData.title
    },
    methods: {

      doit () {
        var done = true
        var t = this;
        ['money', 'period', 'rate'].forEach(function (id) {
          if (!t[id]) {
            done && weui.topTips('请填写正确的字段', {
              duration: 3000,
              className: 'custom-classname'
            })
            done = false
          }
        })
        if (done && t.percent === 'day') {
          if (!t.days) {
            weui.topTips('请填写正确的字段', {
              duration: 3000,
              className: 'custom-classname'
            })
            done = false
          }
        }
        // console.log(formula.FV(0.05/12, 1*12, 300, 1).toFixed(2))
        if (done) {
          var money = t.money * t.multiple
          var rate = t.rate / 100
          var period = t.period
          var percent = t.percent
          var fm = 1

          switch (percent) {
            case 'year':
              break
            case 'month':
              fm = 12
              break
            case 'day':
              fm = 365 / t.days
              break
          }

          var ptype = t.ptype

          if (ptype === 'year') {
            period = fm * period
          }
          t.rperiod = period

          this.total = money * period

          var sum = this.result = -excel.FV(rate / fm, period, money, 1).toFixed(2)
          // console.log()
          this.interest = (sum - this.total).toFixed(2)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
