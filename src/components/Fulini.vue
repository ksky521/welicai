<template>
  <div>
    <div class="weui-cells__title">理财目标金额</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input v-model="total" class="weui-input weui-input_disabled" type="number" pattern="[0-9\.]*" placeholder="请输入理财目标金额">
        </div>
        <div class="weui-cell__ft weui-cell__ft_rg">
          <div class="weui-radio-group">
            <label class="weui-radio-button" for="r9">
              <input id="r9" v-model="tmultiple" name="tmultiple" type="radio" value="10000">
              <span>万元</span>
            </label>
            <label class="weui-radio-button" for="r7">
              <input id="r7" v-model="tmultiple" name="tmultiple" type="radio" value="1">
              <span>元</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">投资周期</div>
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
    </div>
    <div class="weui-cells__title">计算类型</div>
    <div class="weui-cells weui-cells_radio">
      <label class="weui-cell weui-check__label" for="r4">
        <div class="weui-cell__bd">
          <p>计算每期投资金额</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" v-model="type" class="weui-check" value="money" id="r4">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label class="weui-cell weui-check__label" for="r5">
        <div class="weui-cell__bd">
          <p>计算年收益率</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" v-model="type" value="rate" id="r5">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
    </div>
    <div v-if="type==='money'">
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
    </div>
    <div v-else>
      <div class="weui-cells__title">每期投入</div>
      <div class="weui-cells">
        <div class="weui-cell weui-cell_select weui-cell_select-after">
          <div class="weui-cell__bd">
            <input v-model="money" class="weui-input weui-input_disabled" type="number" pattern="[0-9\.]*" placeholder="请输入投入金额">
          </div>
          <div class="weui-cell__hd">
            <select v-model="multiple" class="weui-select">
              <option value="1">元</option>
              <option value="1000">千元</option>
            </select>
          </div>
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
    <div v-show="result || rrate" class="weui-form-preview result1-form">
      <div class="weui-form-preview__hd">
        <div v-if="type==='money'" class="weui-form-preview__item">
          <label class="weui-form-preview__label">每期投入金额</label>
          <em class="weui-form-preview__value">¥{{result}}</em>
        </div>
        <div v-else class="weui-form-preview__item">
          <label class="weui-form-preview__label">年收益率</label>
          <em class="weui-form-preview__value">{{rrate}}%</em>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">总投入</label>
          <span class="weui-form-preview__value">{{rtotal}}</span>
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
  import excel from 'excel'
  export default {
    data () {
      return {
        appData: {
          title: '收益投资预算',
          description: '使用举例：小明今年20岁，需60岁准备一笔50万的养老金，每月可拿出300块，则选择什么年利率的投资产品'
        },
        tmultiple: '10000',
        type: 'money',
        rate: '',
        ptype: 'year',
        multiple: '1',
        money: '',
        period: '',
        total: '',
        percent: 'month',
        // 结果
        result: '',
        rtotal: '',
        rperiod: '',
        interest: '',
        rrate: 0
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
        ['total', 'period', t.type === 'rate' ? 'money' : 'rate'].forEach(function (id) {
          if (!t[id]) {
            done && weui.topTips('请填写正确的字段', {
              duration: 3000,
              className: 'custom-classname'
            })
            done = false
          }
        })

        if (done) {
          var targetMoney = t.total * t.tmultiple
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
          }
          var ptype = t.ptype

          if (ptype === 'year') {
            period = fm * period
          }
          t.rperiod = period

          if (t.type === 'rate') {
            // 计算收益率
            var rrate = 0
            var arr = [-targetMoney]
            var dates = [new Date(2000, 0, 1)]
            var money = t.money
            var rtotal = 0

            switch (percent) {
              case 'year':

                for (var i = 0; i < period; i++) {
                  dates.push(new Date(2000 + i, 0, 1))
                  arr.push(money)
                }
                rrate = excel.XIRR(arr, dates, 0.1)
                break
              case 'month':
                for (i = 1; i <= period; i++) {
                  // console.log(now.add(i, 'months'))
                  dates.push(new Date(2000, i, 1))
                  arr.push(money)
                }
                rrate = excel.XIRR(arr, dates, 0.1)
                break
            }
            // 利率上取
            this.rrate = -Math.floor((rrate * 10000).toFixed(2)) / 100
            rtotal = this.rtotal = (money * period).toFixed(2)
            this.interest = (targetMoney - rtotal).toFixed(2)
          } else {
            // 计算投入金额, 上取
            var result = this.result = -Math.floor(excel.PMT(rate / fm, period, 0, targetMoney))
            rtotal = this.rtotal = (result * period).toFixed(2)
            this.interest = (targetMoney - rtotal).toFixed(2)
          }
        }
      }
    }
  }
</script>
<style lang="scss">


</style>
