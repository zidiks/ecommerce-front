<template>
  <div @click="onOpen" class="mobile-filter__item">
    <span class="mobile-filter__item__label">{{ property.name }}</span>
    <div class="mobile-filter__item__action">
      <span class="material-symbols-outlined">chevron_right</span>
    </div>
    <a-drawer
      placement="right"
      :title="property.name"
      class="mobile-filter all-text-toUpperCase"
      :z-index="9992"
      :closable="true"
      width="80%"
      @close="onClose"
      :visible="visible"
    >
      <div @click="toggle(option.value)" class="mobile-filter__item" v-for="option of property.options || []"  :key="option.label">
        <span class="mobile-filter__item__label">{{ option.label }}</span>
        <div class="mobile-filter__item__action mobile-filter__item__checkbox">
          <input :checked="form[property.code][ComparisonOperator.in].includes(option.value)" id="html" type="checkbox">
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import {ComparisonOperator} from "assets/shared/enums/mongoose-query.enum";

export default {
  props: ['form', 'property'],
  data() {
    return {
      ComparisonOperator,
      visible: false,
      valueSet: new Set(this.form[this.property.code][ComparisonOperator.in]),
    }
  },
  methods: {
    onOpen() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    toggle(value) {
      if (this.valueSet.has(value)) {
        this.unCheck(value);
      } else {
        this.check(value);
      }
    },
    check(value) {
      this.valueSet.add(value);
      this.form[this.property.code][ComparisonOperator.in] = Array.from(this.valueSet);
    },
    unCheck(value) {
      this.valueSet.delete(value);
      this.form[this.property.code][ComparisonOperator.in] = Array.from(this.valueSet);
    }
  },
}
</script>
