<template>
  <div>
    <div class="weui-cells__title">房子总价格</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input v-model="total" class="weui-input weui-input_disabled" type="number" pattern="[0-9\.]*" placeholder="请输入房子的价值">
        </div>
        <div class="weui-cell__ft weui-cell__ft_rg">
          <div class="weui-radio-group">
            <label class="weui-radio-button" for="r1">
              <input id="r1" v-model="fmultiple" name="fmultiple" type="radio" value="10000">
              <span>万元</span>
            </label>
            <label class="weui-radio-button" for="r2">
              <input id="r2" v-model="fmultiple" name="fmultiple" type="radio" value="1">
              <span>元</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">房屋交易情况</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label for="" class="weui-label">首付金额</label></div>
        <div class="weui-cell__bd">
          <input v-model="sf" class="weui-input weui-input_disabled" type="number" pattern="[0-9\.]*" placeholder="请输入">
        </div>
        <div class="weui-cell__ft weui-cell__ft_rg">
          <div class="weui-radio-group">
            <label class="weui-radio-button" for="r3">
              <input id="r3" v-model="smultiple" name="smultiple" type="radio" value="10000">
              <span>万元</span>
            </label>
            <label class="weui-radio-button" for="r4">
              <input id="r4" v-model="smultiple" name="smultiple" type="radio" value="1">
              <span>元</span>
            </label>
          </div>
        </div>
      </div>

      <div class="weui-cell  weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd"><label for="s1" class="weui-label">贷款年限</label></div>
        <div class="weui-cell__bd">
          <select class="weui-select" v-model="period" id="s1">
            <option v-for="n in 30" :value="n * 12">{{n}}年 - {{n*12}}期</option>
          </select>
        </div>
      </div>
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label" id="i1">贷款利率</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="i1" v-model="rate" type="number" placeholder="请输入贷款利率">
        </div>
        <div class="weui-cell__ft">
          <span class="weui-vcode-btn percent">%</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label for="i2" class="weui-label">交易税费</label></div>
        <div class="weui-cell__bd">
          <input v-model="fee" id="i2" class="weui-input weui-input_disabled" type="number" pattern="[0-9\.]*" placeholder="请输入">
        </div>
        <div class="weui-cell__ft weui-cell__ft_rg">
          <div class="weui-radio-group">
            <label class="weui-radio-button" for="r9">
              <input id="r9" v-model="femultiple" name="femultiple" type="radio" value="10000">
              <span>万元</span>
            </label>
            <label class="weui-radio-button" for="r7">
              <input id="r7" v-model="femultiple" name="femultiple" type="radio" value="1">
              <span>元</span>
            </label>
          </div>
        </div>
      </div>

      <div class="weui-cell  weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd"><label for="" class="weui-label">还款方式</label></div>
        <div class="weui-cell__bd">
          <select class="weui-select" v-model="type">
            <option value="1">等额本息</option>
            <option value="2">等额本金</option>
          </select>
        </div>
      </div>
    </div>


    <div class="weui-cells__title">房屋增值预估情况</div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label">预估涨幅</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="yrate" type="number" placeholder="请输入预估涨幅">
        </div>
        <div class="weui-cell__ft">
          <span class="weui-vcode-btn percent">%</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label for="i3" class="weui-label">房租收入</label></div>
        <div class="weui-cell__bd">
          <input id="i3" v-model="fz" class="weui-input weui-input_disabled" type="number" pattern="[0-9\.]*" placeholder="请输入期间房租收入">
        </div>
      </div>
      <div class="weui-cell  weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd"><label for="s3" class="weui-label">几年后卖出</label></div>
        <div class="weui-cell__bd">
          <select id="s3" class="weui-select" v-model="iperiod">
            <option v-for="n in 10" :value="n * 12">{{n}}年</option>
          </select>
        </div>
      </div>
    </div>
    <div class="weui-btn-area"> <a @click="doit"class="weui-btn weui-btn_primary">计算</a> </div>

    <div v-show="result">
      <div class="weui-form-preview">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">投资临界值</label>
            <em class="weui-form-preview__value">{{result}}%</em>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">房贷利息总和</label>
            <span class="weui-form-preview__value">{{interest}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">预估收益</label>
            <span class="weui-form-preview__value">{{earnings}}</span>
          </div>
        </div>
      </div>
      <br>
      <div class="weui-form-preview">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">投资指引</label>
          </div>
        </div>
        <div class="weui-form-preview__bd">

          <div class="weui-form-preview__item">
            <p class="weui-form-preview__desc indent">在持有房子「<b>{{iperiod/12}}年</b>」，预估房价在此时间内会上涨「<b>{{yrate}}%</b>」情况下：</p>
            <ul>
              <li>若其他渠道投资的年收益率 &gt; <b>{{result}}%</b>，则自己投资理财收益更高</li>
              <li>若其他渠道投资的年收益率 &lt; <b>{{result}}%</b>，则买房收益更高</li>
            </ul>
          </div>
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
          title: '买房 or 投资',
          description: '手头有100万，是选择贷款买套房子呢？还是选择个利息高的投资渠道呢？选择投资那么多少利率合适呢？'
        },
        total: '',
        femultiple: '10000',
        rate: '4.9', // 标准利率
        fee: '',
        fmultiple: '10000',
        sf: '',
        smultiple: '10000',
        dktype: 'sy',
        period: '240',
        type: '1',
        yrate: '10',
        fz: '',
        iperiod: '60',
        // 结果
        result: '',
        interest: '',
        earnings: ''
      }
    },
    created () {
      this.$emit('sendTitleDesc', this.appData)
      document.title = this.appData.title
    },
    methods: {
      doit () {
        // todo
        // 1. 首付===房价，全款
        //
        var done = true
        var t = this;
        ['total', 'rate', 'sf'].forEach(function (id) {
          if (!t[id]) {
            done && weui.topTips('请填写正确的字段', {
              duration: 3000,
              className: 'custom-classname'
            })
            done = false
          }
        })
        var fz = this.fz | 0
        var interest = 0
        var total = this.total * this.fmultiple
        var sf = this.sf * this.smultiple
        var dai = total - sf
        var fee = this.fee * this.femultiple
        var rate = this.rate / 12 / 100
        var period = this.period | 0
        var iperiod = this.iperiod | 0
        var temp = 0
        var i = 1
        if (dai !== 0) {
          if (this.type === '1') {
            // 等额本息
            for (i = 1; i <= iperiod; i++) {
              temp = parseFloat(excel.IPMT(rate, i, period, -dai).toFixed(2))
              interest += temp
            }
            interest = interest.toFixed(2)
          } else {
            // 等额本金
            // 每期本金
            var b = dai / period
            for (i = 0; i < iperiod; i++) {
              // 上取证书
              temp = -Math.floor(-(dai - b * i) * rate)
              interest += temp
            }
            interest = interest.toFixed(2)
          }
        } else {
          // 土豪全款买房，没有加杠杆
        }

        interest = parseFloat(interest)
        // 到期后的 房屋增值+房租收入 - 利息支出
        var earnings = parseFloat((total * this.yrate / 100 + fz - interest).toFixed(2))
        // 收益 = 总价 + 房屋增值+房租收入 - 利息支出 - 税费 - 首付
        this.earnings = earnings
        // 投入
        var cost = (sf + fee)
        if (iperiod === 12) {
          // 一年直接算
          this.result = (earnings / cost * 100).toFixed(2)
        } else {
          // 复利计算
          var moneys = [-cost, cost + earnings]
          var dates = [new Date(2000, 0, 1), new Date(2000 + iperiod / 12, 1, 1)]
          this.result = (excel.XIRR(moneys, dates) * 100).toFixed(2)
        }

        this.interest = interest
      }
    }
  }
</script>
<style lang="scss" scoped>
.weui-form-preview__item{
  li{
      text-align: left;
      list-style-position: inside;
      list-style-type: decimal;
    }
  .weui-form-preview__desc{
    text-align: left;
    b{
      color: #F43530
    }

  }
}
</style>
