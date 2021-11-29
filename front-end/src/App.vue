<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark" v-if="notIsLoginPage">
      <b-navbar-brand class=header href="#">Ideias RPG</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Cadastrar RPG</b-nav-item>
          <b-nav-item to="/form">Formulario</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

      <b-navbar-nav right>
        <b-nav-item
          @click="logout()"
          v-b-tooltip.hover
          title="Sair">
         <i class="fas fa-power-off"></i>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>

export default {
  computed: {
    notIsLoginPage() {
      return this.$route.name !== "login" && this.$route.name !== "register";
    }
  },

  methods: {
    logout() {
      localStorage.removeItem('authUser');
      this.$router.push({name: "login"});
    }
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap');
.fade-enter-active, .fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter, .fade-leave {
  opacity: 0;
}
.header{
  font-family: 'Amatic SC';
  font-size: 50%;

}

</style>

