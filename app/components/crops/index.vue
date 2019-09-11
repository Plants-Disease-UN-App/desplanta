<template>
  <Page actionBarHidden="true">
    <GridLayout class="app" columns="*" rows="auto, *, auto">
      <Label class="fas title" textWrap="true" :text="`${String.fromCharCode(0xf4d8)} Mis Cultivos`"
             col="0" row="0"/>
      <FlexboxLayout class="form" flexDirection="column" col="0" row="1" verticalAlignment="middle">
      </FlexboxLayout>
      <Menu col="0" row="2" :cropsActive="true"></Menu>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Menu from "@/components/common/Menu.vue";

  @Component({
    components: {
      Menu,
    },
  })
  export default class Crops extends Vue {
  }
</script>

<style scoped>

</style>
