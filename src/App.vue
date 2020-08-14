<template>
  <div id="app">
    <div class="table-wrap">
      <add-user-form
        :userList="userList"
        ></add-user-form>
      <user-list-table
        :userList="userList">
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
      testa: '',
      dialogVisible: false,
      formData: {
        name: '',
        phone: '',
        сhief: '',
      },
      errorForm: [],
      userList: [],
      state1: '',
    };
  },
  created() {
    this.showLocalStorage();
  },
  methods: {
    // Все события по форме
    saveUser() {
      // Простая валидация формы
      // eslint-disable-next-line prefer-const
      let error = [];
      if (!this.formData.name) {
        error.push('Поле "Имя" обязательно для заполнения');
      }
      if (!this.formData.phone) {
        error.push('Поле "Телефон" обязательно для заполнения');
      }
      if (error.length > 0) {
        this.errorForm = error;
        return;
      }
      this.errorForm = [];
      const saveResult = {
        name: this.formData.name,
        phone: this.formData.phone,
        parent: null,
        children: [],
      };
      // Проверка формы на наличие пользователя с таким же именем или телефоном
      // Проверка на заполнение
      // Если выбран начальник, то находим начальника создаем ему children
      // и добавляем туда детей
      if (this.formData.chief) {
        for (let i = 0; i < this.userList.length; i += 1) {
          if (this.userList[i].name === this.formData.chief) {
            this.userList[i].children.push(saveResult);
          }
        }
      } else {
        this.userList.push(saveResult);
      }
      localStorage.setItem('userList', JSON.stringify(this.userList));
      this.dialogVisible = false;
      this.clearForm();
    },
    showLocalStorage() {
      if (localStorage.getItem('userList')) {
        this.userList = JSON.parse(localStorage.getItem('userList'));
      } else {
        this.userList = [];
      }
    },
    clearForm() {
      this.formData.name = '';
      this.formData.phone = '';
      this.formData.chief = '';
    },
    // TODO: Разработать модель дерева на > 2 в глубину
    // Новая модель дерева;
  },
  computed: {
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
// Для autocomplete
.table-wrap{
  width: 500px;
  margin: auto;
}
.form-error-messages{
  margin-bottom: 20px;
}
.error {
  list-style: none;
  margin: 0;
  padding: 0;
  color: red;
}
</style>
