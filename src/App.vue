<template>
  <div id="app">
    <!-- <rsPp/> -->
    <el-dialog
      title="Добавление пользователя"
      :visible.sync="dialogVisible"
      width="30%">
      <div class="card-body">

        <!-- Имя и фамилия -->
        <div class="form-error-messages" v-if="errorForm.length !== 0">
          <ul class="error">
            <li
              v-for="error in errorForm"
              v-text="error"
              :key="error">
            </li>
          </ul>
        </div>
        <div class="form-row">
          <div class="col-label">
            <span>Имя:</span>
          </div>
          <div class="col-input">
            <el-input
              placeholder="Алексей Алексеевич"
              suffix-icon="el-icon-user-solid"
              v-model="formData.name">
            </el-input>
          </div>
        </div>

        <!-- Телефон -->

        <div class="form-row">
          <div class="col-label">
            <span>Телефон:</span>
          </div>
          <div class="col-input">
            <el-input
              placeholder="+7 (900) 000 00 00"
              suffix-icon="el-icon-phone"
              v-model="formData.phone"
              v-mask="'+# (###) ### ## ##'">
            </el-input>
          </div>
        </div>

        <!-- Выбор начальника -->

        <div class="form-row">
          <div class="col-label">
            <span>Начальник:</span>
          </div>
          <div class="col-input">
            <el-select
            v-model="formData.chief"
            placeholder="Начальник"
            clearable
            style="width: 100%; font-family: Arial, sans-serif">
              <el-option
                v-for="item in userList"
                :key="Math.random() + item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Отменить</el-button>
        <el-button type="primary" @click="saveUser()">Сохранить</el-button>
      </span>
    </el-dialog>
    <div class="table-wrap">
      <div class="toolbar-actions">
        <el-button @click="dialogVisible = true">Добавить</el-button>
      </div>
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
    </div>
  </div>
</template>

<script>
// import RoiStatTable from './components/Table.vue';
// import RsPp from './components/PopUp.vue';

export default {
  name: 'App',
  components: {
    // RsPp,
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.form-row{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .col-label {
    width: 30%;
    text-align: left;
  }
  .col-input {
    flex: auto;
  }
}
.toolbar-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}
// Для autocomplete
.my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .value {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .link {
        font-size: 12px;
        color: #b4b4b4;
    }
  }
}
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
