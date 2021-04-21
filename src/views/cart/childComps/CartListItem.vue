<template>
  <div>
    <div>{{ product }}</div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  name: 'CartListItem',
};
</script>

<style lang="less" scoped></style>
