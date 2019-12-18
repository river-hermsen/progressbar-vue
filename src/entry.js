import ProgressBar from './ProgressBar.vue'

function install(Vue, options = {}) {

    const optionsBar = {
        styles: {
            color: options.styles.color || 'blue',
            failedColor: options.styles.failedColor || 'red',
            width: options.styles.width || 2px
        },
        msBeforeDisappear: options.msBeforeDisappear || 1500
    }
    console.log(options);
    console.log(optionsBar);

    const busProgressBar = new Vue({
        data: {
            noDisplay: true,
            progressPercentage: 0,
            intervalFunc: {},
            isFailed: false,
            isFinished: false,
            failedColor: optionsBar.styles.failedColor,
            styles: {
                color: optionsBar.styles.color,
                height: optionsBar.styles.width
            }
        }
    })

    var progress = {
        $v: null,
        intervalFunc: {},
        start() {
            console.log('starting...');

            this.$v.isFinished = false;
            this.$v.isFailed = false;
            this.$v.color = 'blue';
            this.$v.progressPercentage = 2;
            this.$v.noDisplay = false;
            this.intervalFunc = setInterval(() => {
                console.log('intervalling');

                if (this.$v.progressPercentage <= 95 && !this.$v.isFinished) {
                    this.$v.progressPercentage += 3;
                }
            }, 130);
        },
        fail() {
            this.$v.isFailed = true;
            this.$v.color = 'red'
            this.finish();
        },
        finish() {
            console.log("finshed");

            this.$v.progressPercentage = 100;
            this.$v.isFinished = true;
            clearInterval(this.intervalFunc);
            setTimeout(() => {
                this.$v.noDisplay = true;
            }, optionsBar.msBeforeDisappear);
        },
    }

    window.busProgressBar = busProgressBar
    progress.$v = busProgressBar
    Vue.prototype.$ProgressBar = progress

    // if (install.installed) return;
    // install.installed = true;
    Vue.component("progress-bar", ProgressBar);
}

const plugin = {
    install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
    GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
    GlobalVue = global.vue;
}

if (GlobalVue) {
    GlobalVue.use();
}

ProgressBar.install = install;

export default ProgressBar;
