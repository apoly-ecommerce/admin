<template>
  <form-action
    :name="formName"
    :size="'700px'"
    @close="handleCloseFormService"
    @action="handleActionForm"
  >

    <template v-slot:form-body>
      <section class="PopupForm__FormGroup">
        <label for="" class="FormLabel">
          <span class="FormLabel__title">Title</span>
          <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Title tooltip">
            <fa-icon icon="question-circle" />
          </a>
        </label>
        <input type="text" class="FormControl" autocomplete="off" spellcheck="false">
      </section>

      <section class="PopupForm__FormGroup">
        <label for="" class="FormLabel">
          <span class="FormLabel__title">Descriptions</span>
          <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Descriptions tooltip">
            <fa-icon icon="question-circle" />
          </a>
        </label>
        <input type="text" class="FormControl" autocomplete="off" spellcheck="false">
      </section>

      <section class="PopupForm__FormGroup">
        <label for="" class="FormLabel">
          <span class="FormLabel__title">Link</span>
          <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Link tooltip">
            <fa-icon icon="question-circle" />
          </a>
        </label>
        <input type="text" class="FormControl" autocomplete="off" spellcheck="false">
      </section>

      <section class="PopupForm__FormGroup">
        <label for="" class="FormLabel">
          <span class="FormLabel__title">Status</span>
          <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Link tooltip">
            <fa-icon icon="question-circle" />
          </a>
        </label>
        <select name="" class="FormControl">
          <option value="">Active</option>
          <option value="">Inactive</option>
        </select>
      </section>

      <section class="PopupForm__FormGroup">
        <label for="" class="FormLabel">
          <span class="FormLabel__title">Image Cover</span>
          <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Image cover">
            <fa-icon icon="question-circle" />
          </a>
        </label>
        <section class="FormDropImages">
          <template>

            <upload-images
              uploadMsg="Upload service images cover"
              maxError="Just allow upload 1 images"
              fileError="Image file only accepted"
              :max="1"
              @change="handleUploadImages"
            />

          </template>
        </section>
      </section>
    </template>

    <template v-slot:form-footer>
      <button type="submit" class="PopupForm__Save">
        <fa-icon class="PopupForm__SaveIcon" icon="save" />
        <span class="PopupForm_SaveLabel">Save</span>
      </button>
    </template>

  </form-action>
</template>

<script>
// Components @ > Components
import FormAction from '@/components/FormAction';
// Libraries
import UploadImages from 'vue-upload-drop-images';

export default {
  components: {
    FormAction,
    'upload-images': UploadImages
  },
  data() {
    return {
      formName: '',
      buttonName: 'Save'
    };
  },
  watch: {
    $route() {
      this.getFormName();
    }
  },
  created() {
    this.getFormName();
  },
  methods: {
    handleActionForm() {
      console.log('Handle action from city');
    },
    handleUploadImages(files) {
      console.log(files);
    },
    getFormName() {
      this.formName = this.$route.meta && this.$route.meta.title;
    },
    handleCloseFormService() {
      this.$router.push('/city');
    }
  }
}
</script>