<template>
  <Page actionBarHidden="true">
    <GridLayout columns="*" rows="auto,auto" class="app">
      <Label textWrap="true" text="DesPlanta" class="title" col="0" row="0"/>
      <FlexboxLayout flexDirection="column" col="0" row="1" class="form">
        <Label text="Inicio de sesión" flexGrow="1"/>
        <TextField v-model="username" hint="Usuario" flexGrow="1"/>
        <TextField v-model="password" secure="true" hint="Password" flexGrow="1"/>
        <Button text="Iniciar Sesión" @tap="signin" class="signin"/>
        <Button text="Regístrate" @tap="signup" class="signup"/>
      </FlexboxLayout>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {mapState} from 'vuex';
  import * as constants from '@/store/constants';

  @Component({
    computed: mapState({
      name: state => state.Session.user,
    })
  })
  export default class App extends Vue {
    username = null;
    password = null;

    signin() {
      this.$store.dispatch(constants.SESSION_LOGIN, {email: this.username, password: this.password});
    }

    signup() {
      console.log('Wait');
    }
  }
</script>

<style scoped lang="scss">
  @import "../app";

  .app {
    background-color: $gray1;
  }

  .title {
    background-color: $primary;
    font-size: 20;
    padding: 10;
    color: #fff;
    text-align: center;
  }

  .form {
    text-align: center;
    align-content: center;
  }

  .signin {
    background-color: $secondary;
  }

  .signup {
    background-color: $highlight1;
  }
</style>
