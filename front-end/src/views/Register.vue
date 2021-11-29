<template>
  <b-row class="vh-100 vw-100 row-login">
    <b-col
      sm="7"
      class="side-login d-flex justify-content-center align-items-center"
    >
      <img src="../assets/images/register.svg" class="img-register" />
    </b-col>
    <b-col
      sm="5"
      class="d-flex justify-content-center align-items-center right-register"
    >
      <div class="col-8">
        <h2 class="text-center mb-5 title-login">Faça o seu cadastro</h2>
        
          <b-form-group label="Nome" label-for="name">
            <b-form-input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              autocomplete="off"
              v-model.trim="$v.form.name.$model"
              :state="getValidation('name')"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="E-mail" label-for="email">
            <b-form-input
              id="email"
              type="email"
              placeholder="Digite um e-mail valido"
              autocomplete="off"
              v-model.trim="$v.form.email.$model"
              :state="getValidation('email')"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Senha" label-for="password">
            <b-form-input
              id="password"
              type="password"
              placeholder="Digite aqui a sua senha"
              v-model.trim="$v.form.password.$model"
              :state="getValidation('password')"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Confirme sua senha" label-for="confirmPassword">
            <b-form-input
              id="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              v-model.trim="$v.form.confirmPassword.$model"
              :state="getValidation('confirmPassword')"
            ></b-form-input>
          </b-form-group>

          <b-button type="button" variant="primary" block @click="register"
            ><i class="fas fa-plus"></i> Cadastrar</b-button
          >

          <hr />

          <b-button
            type="button"
            variant="outline-secondary"
            block
            @click="goToLogin"
            ><i class="fas fa-angle-left"></i>Voltar</b-button
          >
      </div>
    </b-col>
  </b-row>
  
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import UsersModel from "@/models/UsersModel";
import ToastMixin from "@/mixins/toastMixin.js";

export default {
  mixins: [ToastMixin],

  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },

  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },

      email: {
        required,
        email,
      },

      password: {
        required,
        minLength: minLength(6),
      },

      confirmPassword: { 
        required, 
        sameAsPassword: sameAs('password') 
      }
    },
  },

  methods: {
    register() {
      this.$v.$touch();
      if (this.$v.$error) return;

      const user = new UsersModel(this.form);
      user.save();

      this.showToast("success", "Sucesso!", "Usuário criado com sucesso");
      this.goToLogin();
    },

    getValidation(field) {
      if (this.$v.form.$dirty === false) {
        return null;
      }

      return !this.$v.form[field].$error;
    },

    goToLogin() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap');
*,
*:after,
*:before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

.row-login {
  margin-left: 0 !important;
}

.img-register {
  width: 600px;
  height: 600px;
}

.right-register {
  background-color: #f2f2f2;
}

.title-login {
  font-family: 'Amatic SC';
  font-weight: bold;
}
</style>
