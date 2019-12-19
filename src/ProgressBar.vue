  <template>
  <div>
    <div v-if="bar">
      <div id="progressbar" v-bind:style="bar.getStyles" :class="{ 'no-display': bar.noDisplay }"></div>
      percantage: {{bar.progressPercentage}}
      noDisplay: {{bar.noDisplay}}
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
button {
  margin-top: 50px;
}
</style>

  <script>
/* eslint-disable no-console */
export default {
  data() {
    return {
      bar: window.busProgressBar
    };
  }
};
</script>
