<template>
  <Page actionBarHidden="true">
    <GridLayout class="app" columns="*" rows="auto, *, auto">
      <Label class="fas title" textWrap="true" :text="`${String.fromCharCode(0xf2bd)} Mi Cuenta`"
             col="0" row="0"/>
      <FlexboxLayout class="form" flexDirection="column" col="0" row="1" verticalAlignment="middle">
        <TextField v-model="displayName" autocapitalizationType="words"
                   hint="Ej: Alexander Von Humboldt" flexGrow="1"/>
        <Button :class="classes" :text="saveButtonText" @tap="save"
                flexGrow="1"/>
      </FlexboxLayout>
      <Menu col="0" row="2" :profileActive="true"></Menu>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import {Component, Watch, Vue} from 'vue-property-decorator';
  import {mapState} from 'vuex';
  import * as constants from '@/store/constants';
  import Menu from '@/components/common/Menu'

  @Component({
    computed: {
      ...mapState({
        name: state => state['Session'].displayName,
        profileUpdated: state => state['Session'].profileUpdated,
      })
    },
    components: {
      Menu,
    }
  })
  export default class Dashboard extends Vue {
    name: string;
    profileUpdated: boolean;
    displayName: string = null;

    save() {
      this.$store.dispatch(constants.SESSION_SAVE_ACCOUNT_INFO, {
        displayName: this.displayName,
        photoURL: null
      });
    }

    get classes() {
      const classes = ['fas', 'btn', 'btn-normal'];
      if (this.profileUpdated)
        classes.push('btn-updated');
      return classes;
    }

    get saveButtonText() {
      if (this.profileUpdated)
        return `${String.fromCharCode(0xf560)}  Guardado`;
      return `${String.fromCharCode(0xf0c7)}  Guardar`;
    }

    @Watch('profileUpdated')
    onProfileUpdated() {
      setTimeout(() => {
        this.$store.commit(constants.SESSION_SET_PROPERTY, {
          property: 'profileUpdated',
          value: false,
        })
      }, 2000);
    }

    mounted() {
      this.displayName = this.name;
    }
  }

</script>
