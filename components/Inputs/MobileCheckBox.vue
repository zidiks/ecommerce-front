<template>
  <div @click="toggleCheckbox" class="mobile-filter__item">
    <span class="mobile-filter__item__label">{{ property.name }}</span>
    <div class="mobile-filter__item__action mobile-filter__item__checkbox">
      <input :checked="form[property.code][ComparisonOperator.eq]" id="html" type="checkbox">
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
    methods: {
      toggleCheckbox() {
        this.form[this.property.code][ComparisonOperator.eq] = !this.form[this.property.code][ComparisonOperator.eq];
      }
    }
  }
</script>
