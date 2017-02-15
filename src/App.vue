<template>
  <div id="app">
    <div class="page__hd" v-if="title">
      <h1 v-if="title">{{title}}</h1>
      <p v-if="description">{{description}}</p>
    </div>
    <div class="page__bd" v-bind:class="{page__bd_spacing: page_spacing}">
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
      footer: '',
      page_spacing: true
    }
  },
  watch: {
    '$route' (to, from) {
      this.page_spacing = to.name === 'Index'
    }
  },
  created () {
    this.page_spacing = this.$route.name === 'Index'
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
@import './assets/css/main.scss';
</style>
