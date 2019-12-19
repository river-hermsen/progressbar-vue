import ProgressBar from './ProgressBar.vue'

function install(Vue, options = {}) {

    const optionsBar = {
        styles: {
            color: options.styles.color || 'blue',
            backgroundColor: '',
            failedColor: options.styles.failedColor || 'red',
            width: options.styles.width || '2px'
        },
        msBeforeDisappear: options.msBeforeDisappear || 1500,
        autoFinish: options.autoFinish || false
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
            failedColor: optionsBar.styles.failedColor
        },
        computed: {
            getStyles() {
                return {
                    width: this.progressPercentage + '%',
                    backgroundColor: optionsBar.styles.backgroundColor,
                    height: optionsBar.styles.width
                }
            }
        }
    })

    var progress = {
        $v: null,
        intervalFunc: {},
        start() {
            clearInterval(this.intervalFunc);
            clearTimeout(this.timeOutNoDisplay);
            this.$v.isFinished = false;
            this.$v.isFailed = false;
            this.$v.color = optionsBar.styles.color;
            optionsBar.styles.backgroundColor = optionsBar.styles.color;
            this.$v.progressPercentage = 1;
            this.$v.noDisplay = false;
            this.intervalFunc = setInterval(() => {
                console.log('intervalling');
                if (optionsBar.autoFinish) {
                    if (this.$v.progressPercentage >= 100) {
                        console.log('autofinsih');
                        this.finish();
                    } else {
                        this.$v.progressPercentage += 3;
                    }
                } else {
                    if (this.$v.progressPercentage < 94 && !this.$v.isFinished) {
                        this.$v.progressPercentage += 3;
                    }
                }
            }, 130);
        },
        update(percentage) {
            if (!this.$v.isFinished) {
                this.$v.progressPercentage = percentage;
            } else {
                return undefined;
            }
        },
        fail() {
            this.$v.isFailed = true;
            optionsBar.styles.backgroundColor = optionsBar.styles.failedColor;
            this.$v.color = optionsBar.styles.failedColor;
            this.finish();
        },
        finish() {
            this.$v.progressPercentage = 100;
            this.$v.isFinished = true;
            clearInterval(this.intervalFunc);
            this.timeOutNoDisplay = setTimeout(() => {
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
