<template>
  <div class="section--maintenance full-absolute full-flex">

    <div class="row w-100">
      <div class="row w-100">
        <!--        <img src="@/assets/img/logo.png" alt="Logo" class="d-block mx-auto" height="100">-->
        <logo class="d-block mx-auto img-fluid"/>
      </div>

      <div class="row w-100">
        <div class="col-12 text-center">
          <h1>Le site est en maintenance</h1>
        </div>
        <div class="col-12 text-center">
          <h3>Revenez plus tard</h3>
        </div>
      </div>

      <div class="row w-100">
        <img src="@/assets/img/unplugged.jpg" alt="Maintenance" class="d-block mx-auto img-fluid">
      </div>

    </div>
  </div>
</template>

<script>
import Logo from "@/components/commons/logo";

export default {
  name      : "maintenance",
  components: {Logo}
}
</script>

<style lang="scss" scoped>
.section--maintenance {
  position: fixed !important;
  background: #F4F4F4;
}
</style>
