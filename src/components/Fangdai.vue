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
        <div class="weui-cell__hd"><label class="weui-label weui-label-lg">标准利率 &nbsp; × &nbsp;系数</label></div>
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
    <div class="result">
      总利息：{{interest}}
      <span v-show="type=='1'">每月还款额度：{{resultS[0]}}</span>
      <span v-show="type=='2'">每月还本金：{{resultP[0]}}</span>
      <table>
        <tr>
          <th>期数</th>
          <th v-show="type=='2'">合计</th>
          <th v-show="type=='1'">本金</th>
          <th>利息</th>
          <th>剩余贷款</th>
        </tr>
        <tr v-for="(item, index) in resultP ">
          <td>{{index+1}}</td>
          <td v-show="type=='2'">{{resultS[index]}}</td>
          <td v-show="type=='1'">{{resultP[index]}}</td>
          <td>{{resultI[index]}}</td>
          <td>{{resultR[index]}}</td>
        </tr>
      </table>
    </div>
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
        gjj: 0.0325,
        sy: 0.049
      },
      // 结果
      resultP: [],
      resultS: [],
      resultR: [],
      resultI: [],
      interest: 0,
      show: false
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
      var rate = this.rate
      if (rate === 'diy') {
        arr.push('coe')
        rate = this.coe
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

      var total = this.total * this.multiple
      var baseRate = this.rates[this.dktype]
      // 贷款类型
      var type = this.type | 0
      // 实际利率
      rate = baseRate * parseFloat(rate) / 12
      // 还款期数
      var period = this.period | 0
      // 总利息
      var interest = 0
      var i = 0
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
      var temp
      var dai = total

      if (type === 1) {
        // 等额本息
        var pmt = parseFloat(excel.PMT(rate, period, -total).toFixed(2))
        for (i = 1; i <= period; i++) {
          temp = parseFloat(excel.IPMT(rate, i, period, -total).toFixed(2))
          // debugger
          data.i.push(temp)
          data.s.push(pmt)
          var p = parseFloat(pmt - temp).toFixed(2)
          data.p.push(p)
          dai = parseFloat(dai - p).toFixed(2)
          data.r.push(dai)
          interest += temp
        }
        interest = interest.toFixed(2)
      } else {
        // 等额本金
        // 每期本金
        var b = parseFloat(total / period).toFixed(2)
        for (i = 0; i < period; i++) {
          // 上取证书
          temp = -Math.floor(-(total - b * i) * rate)
          interest += temp
          data.i.push(temp)
          data.p.push(b)
          data.s.push(b + temp).toFixed(2)
          data.r.push(total - b * (i + 1).toFixed(2))
        }
        interest = interest.toFixed(2)
      }
      this.resultR = data.r
      this.resultS = data.s
      this.resultP = data.p
      this.resultI = data.i
      this.show = true
      this.interest = interest
    }
  }
}
</script>
<style lang="scss" scoped>
.weui-label-lg{
  width: 145px;
}
table{
  text-align: right;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  tr:nth-child(even){
    background-color: gray
  }
}

</style>
