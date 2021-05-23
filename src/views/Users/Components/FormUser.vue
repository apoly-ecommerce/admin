<template>
  <form-action
    :name="formName"
    :size="'900px'"
    @close="handleCloseFormUser"
    @action="handleActionForm"
  >

    <template v-slot:form-body>

      <section class="PopupForm__FormGroup">
        <b-row class="m-0">
          <b-col md="8" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Full name</span>
              <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Title tooltip">
                <i>*</i>
              </a>
            </label>
            <input type="text" class="FormControl" placeholder="Enter full name" autocomplete="off" spellcheck="false">
          </b-col>

          <b-col md="4" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Status</span>
              <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Title tooltip">
                <i>*</i>
              </a>
            </label>
            <select name="" class="FormControl">
              <option disabled>Select</option>
              <option value="">Active</option>
              <option value="">Inactive</option>
            </select>
          </b-col>
        </b-row>
      </section>

      <section class="PopupForm__FormGroup">
        <b-row class="m-0">
          <b-col md="6" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Nice name</span>
              <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Title tooltip">
                <i>*</i>
              </a>
            </label>
            <input type="text" class="FormControl" placeholder="Enter nice name" autocomplete="off" spellcheck="false">
          </b-col>

          <b-col md="6" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Email address</span>
              <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Title tooltip">
                <i>*</i>
              </a>
            </label>
            <input type="text" class="FormControl" placeholder="Enter a valid email address" autocomplete="off" spellcheck="false">
          </b-col>
        </b-row>
      </section>

      <section class="PopupForm__FormGroup">
        <b-row class="m-0">
          <b-col md="6" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Password</span>
              <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Title tooltip">
                <i>*</i>
              </a>
            </label>
            <input type="text" class="FormControl" placeholder="Password" autocomplete="off" spellcheck="false">
          </b-col>

          <b-col md="6" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Confirm Passpord</span>
              <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Title tooltip">
                <i>*</i>
              </a>
            </label>
            <input type="text" class="FormControl" placeholder="Confirm password" autocomplete="off" spellcheck="false">
          </b-col>
        </b-row>
      </section>

      <section class="PopupForm__FormGroup">
        <b-row class="m-0">
          <b-col md="4" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Role</span>
              <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Title tooltip">
                <i>*</i>
              </a>
            </label>
            <template>
              <el-select v-model="countrySelected" filterable placeholder="Select">
                <el-option
                  v-for="country in countries"
                  :key="country.value"
                  :label="country.label"
                  :value="country.value">
                </el-option>
              </el-select>
            </template>
          </b-col>

          <b-col md="4" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Date of birthday</span>
              <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Title tooltip">
                <i>*</i>
              </a>
            </label>
            <template>
              <b-form-datepicker
                id="example-datepicker"
                placeholder="Date of birth"
                style="padding: 0; border-radius: 0;"
                class="FormControl"
              />
            </template>
          </b-col>

          <b-col md="4" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Gender</span>
              <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Title tooltip">
                <i>*</i>
              </a>
            </label>
            <select name="" class="FormControl">
              <option disabled>Select</option>
              <option value="">Male</option>
              <option value="">Female</option>
              <option value="">Other</option>
            </select>
          </b-col>
        </b-row>
      </section>

      <section class="PopupForm__FormGroup">
        <label for="" class="FormLabel">
          <span class="FormLabel__title">Descriptions</span>
          <a href="javascript:;" class="FormLabel__tooltip" v-b-tooltip.hover title="Descriptions tooltip">
            <fa-icon icon="question-circle" />
          </a>
        </label>
        <textarea name="" class="FormControl" placeholder="Describe you ?" style="height: 50px" id="" spellcheck="false"></textarea>
      </section>

      <section class="PopupForm__FormGroup">
        <b-row class="m-0">
          <b-col md="6" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Address line 1</span>
            </label>
            <input type="text" class="FormControl" placeholder="Address line 1" autocomplete="off" spellcheck="false">
          </b-col>

          <b-col md="6" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Address line 2</span>
            </label>
            <input type="text" class="FormControl" placeholder="Address line 2" autocomplete="off" spellcheck="false">
          </b-col>
        </b-row>
      </section>

      <section class="PopupForm__FormGroup">
        <b-row class="m-0">
          <b-col md="4" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">City</span>
            </label>
            <input type="text" class="FormControl" placeholder="City" autocomplete="off" spellcheck="false">
          </b-col>

          <b-col md="4" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Zip/Postal code</span>
            </label>
            <input type="text" class="FormControl" placeholder="Zip/Postal code" autocomplete="off" spellcheck="false">
          </b-col>

          <b-col md="4" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Phone</span>
            </label>
            <input type="text" class="FormControl" placeholder="Phone number" autocomplete="off" spellcheck="false">
          </b-col>
        </b-row>
      </section>

      <section class="PopupForm__FormGroup">
        <b-row class="m-0">
          <b-col md="6" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Country</span>
            </label>
            <template>
              <el-select
                v-model="countrySelected"
                noDataText="There are no country !"
                noMatchText="No country found !"
                @change="handleChangeCountry"
                placeholder="Select"
                filterable
              >
                <el-option
                  v-for="country in countries"
                  :key="country.id"
                  :label="country.name"
                  :value="country.id">
                </el-option>
              </el-select>
            </template>
          </b-col>

          <b-col md="6" class="p-1">
            <label for="" class="FormLabel">
              <span class="FormLabel__title">Province</span>
            </label>
            <template>
              <el-select
                v-model="stateSelected"
                noDataText="There are no provinces !"
                noMatchText="No province found !"
                filterable
                placeholder="Select"
              >
                <el-option
                  v-for="state in states"
                  :key="state.id"
                  :label="state.name"
                  :value="state.id">
                </el-option>
              </el-select>
            </template>
          </b-col>
        </b-row>
      </section>

      <section class="PopupForm__FormGroup">
        <label for="" class="FormLabel">
          <span class="FormLabel__title">Avatar </span>
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
// Libraties
import UploadImages from 'vue-upload-drop-images';
// Validations
import { userRules } from '@/validations';
l
// Store
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    FormAction,
    'upload-images': UploadImages
  },
  data() {
    return {
      formName: '',
      buttonName: 'Save',
      countrySelected: '',
      stateSelected: '',
      states: [],
      userForm: {
        full_name: '',
        status: '',
        nice_name: '',
        email: '',
        password: '',
        re_password: '',
        role: '',
        dob: '',
        gender: '',
        description: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        zip_code: '',
        phone: '',
        country_id: '',
        state_id: '',
        image: ''
      },
      userRoles: userRules
    };
  },
  watch: {
    $route() {
      this.getFormName();
    }
  },
  created() {
    this.getAllCountries();
    this.getFormName();
  },
  computed: {
    ...mapGetters({
      'countries': 'country/getAllCountries'
    }),
  },
  methods: {
    ...mapActions({
      'setisLoading'    : 'app/handleSetIsLoading',
      'getAllCountries' : 'country/getAllCountries',
      'getStatesByCountryId' : 'state/getStatesByCountryId'
    }),
    handleActionForm() {
      console.log('Handle action from user !');
    },
    handleUploadImages(files) {
      console.log(files);
    },
    getFormName() {
      this.formName = this.$route.meta && this.$route.meta.title;
    },
    handleCloseFormUser() {
      this.$router.push('/users');
    },
    handleChangeCountry(countryId) {
      this.setisLoading(true);
      this.getStatesByCountryId(countryId).then(res => {
        this.states = res.data;
        if (res.data && res.data.length) {
          this.stateSelected = res.data[0].name;
        }
        this.setisLoading(false);
      }).catch(error => {
        console.log(error);
        this.setisLoading(false);
      })
    }
  }
}
</script>