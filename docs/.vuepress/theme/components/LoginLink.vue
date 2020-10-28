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
          console.log({ user });
        })
        .catch(() => (this.authenticated = false));
      // console.log({ authUser })
    },
    async login() {
      console.log("iniciando sesion");
      await Auth.federatedSignIn({ customProvider: "AzureADProvider" });
    },
    async logout() {
      console.log("cerrando sesion");
      await Auth.signOut();
    },
  },
};
</script>