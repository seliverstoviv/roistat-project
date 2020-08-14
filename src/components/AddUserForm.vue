<template>
  <div>
    <div class="toolbar-actions">
        <el-button @click="dialogVisible = true">Добавить</el-button>
    </div>
    <el-dialog
      title="Добавление пользователя"
      :visible.sync="dialogVisible"
      @closed="closeForm('ruleForm')"
      width="400px">
      <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm">
          <el-form-item label="Имя" prop="name">
            <el-input
              type="text"
              v-model="ruleForm.name">
            </el-input>
          </el-form-item>
          <el-form-item label="Телефон" prop="phone">
            <el-input
              type="text"
              v-mask="'+# (###) ### ## ##'"
              v-model="ruleForm.phone">
            </el-input>
          </el-form-item>
          <el-form-item label="Начальник" prop="bossId">
            <el-select v-model="ruleForm.bossId"
              placeholder="Выбор из списка"
              style="width: 100%; font-family: Arial, sans-serif;">
              <el-option
                v-for="(item,index) in userList"
                :key="'userItem '+ index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Сохранить</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    userList: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      ruleForm: {
        phone: '',
        name: '',
        bossId: '',
      },
      rules: {
        name: [
          { required: true, message: 'Необходимо заполнить имя', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: 'Телефон обязателен для заполнения', trigger: 'blur' },
        ],
        region: [
          { required: true, message: 'Телефон обязателен для заполнения', trigger: 'blur' },
        ],
      },
      dialogVisible: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('addUser', this.ruleForm);
          this.dialogVisible = false;
        }
      });
    },
    closeForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
