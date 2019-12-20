<template>
  <div id="app">
    <Navigation />
    <Content />
  </div>
</template>

<style>
body {
  margin: unset;
  background-color: #1f1f1f !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}
</style>

<script>
/*eslint-disable */

import { AtButton } from "at-ui";

import Navigation from "./components/Navigation";
import Content from "./components/Content";
export default {
  components: { Navigation, Content, AtButton }
};
</script>
