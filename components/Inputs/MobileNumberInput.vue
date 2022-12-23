<template>
  <div class="mobile-filter__range">
    <span class="mobile-filter__range__label">{{ property.name }} ОТ {{ value[0] + postfix }} до {{ value[1] + postfix }}</span>
    <a-slider :tooltipVisible="false" :tooltip-visible="true" v-model:value="value" range :step="10" />
  </div>
</template>

<script>
import {ComparisonOperator} from "assets/shared/enums/mongoose-query.enum";
import {ref} from "vue";

export default {
  props: ['form', 'property'],
  data() {
    return {
      ComparisonOperator,
      value: ref([20, 50]),
    }
  },
  computed: {
    postfix() {
      return this.property.code === 'totalPrice' ? ' BYN' : '';
    }
  },
  watch: {
    value(value) {
      this.form[this.property.code][ComparisonOperator.gte] = value[0];
      this.form[this.property.code][ComparisonOperator.lte] = value[1];
    }
  }
}
</script>
