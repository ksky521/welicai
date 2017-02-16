<template>
<div>
  <div class="weui-cells__title">金额</div>
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
  <div class="weui-cells__title">年化利率</div>
  <div class="weui-cells">
    <div class="weui-cell weui-cell_vcode">
      <div class="weui-cell__bd">
        <input v-model="rate" class="weui-input" type="number" placeholder="请输入年化利率" pattern="[0-9\.]*">
      </div>
      <div class="weui-cell__ft">
        <span class="weui-vcode-btn percent">%</span>
      </div>
    </div>
  </div>

  <div class="weui-cells__title">投资期限</div>
  <div class="weui-cells">
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <input v-model="period" class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入投资期限">
      </div>
      <div class="weui-cell__ft weui-cell__ft_rg">
        <div class="weui-radio-group">
          <label class="weui-radio-button" for="r1">
            <input id="r1" v-model="periodType" name="period" type="radio" value="365">
            <span>天</span>
          </label>
          <label class="weui-radio-button" for="r2">
            <input id="r2" v-model="periodType" name="period" type="radio" value="12">
            <span>月</span>
          </label>
          <label class="weui-radio-button" for="r3">
            <input id="r3" v-model="periodType" name="period" type="radio" value="1">
            <span>年</span>
          </label>
        </div>
      </div>
    </div>
  </div>
  <div class="weui-btn-area"> <a @click="doit" class="weui-btn weui-btn_primary">计算</a> </div>

  <div v-show="result" class="weui-form-preview result1-form">
    <div class="weui-form-preview__hd">
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">最终收益</label>
        <em class="weui-form-preview__value">￥{{result}}</em>
      </div>
    </div>
    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">日收益</label>
        <span class="weui-form-preview__value">{{dayInterest}}</span>
      </div>
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">到期本息</label>
        <span class="weui-form-preview__value">{{total}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import weui from 'weui'
export default {
  data () {
    return {
      appData: {
        title: '理财产品收益计算',
        description: '小明投入1万购买某互联网季度理财产品，年化利率8%，期限91天，到期后收益多少？'
      },
      money: '',
      rate: '',
      period: '',
      multiple: 1,
      periodType: '365',
      result: 0,
      total: 0,
      dayInterest: 0
    }
  },
  created () {
    this.$emit('sendTitleDesc', this.appData)
    document.title = this.appData.title
  },
  methods: {
    doit () {
      var t = this
      var done = true;
      ['money', 'rate', 'period'].forEach(function (id) {
        if (!t[id]) {
          done && weui.topTips('请填写正确的字段', {
            duration: 3000,
            className: 'custom-classname'
          })
          done = false
        }
      })
      if (done) {
        var money = t.money * t.multiple
        var rate = t.rate / t.periodType / 100
        var period = t.period
        var fm = t.periodType

        var result = this.result = parseFloat((money * rate * period).toFixed(2))
        this.total = parseInt(money) + result
        var days = period
        switch (fm) {
          case '1':
          // 年
            days = period * 365
            break
          case '12':
            days = period * 30
            break
        }
        this.dayInterest = (result / days).toFixed(2)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.weui-cell_select span.percent{
  padding: 0 0 0 15px;
}
.result1-form{
  margin-top:1.17647059em;
}
</style>
