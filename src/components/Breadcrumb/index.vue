<template>
  <section v-if="levelList && levelList.length > 1" class="AppBreadcrumb">
    <b-breadcrumb>
      <b-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="index"
        :to="item.href"
        :disabled="currentPage(item.href)"
      >{{ item.text }}</b-breadcrumb-item>
    </b-breadcrumb>
  </section>
</template>

<script>
export default {
  name: 'breadcrumb',
  data() {
    return {
      levelList: []
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      const first = matched[0];
      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(matched);
      }
      this.levelList = (matched.filter(item => item.meta && item.meta.title && !item.meta.breadcrumb))
                        .map(item => { return { text: item.meta.title, href: item.path }; });
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) return false;
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
    },
    currentPage(href) {
      return href === this.levelList[this.levelList.length - 1].href;
    }
  }
}
</script>
<style>
  .AppBreadcrumb {
    margin-bottom: 15px;
  }
  .AppBreadcrumb .breadcrumb {
    margin: 0;
  }
  .AppBreadcrumb .breadcrumb .breadcrumb-item a {
    display: block;
    color: var(--second-color);
    border: 1px solid var(--primary-color);
    padding: 3px 5px;
    font-size: .9rem;
    position: relative;
  }
  .AppBreadcrumb .breadcrumb .breadcrumb-item a.disabled {
    background-color: var(--header-bg);
    color: var(--app-color);
    border-color: var(--header-bg);
    padding-left: 15px;
  }
  .AppBreadcrumb .breadcrumb .breadcrumb-item a.disabled::before {
    content: '';
    width: 6px;
    height: 7px;
    display: block;
    background: #fff;
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 5px;
    float: none;
    transform: translateY(-50%);
  }
  .AppBreadcrumb .breadcrumb-item + .breadcrumb-item::before {
    content: '';
  }
</style>