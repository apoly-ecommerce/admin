<template>
  <form-action
    :name="formName"
    :size="'800px'"
    @close="handleCloseFormRole"
  >

    <template v-slot:form-body>
      <el-form
        ref="roleForm"
        :model="roleForm"
        :rules="roleRules"
        @submit.prevent
        autocomplete="on"
      >
        <el-row :gutter="5">
          <el-col :span="merchant_user ? 16 : 8" class="p-1">
            <el-form-item prop="name">
              <label for="name" class="FormLabel">
                <span class="FormLabel__title">Name</span>
                <el-tooltip class="item" effect="dark" content="The title of the user role !" placement="top">
                  <fa-icon icon="question-circle" />
                </el-tooltip>
              </label>
              <el-input
                placeholder="Title of the user role"
                type="text"
                name="name"
                ref="name"
                tabindex="1"
                autocomplete="off"
                spellcheck="false"
                id="name"
                v-model="roleForm.name"
              />
            </el-form-item>
          </el-col>

          <el-col v-if="!merchant_user" :span="8" class="p-1">
            <el-form-item prop="public">
              <label for="public" class="FormLabel">
                <span class="FormLabel__title">Role type</span>
                <el-tooltip class="item" effect="dark" content="Platform and Merchant. The role type platform only available for the main platform user, a merchant can't use this role. The Merchant role type will available when a merchant will add a new user." placement="top">
                  <fa-icon icon="question-circle" />
                </el-tooltip>
              </label>
              <el-select
                v-model="roleForm.public"
                @change="handleChangeRoleType"
                placeholder="Select"
                id="public"
                class="w-100"
                tabindex="2"
              >
                <el-option label="Platform" value="0" />
                <el-option label="Merchant" value="1" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8" class="p-1">
            <el-form-item prop="level">
               <label for="level" class="FormLabel">
                <span class="FormLabel__title">Role level</span>
                <el-tooltip class="item" effect="dark" content="Role level will be use determine who can control who. Example: An user with role level 2 can't modify any the user with role level 1. Keep emty if the role is for end level users." placement="top">
                  <fa-icon icon="question-circle" />
                </el-tooltip>
                <small v-if="accessLevel" class="p-2">(Between {{ accessLevel }} and 99)</small>
              </label>
              <el-input-number class="w-100"
                v-model="roleForm.level"
                size="medium"
                :min="accessLevel"
                :max="99"
                ref="level"
                tabindex="3"
                id="level"
              />
              <div v-if="roleError.level_error" class="el-form-item__error">{{ roleError.level_error }}</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" class="p-1">
            <el-form-item prop="description">
              <label for="description" class="FormLabel">
                <span class="FormLabel__title">Description</span>
              </label>
              <el-input
                type="textarea"
                ref="description"
                placeholder="Description of rule"
                v-model="roleForm.description"
                maxlength="100"
                spellcheck="false"
                id="description"
                show-word-limit
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" class="p-1">
            <section class="PopupForm__FormGroup">
              <table class="TableWrap" id="TableWrap-Heading">
                <thead>
                  <tr>
                    <th>
                      <label for="modules" class="with-help">Modules</label>
                      <el-tooltip class="item" effect="dark" content="Enable the module to set permission for the module." placement="top">
                        <fa-icon icon="question-circle" />
                      </el-tooltip>
                    </th>
                    <th>
                      <label for="permisisons" class="with-help">Permissions</label>
                      <el-tooltip class="item" effect="dark" content="Set role permissions very carefully. Choose the 'Role Type' to get approperit modules." placement="top">
                        <fa-icon icon="question-circle" />
                      </el-tooltip>
                    </th>
                  </tr>
                </thead>
              </table>
              <div class="TableWrap" id="TableWrap-permissions">
                <div class="TableWrap_TableBody">
                  <div
                    v-for="(_module_, index) in handleModuleAllowForRole"
                    :key="index"
                    class="TableWrap_TableContent"
                  >
                    <template>
                      <div class="TableContent__Row TableContent__button">
                        <div class="TableForm__FormGroup">
                          <div class="TableForm__AddonGroup">
                            <el-tooltip class="item" effect="dark" :content="getTooltipHelp(_module_.name, _module_.access)" placement="top">
                              <fa-icon icon="question-circle" />
                            </el-tooltip>
                          </div>
                          <label :for="_module_.name" class="d-block iCheckbox_line-pick">
                            <input @change.stop="handleSelectAllPermission" :id="_module_.name" type="checkbox">
                            <span>{{ _module_.name }}</span>
                          </label>
                        </div>
                      </div>

                      <div
                        v-for="(permission, _index_) in _module_.permissions"
                        :key="_index_"
                        class="TableContent__Row TableContent__option" :class="orderOption(_index_)">
                        <label :for="permission.name +'_'+ permission.id" class="d-block checkbox">
                          <input :value="permission.id" class="permission_item" @change.stop="handleSelectItemPermission" :data-module="_module_.name" type="checkbox" :id="permission.name +'_'+ permission.id">
                          <span>{{ permission.name }}</span>
                        </label>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </section>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:form-footer>
      <button @click.prevent="handleAddNewRole" type="button" class="PopupForm__Save">
        <fa-icon class="PopupForm__SaveIcon" icon="save" />
        <span class="PopupForm_SaveLabel">Save</span>
      </button>
    </template>

  </form-action>
