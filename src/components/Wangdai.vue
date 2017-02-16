<template>
  <div>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        appData: {
          title: '网贷真相',
          description: '急缺钱用，通过微粒贷、借呗等互联网产品贷款10万应急，每月还款xxx，日利息xxx，真的合算吗？'
        }
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
