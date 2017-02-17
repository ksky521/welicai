<template>
  <div>
    <div class="weui-cells__title">返还型保险信息填写</div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label" id="fi1">每期费用</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="fi1" v-model="fmoney" type="number" placeholder="请输入费用">
        </div>
        <div class="weui-cell__ft">
          <span class="weui-vcode-btn percent">元</span>
        </div>
      </div>

      <div class="weui-cell  weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd"><label for="fs1" class="weui-label">缴费周期</label></div>
        <div class="weui-cell__bd">
          <select id="fs1" class="weui-select" v-model="ftype">
            <option value="year">按年缴费</option>
            <option value="month">按月缴费</option>
          </select>
        </div>
      </div>

      <div class="weui-cell  weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd"><label for="s3" class="weui-label">几年后返还</label></div>
        <div class="weui-cell__bd">
          <select id="s3" class="weui-select" v-model="period">
            <option v-for="n in 50" :value="n">{{n}}年后</option>
          </select>
        </div>
      </div>

      <div class="weui-cell  weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd"><label for="fs4" class="weui-label">返还方式</label></div>
        <div class="weui-cell__bd">
          <select id="fs4" class="weui-select" v-model="backType">
            <option value="money">固定金额</option>
            <option value="rate">缴费金额的百分比</option>
          </select>
        </div>
      </div>

      <div class="weui-cell" v-if="backType==='money'">
        <div class="weui-cell__hd">
          <label class="weui-label" id="fi2">返还金额</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="fi2" v-model="backMoney" type="number" placeholder="请输入金额">
        </div>
        <div class="weui-cell__ft weui-cell__ft_rg">
          <div class="weui-radio-group">
            <label class="weui-radio-button" for="fr9">
              <input id="fr9" v-model="fmultiple" name="fmultiple" type="radio" value="10000">
              <span>万元</span>
            </label>
            <label class="weui-radio-button" for="fr7">
              <input id="fr7" v-model="fmultiple" name="fmultiple" type="radio" value="1">
              <span>元</span>
            </label>
          </div>
        </div>
      </div>
      <div class="weui-cell weui-cell_vcode" v-else>
        <div class="weui-cell__hd">
          <label class="weui-label" id="fi6">投资额度 × </label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="fi6" v-model="backRate" type="number" placeholder="请输入利率，如120">
        </div>
        <div class="weui-cell__ft">
          <span class="weui-vcode-btn percent">%</span>
        </div>
      </div>
    </div>

    <div class="weui-cells__title">同期纯消费型保险信息</div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label" id="xi1">每期费用</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="xi1" v-model="xmoney" type="number" placeholder="请输入费用">
        </div>
        <div class="weui-cell__ft">
          <span class="weui-vcode-btn percent">元</span>
        </div>
      </div>
      <div class="weui-cell  weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd"><label for="xs1" class="weui-label">缴费周期</label></div>
        <div class="weui-cell__bd">
          <select id="xs1" class="weui-select" v-model="xtype">
            <option value="year">按年缴费</option>
            <option value="month">按月缴费</option>
          </select>
        </div>
      </div>
    </div>

    <div class="weui-btn-area"><a @click="doit" class="weui-btn weui-btn_primary">计算</a></div>

    <div v-if="show" class="weui-form-preview result-bx">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">投资指引</label>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <ul>
            <li class="weui-form-preview__desc">返还型保险：<b>{{period}}</b>年内共投入<b>{{fSum}}万</b>，到期后实际收益为<b>{{fInterest}}万</b>，投资年化利率<b>{{fRate}}%</b>；</li>
            <li class="weui-form-preview__desc">纯消费型保险：<b>{{period}}</b>年内共投入<b>{{xSum}}万</b>，每缴费周期少支出<b>{{margin}}元</b>，若此部分钱拿来做投资，需达到年化利率<b>{{xRate}}%</b>，即可达到返还型保险收益。
            </li>
          </ul>
        </div>
      </div>
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
          title: '返还型保险是否合算？',
          description: '小明想买一份重疾险，选择了好多产品，看的眼花缭乱，最后在返还型和纯消费型保险当中做抉择，到底哪个更合算呢？'
        },
        fmoney: '',
        xmoney: '',
        xtype: 'year',
        ftype: 'year',
        period: '20',
        backMoney: '',
        fmultiple: '10000',
        backRate: '',
        backType: 'money',
        // 结果
        show: false,
        fRate: 0,
        xRate: 0,
        fInterest: 0,
        margin: 0,
        xSum: 0,
        fSum: 0
      }
    },
    created () {
      this.$emit('sendTitleDesc', this.appData)
      document.title = this.appData.title
    },
    methods: {
      doit () {
        var arr = ['fmoney', 'xmoney']
        var t = this
        var backType = t.backType
        arr.push(backType === 'money' ? 'backMoney' : 'backRate')
        var done = true
        arr.forEach(function (id) {
          if (!t[id]) {
            done && weui.topTips('请填写正确的字段', {
              duration: 3000,
              className: 'custom-classname'
            })
            done = false
          }
        })

        if (done) {
          var fmoney = this.fmoney | 0
          var xmoney = this.xmoney | 0
          var ftype = this.ftype
          var xtype = this.xtype
          var fm = 1
          var xm = 1
          var yStep = 0
          var mStep = 0
          if (ftype === 'month') {
            fm = 12
            mStep = 1
          } else {
            yStep = 1
          }
          if (xtype === 'month') {
            xm = 12
          }
          var fPeriod = this.period * fm
          var fSum = fmoney * fPeriod
          var backMoney = this.backMoney
          if (backType === 'money') {
            backMoney = backMoney * this.fmultiple
          } else {
            backMoney = fSum * this.backRate / 100
          }
          // 以返还为缴费周期为基准，计算每个缴费周期差额
          var margin = fmoney - xm / fm * xmoney

          var dates = [new Date(2000, 0, 1)]
          var moneys = [-backMoney]
          var moneyx = [-backMoney]
          for (var i = 1; i <= fPeriod; i++) {
            dates.push(new Date(2000 + yStep * i, 0 + mStep * i, 1))
            moneys.push(fmoney)
            moneyx.push(margin)
          }
          var rate = excel.XIRR(moneys, dates, 0.1)
          rate = -Math.floor((rate * 10000).toFixed(2)) / 100

          var rate2 = excel.XIRR(moneyx, dates, 0.1)
          rate2 = -Math.floor((rate2 * 10000).toFixed(2)) / 100

          // 最后纯消费型保险投入
          this.xSum = xmoney * xm * this.period / 10000
          this.fSum = fSum / 10000
          this.margin = margin
          this.fRate = rate
          this.xRate = rate2
          this.fInterest = backMoney - fSum
          this.show = true
        }
      }
    }
  }
</script>
<style lang="scss" >
  .weui-form-preview.result-bx{
    li{
      text-align: left;
      list-style-position: inside;
      list-style-type: decimal;
    }
    .weui-form-preview__desc{
      text-align: left;
      b{
        color: #F43530;
      }
    }
  }
</style>
