<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getUser">getUser</button>
    <button @click="insCoveragesList">insCoveragesList</button>
    <button @click="insSuppliersList">insSuppliersList</button>
    <div v-for="(item,index) in list.Data" :key="index">{{item.supplierName}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({})
export default class About extends Vue {
  @Getter('INSSUPPLIERS_LIST') list:any

  private getUser () {
    this.$store.dispatch('getUser', { 'user': 'zhangsan' })
  }

  private insCoveragesList () {
    this.$store.dispatch('insCoveragesList', { status: 0 }).then(data => {
      console.log(data)
    })
  }

  private insSuppliersList () {
    this.$store.dispatch('insSuppliersList', { status: 0 }).then(data => {
      console.log(data)
    })
  }
}
</script>
