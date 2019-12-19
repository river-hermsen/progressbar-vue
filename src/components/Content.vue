<template>
  <div id="content">
    <button @click="start()">Start</button>
  </div>
</template>

<style>
#content {
  max-width: 900px;
  margin: 0 auto;
}
</style>

<script>
export default {
  methods: {
    start () {
      this.$ProgressBar.start()
    }
  }
}
</script>
