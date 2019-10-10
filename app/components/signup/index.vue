<template>
  <Page actionBarHidden="true">
    <GridLayout columns="*" rows="auto,*,auto" class="app">
      <Label class="fab title" textWrap="true" :text="`${String.fromCharCode(0xf18c)} Plantza`"
             col="0" row="0"/>
      <FlexboxLayout class="form" flexDirection="column" col="0" row="1" verticalAlignment="middle">
        <Label text="Registro" flexGrow="1"/>
        <TextField v-model="email" hint="ex@mp.le" keyboardType="email"/>
        <TextField v-model="password1" secure="true" hint="Tu nueva contraseña acá"/>
        <TextField v-model="password2" secure="true" hint="Repite tu contraseña acá"/>
        <Button class="fas btn btn-normal" :text="`${String.fromCharCode(0xf234)}  Regístrate`"
                @tap="signup"/>
        <Button class="fas btn btn-normal" :text="`${String.fromCharCode(0xf2f6)}  Iniciar Sesión`"
                @tap="signin"/>
      </FlexboxLayout>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import {Component, Watch, Vue} from 'vue-property-decorator';
  import {mapGetters} from 'vuex';
  import * as constants from '@/store/constants';
  import ErrorModal from '@/components/common/ErrorModal.vue';

  @Component({
    computed: {
      ...mapGetters({
        isLogged: constants.SESSION_IS_LOGGED,
      }),
    },
    components: {
      SignUpError: ErrorModal,
    }
  })
  export default class SignUp extends Vue {
    email: string = null;
    password1: string = null;
    password2: string = null;

    signin() {
      this.$goto('home');
    }

    signup() {
      if (this.password1 === this.password2)
        this.$store.dispatch(constants.SESSION_SIGNUP, {
          email: this.email,
          password: this.password1
        });
      else
        this.$showModal(ErrorModal, {
          props: {
            msg: `Tus contraseñas no coinciden ${String.fromCharCode(0xf5b3)}`,
          },
        });
    }

    @Watch('isLogged')
    onLoginChanged(val: boolean, oldVal: boolean) {
      this.$goto('dashboard');
    }
  }
</script>

<style scoped>

</style>
