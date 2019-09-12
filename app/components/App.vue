<template>
  <Page actionBarHidden="true">
    <GridLayout columns="*" rows="auto,*,auto" class="app">
      <Label class="fab title" textWrap="true" :text="`${String.fromCharCode(0xf18c)} DesPlanta`" col="0" row="0"/>
      <FlexboxLayout class="form" flexDirection="column" col="0" row="1" verticalAlignment="middle">
        <Label text="Inicio de sesión" flexGrow="1"/>
        <TextField v-model="email" hint="ex@mp.le" keyboardType="email"/>
        <TextField v-model="password" secure="true" hint="Contraseña"/>
        <Button class="fas btn btn-normal" :text="`${String.fromCharCode(0xf2f6)}  Iniciar Sesión`" @tap="signin" />
        <Button class="fas btn btn-normal" :text="`${String.fromCharCode(0xf234)}  Regístrate`" @tap="signup" />
      </FlexboxLayout>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import {Component, Watch, Vue} from 'vue-property-decorator';
  import {mapState, mapGetters} from 'vuex';
  import * as constants from '@/store/constants';
  import Menu from '@/components/common/Menu'

  @Component({
    computed: {
      ...mapGetters({
        isLogged: constants.SESSION_IS_LOGGED,
      }),
    },
    components: {
      Menu,
    },
  })
  export default class App extends Vue {
    email: string = null;
    password: string = null;

    signin() {
      this.$store.dispatch(constants.SESSION_LOGIN, {
        email: this.email,
        password: this.password
      });
    }

    signup() {
      this.$goto('signup');
    }

    @Watch('isLogged')
    onLoginChanged(val: boolean, oldVal: boolean) {
      this.$goto('dashboard');
    }
  }
</script>

<style lang="scss">
  @import "../styles/app";
</style>
