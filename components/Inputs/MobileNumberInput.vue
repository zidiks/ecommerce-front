<template>
  <div class="mobile-filter__item">
    <span class="mobile-filter__item__label">{{ property.name }}</span>
    <div class="mobile-filter__item__action">

    </div>
  </div>
</template>

<script>
import {ComparisonOperator} from "assets/shared/enums/mongoose-query.enum";

export default {
  props: ['form', 'property'],
  data() {
    return {
      ComparisonOperator,
    }
  },
}
</script>
