<template>
  <section class="PopupForm">
    <section class="PopupForm_Wrap" :style="`width: ${size}`">
      <section class="PopupForm_Content">

        <section class="PopupForm_FormBody" :key="key">

          <section class="PopupForm__header">
            <div class="PopupForm__name">{{ name }}</div>
            <button type="button" class="PopupForm__Btn PopupForm__Btn--close" @click="$emit('close')">
              <fa-icon icon="times" />
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
    }
  },
  computed: {
    key() { return changeToSlug(this.name); }
  }
}
</script>
<style src='@/styles/app/form-action.css'></style>