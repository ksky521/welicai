<template>
  <ul>
    <li v-bind:class="{js_show:showfl}">
      <div class="weui-flex" @click="showfl =! showfl">
        <p class="weui-flex__item">理财计算器</p>
      </div>
        <div class="page__category">
          <div class="weui-cells page__category-content">
            <router-link to="/licai" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd">
                  <p>理财产品收益计算</p>
              </div>
              <div class="weui-cell__ft"></div>
            </router-link>
            <router-link to="/fuli/shouyi" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd">
                  <p>复利投资收益计算</p>
              </div>
              <div class="weui-cell__ft"></div>
            </router-link>
            <router-link to="/fuli/dingtou" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd">
                  <p>定期定额投资收益</p>
              </div>
              <div class="weui-cell__ft"></div>
            </router-link>
            <router-link to="/fuli/ni" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd">
                  <p>复利逆计算</p>
              </div>
              <div class="weui-cell__ft"></div>
            </router-link>
          </div>
        </div>
    </li>
    <li v-bind:class="{js_show:showfang}">
      <div class="weui-flex" @click="showfang =! showfang">
        <p class="weui-flex__item">买房 vs 投资</p>
      </div>
        <div class="page__category">
          <div class="weui-cells page__category-content">
            <router-link to="/fang/dai" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd">
                  <p>房贷计算器</p>
              </div>
              <div class="weui-cell__ft"></div>
            </router-link>
            <router-link to="/fang/touzi" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd">
                  <p>买房 vs 其他投资</p>
              </div>
              <div class="weui-cell__ft"></div>
            </router-link>
            <router-link to="/fang/tiqian" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd">
                  <p>提前还贷</p>
              </div>
              <div class="weui-cell__ft"></div>
            </router-link>
          </div>
        </div>
      </li>
      <li v-bind:class="{js_show:showbx}">
      <div class="weui-flex" @click="showbx =! showbx">
        <p class="weui-flex__item">保险 vs 投资</p>
      </div>
        <div class="page__category">
          <div class="weui-cells page__category-content">
            <router-link to="/fang/dai" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd">
                  <p>房贷计算器</p>
              </div>
              <div class="weui-cell__ft"></div>
            </router-link>
            <router-link to="/fang/touzi" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd">
                  <p>买房 vs 其他投资</p>
              </div>
              <div class="weui-cell__ft"></div>
            </router-link>
            <router-link to="/fang/tiqian" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd">
                  <p>提前还贷</p>
              </div>
              <div class="weui-cell__ft"></div>
            </router-link>
          </div>
        </div>
      </li>
  </ul>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      showfl: false,
      showfang: false,
      showbx: false,
      appData: {
        title: '首页',
        description: '首页描述'
      }
    }
  },
  created () {
    this.$emit('sendTitleDesc', this.appData)
  }
}
</script>
<style lang="scss"scoped>
  $pageHomePadding: 20px;
  li{
    margin: 10px 0;
    background-color: #FFFFFF;
    overflow: hidden;
    border-radius: 2px;
    cursor: pointer;
    &.js_show{
      .weui-flex{
        opacity: .4;
      }
      .page__category{
        height: auto;
      }
      .page__category-content{
        opacity: 1;
        transform: translateY(0);
      }
    }
    &:first-child{
      margin-top: 0;
    }
  }
  .page__category{
    height: 0;
    overflow: hidden;
  }
  .page__category-content{
    opacity: 0;
    transform: translateY(-50%);
    transition: .3s;
  }
  .weui-flex{
    padding: $pageHomePadding;
    align-items: center;
    transition: .3s;
  }
  .weui-cells{
    margin-top: 0;
    &:before, &:after{
      display: none;
    }
  }
  .weui-cell{
    padding-left: $pageHomePadding;
    padding-right: $pageHomePadding;
    &:before{
      left: $pageHomePadding;
      right: $pageHomePadding;
    }
  }
</style>
