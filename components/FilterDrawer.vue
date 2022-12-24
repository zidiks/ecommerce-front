<template>
  <a-drawer
    placement="right"
    title="ФИЛЬТРЫ"
    class="mobile-filter all-text-toUpperCase"
    :z-index="999"
    :closable="true"
    width="90%"
    @close="closeFilter"
    :visible="visible"
  >
    <div v-for="field of baseFilterSorted || []"  :key="field.id">
      <MobileCheckBox v-if="field.type === ProductTypePropertyType.CheckBox" :form="basePropertiesForm" :property="field"></MobileCheckBox>
      <MobileNumberInput v-if="[ProductTypePropertyType.NumberInput, ProductTypePropertyType.NumberSelect].includes(field.type)" :form="basePropertiesForm" :property="field"></MobileNumberInput>
      <MobileStringMultiSelect v-if="[ProductTypePropertyType.StringSelect, ProductTypePropertyType.StringMultiSelect].includes(field.type)" :form="basePropertiesForm"  :property="field"></MobileStringMultiSelect>
    </div>
    <div v-for="field of customFilters || []"  :key="field.id">
      <MobileCheckBox v-if="field.type === ProductTypePropertyType.CheckBox" :form="customPropertiesForm" :property="field"></MobileCheckBox>
      <MobileNumberInput v-if="[ProductTypePropertyType.NumberInput, ProductTypePropertyType.NumberSelect].includes(field.type)" :form="customPropertiesForm"  :property="field"></MobileNumberInput>
      <MobileStringMultiSelect v-if="[ProductTypePropertyType.StringSelect, ProductTypePropertyType.StringMultiSelect].includes(field.type)" :form="customPropertiesForm"  :property="field"></MobileStringMultiSelect>
    </div>
  </a-drawer>
</template>

<script>
  import {ProductTypePropertyType} from "assets/shared/enums/product-property.enum";
  import MobileCheckBox from "@/components/Inputs/MobileCheckBox";
  import MobileNumberInput from "@/components/Inputs/MobileNumberInput";
  import MobileStringMultiSelect from "@/components/Inputs/MobileStringMultiSelect";

  export default {
    components: {MobileStringMultiSelect, MobileNumberInput, MobileCheckBox},
    props: ['basePropertiesForm', 'customPropertiesForm', 'baseFilters', 'customFilters'],
    data() {
      return {
        ProductTypePropertyType,
      }
    },
    computed: {
      visible() {
        return this.$store.state.drawers.filterState;
      },
      baseFilterSorted() {
        return this.baseFilters.sort((a, b) => {
          const aScore = [ProductTypePropertyType.NumberInput, ProductTypePropertyType.NumberSelect].includes(a.type) ? 1 : 0;
          const bScore = [ProductTypePropertyType.NumberInput, ProductTypePropertyType.NumberSelect].includes(b.type) ? 1 : 0;
          return bScore - aScore;
        })
      },
    },
    methods: {
      closeFilter() {
        this.$store.commit('drawers/closeFilter');
      },
    }
  }
</script>
