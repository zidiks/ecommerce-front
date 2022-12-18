<template>
  <a-checkbox v-model:checked="form[data.code]">{{ data.name }}</a-checkbox>
</template>

<script>
export default {
  props: ['form', 'data'],
  mounted() {
    console.log(this.form);
  }
}
</script>
