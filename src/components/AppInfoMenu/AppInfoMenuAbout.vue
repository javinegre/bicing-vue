<template>
    <section class="info-menu-about info-menu-block">
        <span class="md-title">About</span>
        <div>
            This project was made with &#10084; by:
            <br />
            <a href="https://negre.co" target="_blank">
                <img v-bind:src="jncLogo" alt="javi.negre.co/des" class="info-menu-about-logo" />
            </a>
            <br />
            <a href="https://github.com/javinegre/bicing-vue" target="_blank" class="info-menu-about-github">
                <img v-bind:src="githubLogo" alt="javi.negre.co/des" class="info-menu-about-github-logo" />
                Source code
            </a>
        </div>
    </section>
</template>

<script>
    import jncLogo from '../../assets/logo/javi-negre-codes.svg';
    import githubLogo from '../../assets/logo/github.svg';

  export default {
    name: 'AppInfoMenuAbout',
    data: function () {
      return {
        jncLogo,
        githubLogo
      };
    }
  }
</script>

<style lang="scss">
    .info-menu-about {
        &-logo {
            width: 200px;
            margin: 1em 0 2em;
        }

        &-github {
            position: relative;

            &-logo {
                position: relative;
                top: -2px;
                width: 20px;
                margin-right: 4px;
                vertical-align: middle;
            }
        }
    }
</style>