<template>
  <div id="nav">
    <header class="header">
      <div id="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div id="logo">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-logo_2.svg" alt="Logo" />
      </div>
    </header>
    <progress-bar></progress-bar>
  </div>
</template>
<style lang='scss'>
.header {
  width: 100%;
  height: 60px;
  background-color: #282828;
  display: flex;
  align-items: center;
  justify-content: space-between;
  #hamburger {
    margin-left: 1.5rem;
    cursor: not-allowed;
    span {
      display: block;
      width: 33px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;

      background: #cdcdcd;
      border-radius: 3px;
    }
    span:last-child {
      margin-bottom: unset;
    }
  }
  #logo {
    cursor: not-allowed;
    margin: 3rem;
  }
}
</style>

<script>
export default {}
</script>
