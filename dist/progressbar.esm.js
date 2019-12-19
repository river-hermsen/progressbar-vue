//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  data: function data() {
    return {
      bar: window.busProgressBar
    };
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) { style.element.setAttribute('media', css.media); }
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) { style.element.removeChild(nodes[index]); }
      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.bar)?_c('div',[_c('div',{class:{ 'no-display': _vm.bar.noDisplay },style:(_vm.bar.getStyles),attrs:{"id":"progressbar"}}),_vm._v("\n    percantage: "+_vm._s(_vm.bar.progressPercentage)+"\n    noDisplay: "+_vm._s(_vm.bar.noDisplay)+"\n  ")]):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-45ae24f8_0", { source: "body{margin:unset}#progressbar{top:0;transition:width .3s linear}.no-display{display:none}button{margin-top:50px}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var ProgressBar = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

function install(Vue, options) {
    if ( options === void 0 ) options = {};


    var optionsBar = {
        styles: {
            color: options.styles ? options.styles.color : 'blue',
            backgroundColor: '',
            failedColor: options.styles ? options.styles.failedColor : 'red',
            width: options.styles ? options.styles.width : '2px',
            position: options.styles ? options.position : 'fixed'
        },
        msBeforeDisappear: options.msBeforeDisappear || 1500,
        autoFinish: options.autoFinish || false,
    };
    console.log(options);
    console.log(optionsBar);

    var busProgressBar = new Vue({
        data: {
            noDisplay: true,
            progressPercentage: 0,
            intervalFunc: {},
            isFailed: false,
            isFinished: false,
            failedColor: optionsBar.styles.failedColor
        },
        computed: {
            getStyles: function getStyles() {
                return {
                    width: this.progressPercentage + '%',
                    backgroundColor: optionsBar.styles.backgroundColor,
                    height: optionsBar.styles.width,
                    position: optionsBar.styles.position
                }
            }
        }
    });

    var progress = {
        $v: null,
        intervalFunc: {},
        start: function start() {
            var this$1 = this;

            clearInterval(this.intervalFunc);
            clearTimeout(this.timeOutNoDisplay);
            this.$v.isFinished = false;
            this.$v.isFailed = false;
            this.$v.color = optionsBar.styles.color;
            optionsBar.styles.backgroundColor = optionsBar.styles.color;
            this.$v.progressPercentage = 1;
            this.$v.noDisplay = false;
            this.intervalFunc = setInterval(function () {
                console.log('intervalling');
                if (optionsBar.autoFinish) {
                    if (this$1.$v.progressPercentage >= 100) {
                        console.log('autofinsih');
                        this$1.finish();
                    } else {
                        this$1.$v.progressPercentage += 3;
                    }
                } else {
                    if (this$1.$v.progressPercentage < 94 && !this$1.$v.isFinished) {
                        this$1.$v.progressPercentage += 3;
                    }
                }
            }, 130);
        },
        update: function update(percentage) {
            if (!this.$v.isFinished) {
                this.$v.progressPercentage = percentage;
            } else {
                return undefined;
            }
        },
        fail: function fail() {
            this.$v.isFailed = true;
            optionsBar.styles.backgroundColor = optionsBar.styles.failedColor;
            this.$v.color = optionsBar.styles.failedColor;
            this.finish();
        },
        finish: function finish() {
            var this$1 = this;

            this.$v.progressPercentage = 100;
            this.$v.isFinished = true;
            clearInterval(this.intervalFunc);
            this.timeOutNoDisplay = setTimeout(function () {
                this$1.$v.noDisplay = true;
            }, optionsBar.msBeforeDisappear);
        },
    };

    window.busProgressBar = busProgressBar;
    progress.$v = busProgressBar;
    Vue.prototype.$ProgressBar = progress;

    // if (install.installed) return;
    // install.installed = true;
    Vue.component("progress-bar", ProgressBar);
}

var GlobalVue = null;
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
