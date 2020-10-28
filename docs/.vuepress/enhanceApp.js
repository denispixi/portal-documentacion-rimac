import Auth from '@aws-amplify/auth'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
  isServer // is this enhancement applied in server-rendering or client
}) => {

  Auth.configure({
    // identityPoolId: "us-east-2:6c85b564-3454-4d54-86b9-8a9d0f549af6",
    mandatorySignIn: true,
    region: "us-east-2",
    userPoolId: "us-east-2_oYyBgwLfv",
    userPoolWebClientId: "6qa50qlkbibq1lu51l7ggpo3i0",
    oauth: {
      domain: "rimac-com-pe-desa.auth.us-east-2.amazoncognito.com",
      redirectSignIn: "http://localhost:8080",
      redirectSignOut: "http://localhost:8080",
      responseType: "code",
      scope: ["phone", "email", "profile", "openid", "aws.cognito.signin.user.admin"],
    }
  });

  router.beforeEach((to, from, next) => {

    console.log({ to, from, next });
    if (to.path !== '/') {
      Auth.currentAuthenticatedUser()
        .then(user => {
          console.log('autorizado');
          console.log({ user });
          next()
        })
        .catch(() => {
          // next('/')
          console.log('no autorizado');
          // alert('debes iniciar sesion para ver el contenido');
          Auth.federatedSignIn({ customProvider: "AzureADProvider" });
        });
    } else {
      next()
    }
  });

}