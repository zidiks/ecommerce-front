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
        <div class="collapse__item">
          <h3>Бренд, аромат</h3>
          <p>{{ item.brand }}</p>
        </div>
        <div class="collapse__item">
          <h3>Тип, для кого</h3>
          <p>{{ item.type + ', ' + item.sex }}</p>
        </div>
        <div class="collapse__item">
          <h3>Парфюмер, год создания</h3>
          <p>{{ item.perfumer + ', ' + item.year }}</p>
        </div>
        <div class="collapse__item">
          <h3>семейство ароматов</h3>
          <p>{{ item.aromas?.join(', ') }}</p>
        </div>
        <div class="collapse__item">
          <h3>базовые ноты</h3>
          <p>{{ item.baseNotes?.join(', ') }}</p>
        </div>
        <div class="collapse__item">
          <h3>начальные ноты</h3>
          <p>{{ item.startNotes?.join(', ') }}</p>
        </div>
        <div class="collapse__item">
          <h3>средние ноты</h3>
          <p>{{ item.midNotes?.join(', ') }}</p>
        </div>
        <div class="collapse__item">
          <h3>сезон, время суток</h3>
          <p>{{ item.season + ', ' + item.daytime }}</p>
        </div>
        <div class="collapse__item">
          <h3>стойкость, Шлейфовость</h3>
          <p>{{ item.strength?.join(', ') }}</p>
        </div>
        <div class="collapse__item">
          <h3>страна торговой марки</h3>
          <p>{{ item.country }}</p>
        </div>
        <div class="collapse__item">
          <h3>СДЕЛАНО В</h3>
          <p>{{ item.made }}</p>
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
      console.log('activation');
      console.log(this.isActive ? false : true);
      return this.isActive ? this.isActive = false : this.isActive = true;
    }
  },
  props: ['item'],
});
</script>

<style lang="scss" scoped>
@import '~/assets/styles/global';

.collapse {
  margin-left: -1rem;
  background-color: transparent;
  margin-top: 5.5rem;

  @include breakpoint(xs) {
    margin-top: 3rem;
  }

  &__panel {
    border: 0;
    font-size: 35px;

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
    }

    & p {
      font-size: 18px;
      margin: 0;
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
