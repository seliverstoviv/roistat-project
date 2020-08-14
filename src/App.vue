<template>
  <div id="app">
    <div class="table-wrap">
      <add-user-form
        @addUser="saveUser($event)"
        :userList="userList"
        ></add-user-form>
      <user-list-table
        :userList="userListTree">
      </user-list-table>
    </div>
  </div>
</template>

<script>
import AddUserForm from '@/components/AddUserForm.vue';
import UserListTable from '@/components/UserListTable.vue';

export default {
  name: 'App',
  components: {
    AddUserForm,
    UserListTable,
  },
  data() {
    return {
      userList: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    saveUser(e) {
      const boss = this.userList.find((user) => user.id === e.bossId);
      const saveResult = {
        id: this.userList.length + 1,
        name: e.name,
        phone: e.phone,
        parentId: boss ? boss.id : '',
        level: boss ? boss.level + 1 : 1,
      };

      this.userList.push(saveResult);
      localStorage.setItem('userList', JSON.stringify(this.userList));
    },
    getUserList() {
      this.userList = JSON.parse(localStorage.getItem('userList')) || [];
    },
  },
  computed: {
    userListTree() {
      const userList = this.userList
        .map((el) => Object.assign(el, { children: [] }))
        .sort((a, b) => (a.level < b.level ? 1 : -1));

      const res = userList.slice();

      userList.forEach((selUser) => {
        res.forEach((item) => {
          if (selUser.parentId === item.id) {
            item.children.push(selUser);
          }
        });
      });

      return res.filter((node) => node.level === 1);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.toolbar-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}
.el-select-dropdown__list {
  font-family: Arial, sans-serif;
}
// Для autocomplete
.table-wrap{
  width: 500px;
  margin: auto;
}
</style>
