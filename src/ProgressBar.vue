  <template>
  <div>
    <div v-if="bar">
      <div id="progressbar" v-bind:style="bar.getStyles" :class="{ 'no-display': bar.noDisplay }"></div>
    </div>
  </div>
</template>

<style>
body {
  margin: unset;
}
#progressbar {
  top: 0;
  transition: width 0.3s linear;
}
.no-display {
  display: none;
}
</style>

  <script>
export default {
  data() {
    return {
      bar: window.busProgressBar
    };
  }
};
</script>
