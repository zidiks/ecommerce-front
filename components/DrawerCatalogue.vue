<template>
  <a-drawer
    placement="left"
    :closable="false"
    width="100%"
    @close="onClose"
    :visible="states[data._id]"
  >
    <nav class="drawer-catalogue">
      <div>
        <a-page-header
          :title="data.name.toUpperCase()"
          @back="onClose()"
        />
      </div>
      <div v-for="item of data.children" :key="item._id">
        <div @click="openChild(item._id)" v-if="item.children?.length" class="drawer-catalogue__item">
          <span class="drawer-catalogue__item__text">{{ item.name }}</span>
          <span class="drawer-catalogue__item__arrow">
                <span class="material-symbols-outlined">chevron_right</span>
          </span>
        </div>
        <div @click="onLinkClose()" v-else>
          <nuxt-link :to="`/products?category=${item._id}`" class="drawer-catalogue__item">
            <span class="drawer-catalogue__item__text">{{ item.name }}</span>
          </nuxt-link>
        </div>
        <DrawerCatalogue v-if="item.children?.length" :data="item"></DrawerCatalogue>
      </div>
    </nav>
  </a-drawer>
</template>

<script scoped>
  export default {
    props: ['data'],
    computed: {
      states() {
        return this.$store.state["mobile-catalogue"].treeNodeStates;
      },
    },
    methods: {
      onClose() {
        this.$store.commit('mobile-catalogue/closeNode', this.data._id);
      },
      onLinkClose() {
        this.$store.commit('mobile-catalogue/closeDrawer');
      },
      openChild(id) {
        this.$store.commit('mobile-catalogue/openNode', id);
      }
    },
    mounted() {
      console.log(this.data)
    }
  }
</script>
