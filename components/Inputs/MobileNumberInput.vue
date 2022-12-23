<template>
  <div class="mobile-filter__range">
    <span class="mobile-filter__range__label">{{ property.name }} ОТ {{ value[0] + postfix }} до {{ value[1] + postfix }}</span>
    <a-slider :tooltipVisible="false" :tooltip-visible="true" v-model:value="value" :min="minPrice" :max="maxPrice" range :step="10" />
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
      value: [0, 1000],
    }
  },
  computed: {
    postfix() {
      return this.property.code === 'totalPrice' ? ' BYN' : '';
    },
    minPrice() {
      return this.$store.state.drawers.minPrice;
    },
    maxPrice() {
      return this.$store.state.drawers.maxPrice;
    }
  },
  watch: {
    value(value) {
      setTimeout(() => {
        this.form[this.property.code][ComparisonOperator.gte] = value[0];
        this.form[this.property.code][ComparisonOperator.lte] = value[1];
      });
    }
  },
  mounted() {
    this.value = [this.minPrice || 0, this.maxPrice || 1000];
  }
}
</script>
