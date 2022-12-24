<template>
  <a-checkbox v-model:checked="form[property.code][ComparisonOperator.eq]">{{ property.name }}</a-checkbox>
</template>

<script>
import {ComparisonOperator} from "assets/shared/enums/mongoose-query.enum";

export default {
  props: ['form', 'property'],
  data() {
    return {
      ComparisonOperator
    }
  }
}
</script>
