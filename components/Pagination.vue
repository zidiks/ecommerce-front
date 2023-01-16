<template>
  <div class="pagination__controls" v-if="metadata">
    <div @click="changePage(currentIndex - 1)">
      <ControlArrow :arrowDisabled="currentIndex <= minRange" :arrowBack="true" class="pagination__control"></ControlArrow>
    </div>
    <div class="pagination__pages">
      <li @click="changePage(item)" class="pagination__link" :class="{'pagination__link-active': item === currentIndex}" v-for="item of range" :key="item">
        <span>{{ item }}</span>
      </li>
    </div>
    <div @click="changePage(currentIndex + 1)">
      <ControlArrow :arrowDisabled="currentIndex >= maxRange" class="pagination__control"></ControlArrow>
    </div>
  </div>
</template>

<script scoped>
  export default {
    props: ['metadata'],
    computed: {
      currentIndex() {
        return this.metadata.page || 1;
      },
      minRange() {
        const  min = this.currentIndex - 3;
        return min < 1 ? 1 : min;
      },
      maxRange() {
        const max = this.currentIndex + 3;
        return max > this.metadata.lastPage ? this.metadata.lastPage : max;
      },
      range() {
        const range = [];
        for (let i = this.minRange; i <= this.maxRange; i++) {
          range.push(i);
        }
        return range;
      }
    },
    methods: {
      changePage(page) {
        if (page >= this.minRange && page <= this.maxRange) {
          window.scrollTo(0,0);
          this.$emit('valueChanges', page);
        }
      }
    }
  }
</script>

<style lang="scss">
@import '~/assets/styles/global';
  .pagination {
    &__controls {
      display: flex;
      align-items: center;
      margin-top: 4rem;
      gap: 3rem;

      @include breakpoint(xs) {
        gap: 1rem;
      }
    }

    &__link {
      font-size: 1.25rem;
      list-style: none;
      user-select: none;
      width: fit-content;
      cursor: pointer;
      span {
        color: var(--data-color-dgray);
      }
      &:hover > span {
        color: var(--data-color-hover);
      }
      &-active {
        pointer-events: none;
        & > span {
          color: var(--data-color-black) !important;
        }
      }
    }

    &__control {
      transform: scale(.8);
    }

    &__pages {
      display: flex;
      gap: 1rem;

      @include breakpoint(xs) {
        gap: 0.5rem;
      }

      @include breakpoint(xxs) {
        gap: 0.25rem;
      }
    }
  }
</style>
