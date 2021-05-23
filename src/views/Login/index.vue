<template>
  <section class="PageLogin">
    <section class="LoginWrap">
      <section class="LoginLogo">
        <a href="javascript:;" class="">LOGIN</a>
      </section>
      <section class="LoginIntro">
        <h1 class="loginHeading">Thành viên đăng nhập</h1>
        <p class="loginDescription">Nếu bạn không phải ban quản trị của hệ thống vui lòng bỏ qua hành động này !.</p>
      </section>
      <section class="LoginBody">
        <div class="LoginBody_Content">
          <section class="LoginBody_Content__header"></section>
          <section class="LoginBody_Content__formData">
            <el-form
              ref="loginForm"
              class="LoginBody_Content__formData--form FormData"
              :model="loginForm"
              :rules="loginRules"
              @submit.prevent
              autocomplete="on"
            >

              <section class="FormData__FormGroup">
                <div class="FormData__FormInput">

                  <el-form-item prop="email">
                    <el-input
                      placeholder="Email"
                      type="text"
                      name="email"
                      ref="email"
                      tabindex="1"
                      autocomplete="off"
                      spellcheck="false"
                      :class="'FormData__FormControl'"
                      v-model="loginForm.email"
                    />
                    <div class="FormData__FormIcon">
                      <fa-icon icon="envelope" />
                    </div>
                  </el-form-item>

                </div>
              </section>

              <section class="FormData__FormGroup">
                <div class="FormData__FormInput">

                  <el-form-item prop="password">
                    <el-input
                      class="FormData__FormControl"
                      :key="passwordType"
                      ref="password"
                      v-model="loginForm.password"
                      :type="passwordType"
                      placeholder="Password"
                      name="password"
                      tabindex="2"
                      autocomplete="off"
                      spellcheck="false"
                      @keyup.native="checkCapslock"
                      @blur="casTooltip = false"
                      @keyup.enter.native="handleLogin"
                    />
                  </el-form-item>

                  <div class="FormData__FormIcon">
                    <fa-icon @click="togglePwd" :icon="passwordType === 'password' ? 'eye-slash' : 'eye'" />
                  </div>
                </div>
              </section>

              <section class="FormData__FormGroup">
                <div class="FormData__FormButton">
                  <button type="submit" class="FormData__FormSubmit" @click.prevent="handleLogin">Login</button>
                </div>
              </section>

              <section v-if="error.account" class="error">{{ error.account }}</section>

              <section class="FormData__FormGroup">
                <div class="FormDataForm__QuickLink">
                  <a href="" class="FormData__FormLink">Forgot password ?</a>
                  <a href="" class="FormData__FormLink">Register as a marchant</a>
                </div>
              </section>

            </el-form>
          </section>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
// Utils
import { validEmail } from '@/utils/validate';

// Store
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (! validEmail(value)) {
        callback(new Error("Please enter the correct email !"));
      } else { callback(); }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can't be less than 6 digits !"));
      } else { callback() }
    }
    return {
      error: {
        account: ''
      },
      loginForm: {
        email: 'admin.super@shop.com',
        password: '123456'
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (! this.loginForm.email) {
      this.$refs.email.focus();
    } else if (! this.loginForm.password) {
      this.$refs.password.focus();
    }
  },
  methods: {
    ...mapActions({
      'setisLoading': 'app/handleSetIsLoading',
      'login'       : 'user/login'
    }),
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z');
    },
    togglePwd() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.setisLoading(true);
          this.login(this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery });
            this.setisLoading(false);
          }).catch( eRes => {
            this.setisLoading(false);
            if (eRes.errors && eRes.errors.account && eRes.errors.account.length) {
              this.error.account = eRes.errors.account || '';
            } else {
              this.error.account = 'Login failed !';
            }
          });
        } return;
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
}
</script>
<style src='@/styles/app/login.css'></style>