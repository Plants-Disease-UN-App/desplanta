<template>
  <GridLayout class="menu" columns="*,*,*" rows="*">
    <Button class="fas btn btn-circle" :class="{'btn-active': cropsActive}"
            @tap="navigate('crops')"
            :text="String.fromCharCode(0xf4d8)" col="0" row="0"/>
    <Button class="fas btn btn-circle" :class="{'btn-active': cameraActive}"
            @tap="navigate('camera')"
            :text="String.fromCharCode(0xf030)" col="1" row="0"/>
    <Button class="fas btn btn-circle" :class="{'btn-active': profileActive}"
            @tap="navigate('dashboard')"
            :text="String.fromCharCode(0xf2bd)" col="2" row="0"/>
  </GridLayout>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({})
  export default class Menu extends Vue {
    @Prop({default: false}) readonly cropsActive!: boolean;
    @Prop({default: false}) readonly cameraActive!: boolean;
    @Prop({default: false}) readonly profileActive!: boolean;

    navigate(page: string) {
      this.$goto(page);
    }
  }
</script>

<style scoped>

</style>
