<template>
  <section class="PopupForm">
    <section class="PopupForm_Wrap" :style="`width: ${size}`">
      <div v-show="isFormLoading" class="PopupForm__Loader">
        <div class="lds-facebook"><div></div><div></div><div></div></div>
        <span>Đang tải dữ liệu ...</span>
      </div>
      <section v-show="!isFormLoading" class="PopupForm_Content">
        <section class="PopupForm_FormBody" :key="key">
          <section class="PopupForm__header">
            <div class="PopupForm__name">{{ name }}</div>
            <button type="button" class="PopupForm__Btn PopupForm__Btn--close" @click="$emit('close')">
              <i class="fas fa-times"></i>
            </button>
          </section>
          <section class="PopupForm__body">
            <slot name="form-body" />
          </section>
          <section class="PopupForm__footer">
            <slot name="form-footer" />
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
// Helpers
import { changeToSlug } from '@/helpers';

export default {
  name: 'form-action',
  props: {
    name: {
      type: String,
      require: true
    },
    size: {
      type: String,
      default: '500px'
    },
    isFormLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    key() { return changeToSlug(this.name); }
  }
}
</script>
<style src='@/styles/app/form-action.css'></style>