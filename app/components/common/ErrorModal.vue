<template>
  <ModalStack class="modal-container">
    <GridLayout class="modal modal-error" columns="*" rows="*">
      <Label class="fas fab far" :text="msg" textWrap="true" col="0" row="0"/>
    </GridLayout>
  </ModalStack>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({})
  export default class SignUpError extends Vue {
    @Prop(String) readonly msg!: string;
  }
</script>

<style scoped>

</style>
