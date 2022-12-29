<template>
  <a-dropdown v-model:visible="dropdownState" :trigger="['click']">
    <div @click.prevent="toggleDropdown()">
      <a class="active-target" v-if="form[property.code][ComparisonOperator.gte] || form[property.code][ComparisonOperator.lte]">
        {{ `${form[property.code][ComparisonOperator.gte] || '0'} ${property.prefix || property.units || ''}`}}  - {{ `${form[property.code][ComparisonOperator.lte] || '∞'} ${property.prefix || property.units || ''}` }}
      </a>
      <a v-else>
        {{  property.name }}
      </a>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <div>От</div>
          <a-input-number
            @pressEnter="toggleDropdown()"
            type="number"
            v-model:value="form[property.code][ComparisonOperator.gte]"
          />
        </a-menu-item>
        <a-menu-item>
          <div>До</div>
          <a-input-number
            @pressEnter="toggleDropdown()"
            type="number"
            v-model:value="form[property.code][ComparisonOperator.lte]"
            :min="form[property.code][ComparisonOperator.gte] || 0"
          />
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
import {ComparisonOperator} from "assets/shared/enums/mongoose-query.enum";

export default {
  props: ['form', 'property'],
  data() {
    return {
      ComparisonOperator,
      dropdownState: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownState = !this.dropdownState;
    },
  }
}
</script>

<style lang="scss" scoped>
  .numbers-input {
    display: flex;
    flex-direction: column;
  }
  .active-target {
    color: var(--data-color-black) !important;
  }
  .ant-dropdown-menu {
    user-select: none;
    display: flex;
    flex-direction: column;
    &-item {
      width: 12rem;
      display: grid;
      grid-template-columns: 1.8rem auto;
      & > div {
        display: flex;
        align-items: center;
      }
      &:hover {
        background-color: transparent;
      }
    }
    .ant-input-number {
      width: auto;
      border-radius: 0;
      box-shadow: none !important;
      border: none !important;
      border-bottom: 1px solid rgba(#0B0B0B, 0.3) !important;
    }
  }
</style>
