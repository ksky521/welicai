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
          <input class="weui-input" id="i1" v-model="rate" type="number" placeholder="请输入手机号">
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
          <label class="weui-label">每年涨幅</label>
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
          <input id="i3" v-model="fz" class="weui-input weui-input_disabled" type="number" pattern="[0-9\.]*" placeholder="请输入每年房租收入">
        </div>
      </div>
      <div class="weui-cell  weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd"><label for="s3" class="weui-label">几年后卖出</label></div>
        <div class="weui-cell__bd">
          <select id="s3" class="weui-select" v-model="iperiod">
            <option v-for="n in 10" :value="n">{{n}}年</option>
          </select>
        </div>
      </div>
    </div>
    <div class="weui-btn-area"> <a @click="doit"class="weui-btn weui-btn_primary">计算</a> </div>

    <div v-show="result" class="weui-form-preview result1-form">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">投资临界值</label>
          <em class="weui-form-preview__value">{{result}}%</em>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">房贷利息总和</label>
          <span class="weui-form-preview__value">{{rtotal}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        appData: {
          title: '买房 or 投资',
          description: '手头有100万，是选择贷款买套房子呢？还是选择个利息高的投资渠道呢？'
        },
        total: '',
        femultiple: '1',
        rate: '4.9',
        fee: '',
        fmultiple: '10000',
        sf: '',
        smultiple: '10000',
        dktype: 'sy',
        period: '240',
        type: '1',
        yrate: '10',
        fz: '0',
        iperiod: '5',
        // 结果
        result: '',
        rtotal: ''
      }
    },
    created () {
      this.$emit('sendTitleDesc', this.appData)
      document.title = this.appData.title
    },
    methods: {
      doit () {

      }
    }
  }
</script>
