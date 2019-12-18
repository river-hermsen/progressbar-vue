import ProgressBar from './ProgressBar.vue'

function install(Vue) {
    // var Progress = {
    //     state: {
    //         failColor: '',
    //         color: ''
    //     },
    // }
    const VueProgressBarEventBus = new Vue({
        data: {
            RADON_LOADING_BAR: {
                percent: 0,
                options: progressOptions
            }
        }
    })

    window.VueProgressBarEventBus = VueProgressBarEventBus

    if (install.installed) return;
    install.installed = true;
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
