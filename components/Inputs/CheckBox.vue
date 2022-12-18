<template>
  <a-checkbox v-model:checked="form[property.code]">{{ property.name }}</a-checkbox>
</template>

<script>
export default {
  props: ['form', 'property'],
  mounted() {
    console.log(this.form);
  }
}
</script>