</template>

<script>
// Components @ > *
import FormAction from '@/components/FormAction';
// Libraties
import UploadImages from 'vue-upload-drop-images';
// Store
import { mapGetters, mapActions } from 'vuex';
// Validations
import { roleRules } from '@/validations';
// Helpers
import { formatModuleAccess } from '@/helpers';

import { Message } from 'element-ui';

const defaultRole = {
  name: '',
  public: '0',
  level: null,
  description: '',
  permissions: [],
};

const defaultError = {
  level_error: ''
};

export default {
  components: {
    FormAction,
    'upload-images': UploadImages,
  },
  data() {
    return {
      roleForm: Object.assign({}, defaultRole),
      roleError: Object.assign({}, defaultError),
      formName: '',
      buttonName: 'Save',
      roleRules: roleRules
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
  computed: {
    ...mapGetters({
      'role_permissions': 'user/getRolePermissions',
      'merchant_user': 'user/get_merchant_user',
      'accessLevel': 'user/getAccessLevel',
      'modulesApp': 'app/getModulesApp',
      'role': 'user/getRole',
    }),
     handleModuleAllowForRole() {
      let moduleAccess = [];
      if (this.role.id === 3) { this.roleForm.public = '1' }
      this.modulesApp.forEach(module => {
        let access_level = module.access.toLowerCase();
        if (access_level === 'common' || access_level === 'merchant' && this.merchant_user ||
        (this.role) &&
        (
          (this.role.public === 1 && 'merchant' === access_level) ||
          (this.role.id     === 3 && 'merchant' === access_level) ||
          (this.role.public === 0 && 'platform' === access_level && this.role.id != 3)
        )
      ) { moduleAccess.push(module) }
      });
      return moduleAccess;
    }
  },
  methods: {
    ...mapActions({
      'setisLoading': 'app/handleSetIsLoading',
      'addRole': 'role/addRole'
    }),
    handleSelectItemPermission(e) {
      let permissionEl  = e.target;
      let moduleName    = permissionEl.getAttribute(['data-module']);
      let moduleEl      = document.getElementById(moduleName);
      let permissionsEl = document.querySelectorAll("[data-module='"+moduleName+"']");
      let totalSelect = 0;
      for (let i=0 ; i<permissionsEl.length; i++) {
        if (permissionsEl[i].checked) {
          totalSelect ++ ;
        }
      }
      if (totalSelect === permissionsEl.length) {
        moduleEl.checked = true;
      } else {
        moduleEl.checked = false;
      }
    },
    handleSelectAllPermission(e) {
      let moduleEl    = e.target;
      let moduleName  = moduleEl.getAttribute('id');
      let permissions = document.querySelectorAll("[data-module='"+moduleName+"']");
      if (moduleEl.checked) {
        permissions.forEach(item => {
          item.checked = true;
        });
      } else {
        permissions.forEach(item => {
          item.checked = false;
        });
      }
    },
    orderOption(_index_) {
      return `OptionIndex_${_index_ + 1}`;
    },
    handleChangeRoleType(val) {
      this.role.public = +val;
    },
    getFormName() {
      this.formName = this.$route.meta && this.$route.meta.title;
    },
    back(router = '/roles') {
      this.$router.push(router);
    },
    handleCloseFormRole() {
      this.back();
    },
    getTooltipHelp(moduleName, moduleAccess) {
      return `Tất cả người dùng dưới vai trò này sẽ có thể thực hiện các hành động cụ thể để quản lý ${moduleName} ${formatModuleAccess(moduleAccess)}`;
    },
    handleGetListPermission() {
      let listPermisisonsEl = document.querySelectorAll('.permission_item');
      let listPermisisonsSelected = [];
      listPermisisonsEl.forEach(item => {
        if (item.checked) {
          listPermisisonsSelected.push(+item.value);
        }
      });
      this.roleForm.permissions = listPermisisonsSelected;
    },
    resetRoleForm() {
      this.roleForm.name   = '';
      this.roleForm.public = '0';
      this.roleForm.level  = null;
      this.roleForm.description = '';
      this.roleForm.permissions = [];
    },
    handleAddNewRole() {
      this.$refs.roleForm.validate(valid => {
        this.handleGetListPermission();
        if (valid) {
          let error = true;
          if (this.roleForm.level < this.accessLevel) {
            error = true;
            this.roleError.level_error = `Giá trị level phải lớn hơn hoặc bằng ${this.accessLevel}`;
          } else {
            error = false;
            this.roleError.level_error = '';
          }
          if(!error) {
            this.setisLoading(true);

            this.addRole(this.roleForm).then(res => {
              Message({
                message: res.success,
                type: 'success',
                duration: 5 * 1000
              });
              this.setisLoading(false);
              this.resetRoleForm();
              this.back();
            }).catch(error => {
              console.error(error);
              this.setisLoading(false);
            });

          }
        } return;
      });
    },
  }
}
</script>

<style>
  .TableWrap {
    color: #000;
    width: 100%;
  }
  #TableWrap-Heading {
    border: 1px solid #dcdfe6;
    margin-bottom: 5px;
  }
  #TableWrap-Heading thead tr th {
    padding: 10px 10px;
    color: #5a5959;
    font-weight: 500;
    text-transform: uppercase;
    font-size: .8rem;
    letter-spacing: 1px;
  }
  #TableWrap-Heading thead tr th a {
    color: #646464;
  }
  #TableWrap-Heading thead tr th:first-child {
    width: 25.3%;
    border-right: 1px solid #dcdfe6;
  }
  #TableWrap-Heading thead tr th:nth-child(2) {
    width: 85%;
  }
  #TableWrap-permissions .TableWrap_TableContent {
    display: flex;
    justify-content: flex-start;
  }
  #TableWrap-permissions .TableContent__button {
    width: 25.1%;
  }
  #TableWrap-permissions .TableContent__Row {
    vertical-align: middle;
    padding-bottom: 5px;
  }
  #TableWrap-permissions .TableContent__option {
    padding-right: 7px;
  }
  #TableWrap-permissions .TableContent__option.OptionIndex_1 {
    padding-left: 5px;
  }
  #TableWrap-permissions .TableContent__option .checkbox {
    border: 1px solid #dcdfe6;
    padding: 4.5px 10px;
    cursor: pointer;
  }
  #TableWrap-permissions .TableForm__FormGroup {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: .8rem;
    text-transform: uppercase;
    color: #3f3d3d;
  }
  #TableWrap-permissions .TableForm__FormGroup .TableForm__AddonGroup {
    padding: 7px 10px;
    border-right: 1px solid #dcdfe6;
    border: 1px solid #dcdfe6;
  }
  #TableWrap-permissions .TableForm__FormGroup .iCheckbox_line-pick {
    padding: 6.8px 10px;
    width: 100%;
    background-color: #797c7d;
    color: #fff;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
    border: 1px solid #797c7d;
  }
  #TableWrap-permissions .TableContent__button .el-checkbox,
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #fff;
  }
  #TableWrap-permissions .el-checkbox .el-checkbox__label {
    font-size: .8rem;
  }
</style>