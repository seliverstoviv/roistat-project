<template>
  <div class="modal fade shadow">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>
            {{ headerText }}
          </h5>
          <button @click="$emit('input', false)">
            <span>×</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            @click="$emit('input', false)"
            class="cancel-btn">
            Отмена
          </button>
          <button
            class="confirm-btn"
            @click="$emit('save')"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

export default {
  props: {
    headerText: {
      type: String,
      default: 'Какой-то заголовок',
    },
  },
};
</script>
<style lang="scss" scoped>
.modal{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  transition: .2s cubic-bezier(.25,.8,.25,1),z-index 1ms;
  height: 100%;
  z-index: 100;
  justify-content: center;
  align-items: center;
  display: flex;
  outline: 0;
  opacity: 0.46;
  background-color: rgb(33, 33, 33);
  .modal-dialog{
    max-width: 500px;
    background: white;
    z-index: 101;
    position: relative;
  }
}
</style>
