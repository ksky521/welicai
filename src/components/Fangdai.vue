<template>
  <div>
    <div class="weui-cells__title">贷款金额</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input v-model="total" class="weui-input weui-input_disabled" type="number" pattern="[0-9\.]*" placeholder="请输入房贷金额">
        </div>
        <div class="weui-cell__ft weui-cell__ft_rg">
          <div class="weui-radio-group">
            <label class="weui-radio-button" for="r9">
              <input id="r9" v-model="multiple" name="tmultiple" type="radio" value="10000">
              <span>万元</span>
            </label>
            <label class="weui-radio-button" for="r7">
              <input id="r7" v-model="multiple" name="tmultiple" type="radio" value="1">
              <span>元</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="weui-cells__title">贷款来源</div>
    <div class="weui-cells weui-cells_radio">
      <label class="weui-cell weui-check__label" for="r2">
        <div class="weui-cell__bd">
          <p>商业贷款</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" v-model="dktype" class="weui-check" value="sy" id="r2">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label class="weui-cell weui-check__label" for="r3">
        <div class="weui-cell__bd">
          <p>公积金贷款</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" v-model="dktype" value="gjj" id="r3">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
    </div>

    <div class="weui-cells__title">还款方式</div>
    <div class="weui-cells weui-cells_radio">
      <label class="weui-cell weui-check__label" for="r4">
        <div class="weui-cell__bd">
          <p>等额本息</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" v-model="type" class="weui-check" value="1" id="r4">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label class="weui-cell weui-check__label" for="r5">
        <div class="weui-cell__bd">
          <p>等额本金</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" v-model="type" value="2" id="r5">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
    </div>

    <div class="weui-cells__title">利率优惠</div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__bd">
          <select class="weui-select" v-model="rate">
            <option value="0.8">8折优惠</option>
            <option value="0.85">85折优惠</option>
            <option value="0.9">9折优惠</option>
            <option value="1">标准利率</option>
            <option value="1.1">上浮10%</option>
            <option value="diy">自定义</option>
          </select>
        </div>
      </div>
      <div v-if="rate==='diy'" class="weui-cell" >
        <div class="weui-cell__hd"><label class="weui-label">标准利率 &nbsp; × &nbsp;系数</label></div>
        <div class="weui-cell__bd">
            <input v-model="coe" class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入系数，如0.83">
        </div>
      </div>
    </div>

    <div class="weui-cells__title">还款期数</div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__bd">
          <select class="weui-select" v-model="period">
            <option v-for="n in 30" :value="n * 12">{{n}}年 - {{n*12}}期</option>
          </select>
        </div>
      </div>
    </div>
    <div class="weui-btn-area"> <a @click="doit"class="weui-btn weui-btn_primary">计算</a> </div>

  </div>
</template>
<script>
import weui from 'weui'
import excel from 'excel'
export default {
  data () {
    return {
      appData: {
        title: '房贷计算器'
      },
      total: '',
      multiple: '10000',
      dktype: 'sy',
      period: '240',
      type: '1',
      rate: '1',
      coe: '',
      rates: {
        gjj: 0.038,
        sd: 0.049
      },
      // 结果
      result: ''
    }
  },
  created () {
    this.$emit('sendTitleDesc', this.appData)
    document.title = this.appData.title
  },
  methods: {
    doit () {
      var done = true
      var t = this
      var arr = ['total']
      if (this.rate === 'diy') {
        arr.push('coe')
      }
      arr.forEach(function (id) {
        if (!t[id]) {
          done && weui.topTips('请填写正确的字段', {
            duration: 3000,
            className: 'custom-classname'
          })
          done = false
        }
      })
      console.log(excel.PV)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
