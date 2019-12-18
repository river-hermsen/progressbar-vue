<template>
  <div>
    <div
      id="progressbar"
      v-bind:style="{ width: progressPercentage + '%', backgroundColor: color }"
      :class="{ 'no-display': noDisplay }"
    ></div>
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
      color: "blue",
      noDisplay: true,
      progressPercentage: 1,
      intervalFunc: {},
      isFailed: false,
      isFinished: false
    };
  },
  methods: {
    start() {
      this.color = "blue";
      this.isFinished = false;
      this.isFailed = false;
      this.progressPercentage = 1;
      this.noDisplay = false;
    },
    increaseBy10() {
      console.log(window);

      this.progressPercentage += 10;
    },
    decreaseBy10() {
      this.progressPercentage -= 10;
    },
    update(percentage) {
      this.progressPercentage = percentage;
    },
    fail() {
      this.isFailed = true;
    },
    finish() {
      console.log("finshed");
      this.isFinished = true;
      this.progressPercentage = 100;
      clearInterval(this.intervalFunc);
    }
  },
  watch: {
    progressPercentage() {
      if (this.progressPercentage <= 0) {
        this.progressPercentage = 0;
      } else if (this.progressPercentage >= 95 && !this.isFinished) {
        this.progressPercentage = 95;
      } else if (this.progressPercentage >= 100) {
        this.progressPercentage = 100;
        setTimeout(() => {
          this.noDisplay = true;
        }, 1500);
      }
      let spanDisplay = this.$refs.percentageDisplay;
      spanDisplay.innerHTML = this.progressPercentage;
    },
    noDisplay() {
      var self = this;
      if (!this.noDisplay) {
        self.intervalFunc = setInterval(function() {
          if (self.progressPercentage < 100) {
            self.progressPercentage += 3;
          }
        }, 110);
      }
    },
    isFailed() {
      if (this.isFailed) {
        this.color = "red";
        this.finish();
      }
    }
  }
};
</script>
