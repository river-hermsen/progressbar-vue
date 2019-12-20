<template>
  <div id="content">
    <div>
      <at-button type="primary" size="large" @click="$ProgressBar.start()">Start</at-button>
      <at-button type="primary" size="large" @click="$ProgressBar.fail()">Fail</at-button>
      <at-button type="primary" size="large" @click="$ProgressBar.finish()">Finish</at-button>
      <at-button type="primary" size="large" @click="$ProgressBar.update(50)">Update to 50%</at-button>
    </div>
    <div>
      <h1>Progressbar options</h1>
      <div>
        <div>
          <div class="row">
            <div class="col-md-6 input">
              <label for="width">width</label>
              <at-input v-model="optionsProgressBar.width" placeholder size="large" append-button>
                <template slot="append">
                  <span>px</span>
                </template>
              </at-input>
            </div>
            <div class="col-md-8 input">
              <label>color</label>
              <at-input v-model="optionsProgressBar.color" placeholder></at-input>
            </div>
            <div class="col-md-8 input">
              <label>failedColor</label>
              <at-input v-model="optionsProgressBar.failedColor" placeholder></at-input>
            </div>
            <div class="col-md-8 input">
              <label>position</label>
              <at-input v-model="optionsProgressBar.position" placeholder></at-input>
            </div>
            <div class="col-md-6 input">
              <label>msBeforeDisappear</label>
              <at-input-number v-model="optionsProgressBar.msBeforeDisappear" :min="0"></at-input-number>
            </div>
            <div class="col-md-6 input">
              <label>autoFinish</label>
              <div class="radioGroupContainer">
                <at-radio-group v-model="optionsProgressBar.autoFinish">
                  <at-radio label="true">true</at-radio>
                  <at-radio label="false">false</at-radio>
                </at-radio-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h1>Demo options</h1>
      <div class="row">
        <div class="col-md-6">
          <label>Navigation bar</label>
          <div class="radioGroupContainer">
            <at-radio-group v-model="optionsDemo.navBar">
              <at-radio label="true">show</at-radio>
              <at-radio label="false">hide</at-radio>
            </at-radio-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#content {
  max-width: 800px;
  margin: 2rem auto;
  h1 {
    color: white;
    font-size: 2rem;
  }
  label {
    font-size: 0.9rem;
  }
  .input {
    margin-bottom: 1.3rem;
  }
  .radioGroupContainer {
    height: 32px;
    display: flex;
    align-items: center;
  }
}
.at-radio__label {
  color: #fff;
}
</style>

<script>
/*eslint-disable*/
import Vue from "vue";
import ProgressBar from "progressbar-vue";

function reInitProgressBar() {
  console.log(Vue());

  Vue.use(ProgressBar, {
    styles: {
      color: data.optionsProgressBar.color,
      width: data.optionsProgressBar.width + "px",
      failedColor: data.optionsProgressBar.failedColor
    }
  });
}

const VueInstance = {
  data() {
    return {
      optionsProgressBar: {
        width: 5,
        color: "#2d77ed",
        failedColor: "#eb1c1c",
        position: "fixed",
        msBeforeDisappear: 500,
        autoFinish: "false"
      },
      optionsDemo: {
        navBar: "true"
      }
    };
  },
  computed: {
    width(e) {
      console.log(e);

      return this.options.width + "px";
    }
  },
  methods: {
    start() {
      this.$ProgressBar.start();
      this.$Loading.start();
    },
    initProgressBar() {}
  },
  computed: {
    getOptionsProgressBar() {
      return this.optionsProgressBar;
    }
  },
  watch: {
    getOptionsProgressBar: {
      handler: () => {
        console.log("changed");

        reInitProgressBar();
      },
      deep: true
    }
  }
};
const data = VueInstance.data();
console.log(VueInstance.data().optionsProgressBar.width);

export default VueInstance;
</script>
