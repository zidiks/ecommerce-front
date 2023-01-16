<template>
  <div class="mobile-filter__range" style="z-index: 1000">
    <span class="mobile-filter__range__label">{{ property.name }} ОТ {{ (value.min || '0') + postfix }} до {{ (value.max || '∞') + postfix }}</span>
    <div class="mobile-filter__range__inputs">
      <div>
        <input type="number" pattern="[0-9]*" v-model="valueMin">
      </div>
      <div>
        <input type="number" pattern="[0-9]*" v-model="valueMax">
      </div>
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
      valueMin: undefined,
      valueMax: undefined,
    }
  },
  computed: {
    postfix() {
      return this.property.code === 'totalPrice' ? ' BYN' : ` ${this.property?.units}` || '';
    },
    isPrice() {
      return this.property.code === 'totalPrice';
    },
    minPrice() {
      return this.$store.state.drawers.priceRanges[this.property.code].min;
    },
    maxPrice() {
      return this.$store.state.drawers.priceRanges[this.property.code].max;
    },
    value() {
      return {
        min: this.valueMin,
        max: this.valueMax,
      }
    }
  },
  watch: {
    value: {
      handler(value) {
        setTimeout(() => {
          this.form[this.property.code][ComparisonOperator.gte] = value.min !== undefined ? Number(value.min) : undefined;
          this.form[this.property.code][ComparisonOperator.lte] = value.max !== undefined ? Number(value.max) : undefined;
        });
      },
      deep: true,
    },
  },
  mounted() {
    if (this.isPrice) {
      this.valueMin = this.minPrice || 0;
      this.valueMax = this.maxPrice || 0;
    }
  }
}
</script>
