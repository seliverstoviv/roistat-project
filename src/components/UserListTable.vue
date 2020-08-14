<template>
  <el-table
    :data="userList"
    border
    style="width: 100%;"
    row-key="name"
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="name"
      label="Имя"
      sortable>
    </el-table-column>
    <el-table-column
      prop="phone"
      label="Телефон"
      sortable>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    userList: {
      type: Array,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
