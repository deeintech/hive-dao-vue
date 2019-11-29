<template>
  <section class="slice slice-lg bg-gradient-primary">
    <div class="container pt-5">
      <div class="row">
        <div class="col-lg-8">
          <h2 class="display-4 text-white">{{ title }}</h2>
          <h5 class="mb-4 text-white">{{ subtitle }}</h5>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String
  }
};
</script>

<style></style>
