<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getUser">getUser</button>
    <button @click="insCoveragesList">insCoveragesList</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class About extends Vue {
  private getUser () {
    this.$store.dispatch('getUser', { 'user': 'zhangsan' })
  }

  private insCoveragesList () {
    this.$store.dispatch('insCoveragesList', { status: 0 }).then(data => {
      console.log(data)
    })
  }
}
</script>
