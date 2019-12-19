<template>
  <div id="app">
    <Navigation />
    <Content />
  </div>
</template>

<style>
body {
  margin: unset;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<script>
/*eslint-disable */
import Navigation from "./components/Navigation";
import Content from "./components/Content";
export default {
  components: { Navigation, Content }
};
</script>
