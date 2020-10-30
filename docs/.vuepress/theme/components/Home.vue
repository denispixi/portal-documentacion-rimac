<template>
  <main
    class="home"
    :aria-labelledby="data.heroText !== null ? 'main-title' : null"
  >
    <header
      class="hero"
      v-bind:style="{'background-image': `url(${data.heroImage})`}"
    >
      <!-- <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'"
      > -->

      <h1
        v-if="data.heroText !== null"
        id="main-title"
      >
        {{ data.heroText || $title || 'Hello' }}
      </h1>

      <p
        v-if="data.tagline !== null"
        v-for="tagline in data.tagline.split('|-')"
        class="description"
      >
        {{ tagline || $description || 'Welcome to your VuePress site' }}<br>
      </p>

      <p
        v-if="data.actionText && data.actionLink"
        class="action"
      >
        <NavLink
          class="action-button"
          :item="actionLink"
        />
      </p>
    </header>

    <div
      v-if="data.features && data.features.length"
      class="features"
    >
      <a
        v-for="(feature, index) in data.features"
        :key="index"
        :href="feature.link"
        class="feature"
      >
        <img
          v-if="feature.icon"
          :src="$withBase(feature.icon)"
          alt="icon"
        >
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </a>
    </div>

    <Content class="theme-default-content custom" />

    <div
      v-if="data.footer"
      class="footer"
    >
      {{ data.footer }}
    </div>
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'Home',

  components: { NavLink },

  computed: {
    created() {
      console.log('ENTRA');
    },
    data () {
      console.log(this.$page.frontmatter);
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="stylus">
.home
  // padding $navbarHeight 2rem 0
  padding $navbarHeight 0 0
  // max-width $homePageWidth
  margin 0px auto
  display block
  .hero
    text-align center
    padding 30px 0px
    img
      max-width: 100%
      max-height 280px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 3rem
      color lighten($textColor, 90%)
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 50rem
      font-size 1.4rem
      line-height 1.3
      color lighten($textColor, 80%)
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      // background-color $accentColor
      background-color #4469d4
      padding 0.8rem 1.6rem
      border-radius 50px
      transition background-color .1s ease
      box-sizing border-box
      // border-bottom 1px solid darken($accentColor, 10%)
      border-bottom 1px solid darken(#4469d4, 10%)
      &:hover
        // background-color lighten($accentColor, 10%)
        background-color lighten(#4469d4, 10%)
  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
    max-width $homePageWidth
    margin 0px auto
  .feature
    flex-grow 1
    border solid rgba(0, 0, 0, .3);
    flex-basis 30%
    max-width 30%
    border-width 0.05px
    border-radius 5px
    padding 10px
    height 260px
    margin-bottom 15px
    &:hover
      box-shadow: 1px 1px 6px 6px rgba(117, 117, 117, .2);
    img
      max-width 30%
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
      padding-left 1.5rem
      padding-right 1.5rem
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    // padding-left 1.5rem
    // padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .features
      padding-left 1.5rem
      padding-right 1.5rem
    .feature
      h2
        font-size 1.25rem
</style>
