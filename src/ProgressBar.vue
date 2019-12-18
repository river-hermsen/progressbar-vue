  <template>
  <div>
    <div v-if="bar">
      <div id="progressbar" v-bind:style="bar.styles" :class="{ 'no-display': bar.noDisplay }"></div>
      percantage: {{bar.progressPercentage}}
      noDisplay: {{bar.noDisplay}}
    </div>
    <button @click="start()">START LOADING</button>
    <button @click="increaseBy10()">INCREASE 10%</button>
    <button @click="decreaseBy10()">DECREASE 10%</button>
    <button @click="update(50)">50% COMPLETE</button>
    <button @click="fail()">FAIL</button>
    <button @click="finish()">FINISH LOADING</button>
    <span ref="percentageDisplay"></span>
  </div>
</template>

  <style>
body {
  margin: unset;
}
#progressbar {
  position: absolute;
  top: 0;
  /* width: 50%; */
  height: 2px;
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
  },
  methods: {
    start() {
      this.bar.color = "blue";
      this.bar.isFinished = false;
      this.bar.isFailed = false;
      this.bar.progressPercentage = 1;
      this.bar.noDisplay = false;
    },
    increaseBy10() {
      console.log(window);

      this.bar.progressPercentage += 10;
    },
    decreaseBy10() {
      this.bar.progressPercentage -= 10;
    },
    update(percentage) {
      this.bar.progressPercentage = percentage;
    },
    fail() {
      this.bar.isFailed = true;
    },
    finish() {
      console.log("finshed");
      this.bar.isFinished = true;
      this.bar.progressPercentage = 100;
      clearInterval(this.bar.intervalFunc);
    }
  },
  watch: {
    progressPercentage() {
      if (this.bar.progressPercentage <= 0) {
        this.bar.progressPercentage = 0;
      } else if (this.bar.progressPercentage >= 95 && !this.bar.isFinished) {
        this.bar.progressPercentage = 95;
      } else if (this.bar.progressPercentage >= 100) {
        this.bar.progressPercentage = 100;
        setTimeout(() => {
          this.bar.noDisplay = true;
        }, 1500);
      }
      let spanDisplay = this.$refs.percentageDisplay;
      spanDisplay.innerHTML = this.progressPercentage;
    },
    noDisplay() {
      var self = this.bar;
      if (!this.bar.noDisplay) {
        self.intervalFunc = setInterval(function() {
          if (self.progressPercentage < 100) {
            self.progressPercentage += 3;
          }
        }, 110);
      }
    },
    isFailed() {
      if (this.bar.isFailed) {
        this.bar.color = "red";
        this.bar.finish();
      }
    }
  }
};
</script>
