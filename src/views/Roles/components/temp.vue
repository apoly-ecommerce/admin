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
                <el-tooltip class="item" effect="dark" placement="top" content="The title of the user role !">
                  <i class="fas fa-question-circle"></i>
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
                  <i class="fas fa-question-circle"></i>
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
                  <i class="fas fa-question-circle"></i>
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

        <el-row :gutter="5">
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
                maxlength="500"
                spellcheck="false"
                id="description"
                show-word-limit
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="24" class="p-1">
            <section class="PopupForm__FormGroup">
              <table class="TableWrap" id="TableWrap-Heading">
                <thead>
                  <tr>
                    <th>
                      <label for="modules" class="with-help">Modules</label>
                      <el-tooltip class="item" effect="dark" content="Enable the module to set permission for the module." placement="top">
                        <i class="fas fa-question-circle"></i>
                      </el-tooltip>
                    </th>
                    <th>
                      <label for="permisisons" class="with-help">Permissions</label>
                      <el-tooltip class="item" effect="dark" content="Set role permissions very carefully. Choose the 'Role Type' to get approperit modules." placement="top">
                        <i class="fas fa-question-circle"></i>
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
                              <i class="fas fa-question-circle"></i>
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
      <el-button v-if="formName === 'Add role'" type="primary" size="mini" @click.prevent="handleActionFormRole(handleAddRole)">
        <i class="PopupForm__SaveIcon fas fa-save"></i>
        <span class="PopupForm_SaveLabel">{{ formName }}</span>
      </el-button>
      <el-button v-else type="primary" size="mini" @click.prevent="handleActionFormRole(handleUpdateRole)">
        <i class="PopupForm__SaveIcon fas fa-save"></i>
        <span class="PopupForm_SaveLabel">{{ formName }}</span>
      </el-button>
    </template>

  </form-action>
</template>

<script>
// Components @ > *
import FormAction from '@/components/FormAction';
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
  },
  data() {
    return {
      roleForm: Object.assign({}, defaultRole),
      roleError: Object.assign({}, defaultError),
      formName: '',
      roleRules: roleRules,
      roleId: this.$route.params.id,
      isUpdate: false
    };
  },
  watch: {
    $route(to, from) {
      this.getFormName();
      if (to.params.id) {
        // console.log('handle get role by id in watch !');
        this.getRoleById(to.params.id);
      }
    }
  },
  created() {
    this.getFormName();
    if (this.roleId) {
      // console.log('get role by id in create()');
      this.getRoleById(this.roleId);
    }
  },
  computed: {
    ...mapGetters({
      'merchant_user': 'user/get_merchant_user',
      'accessLevel': 'user/getAccessLevel',
      'modules': 'module/getModules',
      'role': 'user/getRole',
    }),
     handleModuleAllowForRole() {
      let moduleAccess = [];
      if (this.role.id === 3) { this.roleForm.public = '1' }
      // console.log(this.modules);
      this.modules.forEach(module => {
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
      'addRole': 'role/addRole',
      'updateRole': 'role/updateRole',
      'fetchRoleById': 'role/fetchRoleById'
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
      console.log(this.formName);
    },
    back(router = '/roles') {
      this.$router.push(router);
    },
    handleCloseFormRole() {
      this.back();
    },
    getTooltipHelp(moduleName, moduleAccess) {
      return `All users under this role will be able to perform specific actions for management ${moduleName} ${formatModuleAccess(moduleAccess)}`;
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
      console.log(this.roleForm.permissions);
    },
    resetRoleForm() {
      this.roleForm.name   = '';
      this.roleForm.public = '0';
      this.roleForm.level  = null;
      this.roleForm.description = '';
      this.roleForm.permissions = [];
    },
    handleAppendPermissionsWasSave(permissionsIds) {
      let listPermisisonsEl = document.querySelectorAll('.permission_item');
      listPermisisonsEl.forEach(item => {
        permissionsIds.forEach(id => {
          if (+item.value === id) {
            item.checked = true;
          }
        })
      });
      let rowModules = document.querySelectorAll(".TableWrap_TableContent");
      rowModules.forEach(row => {
        let numRowChildrenChecked = 0;
        for (let i = 1; i < row.children.length ; i++) {
          if (row.children[i].children[0].children[0].checked) {
            numRowChildrenChecked ++;
          }
          if (numRowChildrenChecked === row.children.length-1) {
            (row.children[0].children[0].children[1].children[0]).checked = true;
          }
        }
      });
    },
    getRoleById(roleId) {
      // this.setisLoading(true);
      this.isUpdate = true;
      this.fetchRoleById(roleId).then(res => {
        // this.setisLoading(false);
        let { role, role_permissions } = res;
        this.roleForm.name   = role.name;

        this.roleForm.public = role.public.toString();
        this.roleForm.level  = role.level;
        this.roleForm.description = role.description;
        let permissionsIds = role_permissions.map(item => item.id);
        this.handleAppendPermissionsWasSave(permissionsIds);
      }).catch(error => {
        console.error(error);
        this.$message.error('Role không tồn tại !');
        // this.setisLoading(false);
      });
    },
    handleActionFormRole(callback) {
      this.$refs.roleForm.validate(valid => {
        this.handleGetListPermission();
        if (valid) {
          let error = true;
          if (this.roleForm.level < this.accessLevel) {
            error = true;
            this.roleError.level_error = `Level value must be greater than or equal to ${this.accessLevel}`;
          } else {
            error = false;
            this.roleError.level_error = '';
          }
          if(!error) {
            // this.setisLoading(true);
            callback().then(res => {
              console.log(res);
              Message({
                message: res.success,
                type: 'success',
                duration: 5 * 1000
              });
              // this.setisLoading(false);
              this.resetRoleForm();
              this.back();
            }).catch(error => {
              console.error(error.data.errors);
              Message({
                message: error.data.errors.name[0],
                type: 'error',
                duration: 5 * 1000
              });
              // this.setisLoading(false);
            });
          }
        } return;
      });
    },
    handleAddRole() {
      return this.addRole(this.roleForm);
    },
    handleUpdateRole() {
      return this.updateRole({ roleData: this.roleForm, roleId: this.roleId });
    }
  }
}
</script>