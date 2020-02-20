<template>
  <b-container fluid>
    <b-row class="justify-content-md-center footer bg-dark">
      <b-col>
        <p class="text-center text-white c-text">
          &copy;{{ year }} — <strong>Matcha</strong>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    const currentDate = new Date()
    return {
      year: currentDate.getFullYear()
    }
  }
}
</script>
<style scoped>
.footer {
  min-height: 50px;
}
.c-text {
  margin-top: 10px;
  margin-bottom: 0;
}
</style>
