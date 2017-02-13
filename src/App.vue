<template>
  <div id="app">
    <div class="page__hd" v-if="title">
      <h1 v-if="title">{{title}}</h1>
      <p v-if="description">{{description}}</p>
    </div>
    <div class="page__bd_spacing page__bd">
      <router-view v-on:sendTitleDesc="setTitleDesc"></router-view>
    </div>
    <div class="page__ft" v-if="footer">{{footer}}</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: '',
      description: '',
      footer: ''
    }
  },
  methods: {
    setTitleDesc (d) {
      this.title = d.title || ''
      this.description = d.description || ''
      this.footer = d.footer || ''
    }
  }
}
</script>
<style lang="scss">
  ul{
    list-style: none;
  }
  html, body{
    height: 100%;
    -webkit-tap-highlight-color: transparent;
  }
  body{
    background-color: #F8F8F8;
    font-family: -apple-system-font, "Helvetica Neue", Helvetica, sans-serif;
  }
  .page__hd {
    padding: 20px;

    h1 {
      text-align: left;
      font-size: 20px;
      font-weight: 400;
    }
    p {
      margin-top: 5px;
      color: #888;
      text-align: left;
      font-size: 14px;
    }

  }
  .page__bd {
    &_spacing{
      padding: 0 15px;
    }
  }

  .page__ft{
    padding-top: 40px;
    padding-bottom: 10px;
    text-align: center;
    &.j_bottom{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
  }
</style>
