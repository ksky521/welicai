<template>
  <ul>
    <li>
      <div class="weui-flex js_category">
        <p class="weui-flex__item">工具</p>
      </div>
      <div class="page__category js_categoryInner" data-height="220">
        <div class="weui-cells page__category-content">
          <router-link to="fuli" class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
                <p>计算器</p>
            </div>
            <div class="weui-cell__ft"></div>
          </router-link>
          <a class="weui-cell weui-cell_access js_item" data-id="slider" href="javascript:;">
            <div class="weui-cell__bd">
                <p>Slider</p>
            </div>
            <div class="weui-cell__ft"></div>
          </a>
          <a class="weui-cell weui-cell_access js_item" data-id="uploader" href="javascript:;">
            <div class="weui-cell__bd">
                <p>Uploader</p>
            </div>
            <div class="weui-cell__ft"></div>
          </a>
        </div>
      </div>
    </li>
    <li></li>
  </ul>
</template>

<script>
import $ from 'zepto'
export default {
  name: 'index',
  data () {
    return {
      appData: {
        title: '首页',
        description: '首页描述'
      }
    }
  },
  created () {
    this.$emit('sendTitleDesc', this.appData)
  },
  mounted () {
    var winH = $(window).height()
    var categorySpace = 10

    $('.js_category').on('click', function () {
      var $this = $(this)
      var $inner = $this.next('.js_categoryInner')
      var $page = $this.parents('#app')
      var $parent = $(this).parent('li')
      var innerH = $inner.data('height')

      if (!innerH) {
        $inner.css('height', 'auto')
        innerH = $inner.height()
        $inner.removeAttr('style')
        $inner.data('height', innerH)
      }

      if ($parent.hasClass('js_show')) {
        $parent.removeClass('js_show')
      } else {
        $parent.siblings().removeClass('js_show')

        $parent.addClass('js_show')
        if (this.offsetTop + this.offsetHeight + innerH > $page.scrollTop() + winH) {
          var scrollTop = this.offsetTop + this.offsetHeight + innerH - winH + categorySpace

          if (scrollTop > this.offsetTop) {
            scrollTop = this.offsetTop - categorySpace
          }

          $page.scrollTop(scrollTop)
        }
      }
    })
  }
}
</script>
<style lang="scss">
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
    //&:active{
    //    background-color: #ECECEC;
    //}
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
