<template>
  <a-collapse class="collapse" v-model="activeKey" expandIconPosition="right" :bordered="false">
    <template #expandIcon="{ isActive }">
        <div>
          <div>
            <div class="line" :style="isActive ? 'transition: 0.3s; transform: rotate(0deg) translateY(1px)' : 'transition: 0.3s; transform: rotate(90deg) translateX(1px)'"></div>
            <div class="line" :style="isActive ? 'transition: 0.3s; opacity: 0' : 'transition: 0.3s; opacity: 1'"></div>
          </div>
        </div>
    </template>
    <a-collapse-panel class="collapse__panel" key="1" header="Описание товара">
        <div v-for="item of items" :key="item.productTypePropertyId" class="collapse__item">
          <h3>{{ item.name }}</h3>
          <p>{{ processValue(item.value) }}</p>
        </div>
    </a-collapse-panel>
    <a-collapse-panel class="collapse__panel" key="2" header="Оплата и доставка">
      <div class="collapse__item">
        <h3>Оплата</h3>
        <p>
          Наличными курьеру, Наложенным платежом,<br>
          Банковской картой онлайн
        </p>
      </div>
      <div class="collapse__item">
        <h3>Доставка</h3>
        <p>
          Курьером по Минску (БЕСПЛАТНО),<br>
          почта, европочта
        </p>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  data: () => ({
    isActive: true,
  }),
  setup() {
    const activeKey = ref(['0']);
    return {
      activeKey,
    };
  },
  methods: {
    activate: function() {
      return this.isActive ? this.isActive = false : this.isActive = true;
    },
    processValue(value) {
      if (Array.isArray(value)) {
        return value.join(', ');
      }

      if (typeof value == "boolean") {
        return value ? 'ДА' : 'НЕТ';
      }

      return  value;
    }
  },
  props: ['items'],
});
</script>

<style lang="scss" scoped>
@import '~/assets/styles/global';

.collapse {
  margin-left: -1rem;
  background-color: transparent;
  margin-top: 5.5rem;

  @include breakpoint(l) {
    margin-top: 0;
  }

  &__panel {
    border: 0;
    font-size: 35px;

    @include breakpoint(xl) {
      font-size: 1.5rem;
    }

    @include breakpoint(l) {
      font-size: 1.75rem;
    }

    @include breakpoint(xs) {
      font-size: 1.25rem;
    }

    @include breakpoint(xxs) {
      font-size: 1rem;
    }

    &:nth-child(2) {
      margin-top: 3.75rem;

      @include breakpoint(xs) {
        margin-top: 2rem;
      }
    }
  }

  &__item {
    border-bottom: $main-border;
    padding: 1.25rem 0;

    &:nth-child(1) {
      margin-top: 2rem;
      border-top: $main-border;
    }

    & h3 {
      font-size: 25px;

      @include breakpoint(xs) {
        font-size: 1.25rem;
      }
    }

    & p {
      font-size: 18px;
      margin: 0;

      @include breakpoint(xs) {
        font-size: 1rem;
      }
    }
  }
}

.line {
  width: 23px;
  height: 1px;
  background-color: $BLACK;

  @include breakpoint(xs) {
    width: 17px;
  }
}
</style>
