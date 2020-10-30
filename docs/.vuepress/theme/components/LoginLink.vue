<template>
  <div class="nav-item">
    <a
      v-if="authenticated"
      href="/"
      @click.stop.prevent="logout"
      class="nav-link"
      >Cerrar sesión</a
    >
    <a v-else href="/" @click.stop.prevent="login" class="nav-link">Ingresar</a>
  </div>
</template>

<script>
import Auth from "@aws-amplify/auth";

export default {
  created() {
    this.isAuthenticated();
  },
  data() {
    return {
      user: null,
      authenticated: false,
    };
  },
  methods: {
    async isAuthenticated() {
      Auth.currentAuthenticatedUser()
        .then((user) => {
          this.authenticated = true;
          // console.log({ user });
        })
        .catch(() => (this.authenticated = false));
      // console.log({ authUser })
    },
    login() {
      console.log("iniciando sesion");
      Auth.federatedSignIn({ customProvider: "AzureADProvider" });
    },
    logout() {
      console.log("cerrando sesion");
      Auth.signOut();
    },
  },
};
</script>