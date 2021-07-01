<template>
  <form-action
    :name="formName"
    :size="'800px'"
    :isFormLoading="isFormLoading"
    @close="handleCloseForm"
  >
    <template v-slot:form-body>
      <el-form
        ref="formData"
        :model="formData"
        :rules="formRules"
        @submit.prevent
      >
        <el-row :gutter="5">
          <el-col :span="userAuth.merchant_user ? 16 : 8" class="p-1">
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
                v-model="formData.name"
              />
              <div v-if="formError.name" class="el-form-item__error">{{ formError.name }}</div>
            </el-form-item>
          </el-col>

          <el-col v-if="!userAuth.merchant_user" :span="8" class="p-1">
            <el-form-item prop="public">
              <label for="public" class="FormLabel">
                <span class="FormLabel__title">Role type</span>
                <el-tooltip class="item" effect="dark" content="Platform and Merchant. The role type platform only available for the main platform user, a merchant can't use this role. The Merchant role type will available when a merchant will add a new user." placement="top">
                  <i class="fas fa-question-circle"></i>
                </el-tooltip>
              </label>
              <el-select
                v-model="formData.public"
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
                <small v-if="userAuth.accessLevel" class="p-2">(Between {{ userAuth.accessLevel }} and 99)</small>
              </label>
              <el-input-number class="w-100"
                v-model="formData.level"
                size="medium"
                :min="userAuth.accessLevel"
                :max="99"
                ref="level"
                tabindex="3"
                id="level"
              />
              <div v-if="formError.level" class="el-form-item__error">{{ formError.level }}</div>
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
                v-model="formData.description"
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
                    v-show="_module_.is"
                    class="TableWrap_TableContent"
                  >
                    <template>
                      <div class="TableContent__Row TableContent__button">
                        <div class="TableForm__FormGroup">
                          <div class="TableForm__AddonGroup">
                            <el-tooltip class="item" effect="dark" :content="getTooltipHelp(_module_.module.name, _module_.module.access)" placement="top">
                              <i class="fas fa-question-circle"></i>
                            </el-tooltip>
                          </div>
                          <label :for="_module_.module.name" class="d-block iCheckbox_line-pick">
                            <input @change.stop="handleSelectAllPermission" :id="_module_.module.name" type="checkbox">
                            <span>{{ _module_.module.name }}</span>
                          </label>
                        </div>
                      </div>

                      <div
                        v-for="(permission, index_pms) in _module_.module.permissions"
                        :key="index_pms"
                        class="TableContent__Row TableContent__option" :class="orderOption(index_pms)"
                      >
                        <label :for="permission.name +'_'+ permission.id" class="d-block checkbox">
                          <input :value="permission.id" class="permission_item" @change.stop="handleSelectItemPermission" :data-module="_module_.module.name" type="checkbox" :id="permission.name +'_'+ permission.id">
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
      <el-button v-if="!roleId" type="primary" size="mini" @click.prevent="handleActionForm(handleAdd)">
        <i class="PopupForm__SaveIcon fas fa-save"></i>
        <span class="PopupForm_SaveLabel">Save</span>
      </el-button>
      <el-button v-else type="primary" size="mini" @click.prevent="handleActionForm(handleUpdate)">
        <i class="PopupForm__SaveIcon fas fa-save"></i>
        <span class="PopupForm_SaveLabel">Update</span>
      </el-button>
    </template>
  </form-action>
</template>

<script>
import FormAction from '@/components/FormAction';
import { mapGetters, mapActions } from 'vuex';
import { roleRules } from '@/validations';
import { formatModuleAccess } from '@/helpers';
import { Message } from 'element-ui';

const defaultFormData = {
  name: '',
  public: '0',
  level: null,
  description: '',
  permissions: [],
};

const defaultFormError = {
  name: '',
  level: ''
};

export default {
  components: {
    FormAction,
  },
  data() {
    return {
      formName: '',
      formData: {...defaultFormData},
      formError: {...defaultFormError},
      formRules: roleRules,
      roleId: this.$route.params.id,
      isFormLoading: false,
      modules: [],
      role: {},
      permissionsIds: null,
      moduleAccess: [],
      publicId: ''
    };
  },
  watch: {
    $route(to, from) {
      this.roleId = to.params.id;
      if (to.name !== 'list-role') {
        this.formSetup();
      }
    },
    public: (val) => {
      console.log(val);
    }
  },
  created() {
    this.formSetup();
  },
  computed: {
    ...mapGetters({
      'userAuth': 'auth/getUserAuth'
    }),
     handleModuleAllowForRole() {
      let moduleAccess = [];
      if (this.role.id === 3) { this.formData.public = '1' }
      this.modules.forEach(module => {
        let access_level = module.access.toLowerCase();
        if (access_level === 'common' || access_level === 'merchant' && this.userAuth.merchant_user ||
        (this.role) &&
        (
          (this.publicId === 1 && 'merchant' === access_level) ||
          (this.role.id     === 3 && 'merchant' === access_level) ||
          (this.publicId === 0 && 'platform' === access_level && this.role.id != 3)
        )
      ) { moduleAccess.push({module, is: true}) }
        else { moduleAccess.push({module, is: false}) }
      });
      return moduleAccess;
    }
  },
  methods: {
    ...mapActions({
      'fetchListModule' : 'module/fetchListModule',
      'fetchRolePermissionsByUser': 'role/fetchRolePermissionsByUser',
      'storeRole': 'role/storeRole',
      'fetchRoleById': 'role/fetchRoleById',
      'updateRole': 'role/updateRole'
    }),
    async formSetup() {
      try {
        this.resetFormData();
        this.getFormName();
        this.isFormLoading = true;
        const [dataModule, dataRolePermissions] = await Promise.all([this.fetchListModule(), this.fetchRolePermissionsByUser()]);
        this.role = dataRolePermissions.role;
        this.modules = dataModule.modules;
        if (this.roleId) {
          const dataRole = await this.fetchRoleById(this.roleId);
          this.appendDataToForm(dataRole.role);
          this.permissionsIds = dataRole.role_permissions.map(item => item.id);
          this.handleAppendPermissionsWasSave();
          this.publicId = dataRole.role.public;
        } else {
          this.publicId = this.role.public;
        }
        this.isFormLoading = false;
      } catch (error) {
        console.error('[App Error] => ', error);
        if (error.status === 404) {
          this.$confirm('Quyền này không tồn tại, hoặc đã bị xóa trước đó !', 'Thông báo lỗi', {
            confirmButtonText: 'Quay về',
            cancelButtonText: 'Thêm mới',
            type: 'error'
          }).then(() => {
            this.back();
          }).catch(() => {
            this.back('/setting/role/add');
          });
        } else {
          this.$message.error('Có lỗi trong quá trình tải dữ liệu !');
          this.back();
        }
      }
    },
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
      this.publicId = +val;
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
      this.formData.permissions = listPermisisonsSelected;
    },
    handleAppendPermissionsWasSave() {
      let listPermisisonsEl = document.querySelectorAll('.permission_item');
      listPermisisonsEl.forEach(item => {
        this.permissionsIds.forEach(id => {
          if (+item.value === id) {
            item.checked = true;
          }
        });
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
    getFormName() {
      this.formName = this.$route.meta && this.$route.meta.title;
    },
    back(router = '/setting/role', query = {}) {
      this.resetFormData();
      this.$refs['formData'].resetFields();
      this.$router.push({ path: router, query });
    },
    handleCloseForm() {
      this.back();
    },
    resetFormData() {},
    handleActionForm(callback) {
      this.$refs['formData'].validate(valid => {
        this.handleGetListPermission();
        if (valid) {
          let error = true;
          if (this.formData.level < this.userAuth.accessLevel) {
            error = true;
            this.formError.level_error = `Level value must be greater than or equal to ${this.userAuth.accessLevel}`;
          } else {
            error = false;
            this.formError.level_error = '';
          }
          if (!error) {
            callback().then(res => {
              Message({
                message: res.success,
                type: 'success',
                duration: 5 * 1000
              });
              this.back('/setting/role', { form: 'success' });
            }).catch(error => {
              console.error('[App Error] => ', error);
              if (error.status === 422) {
                Message({
                  message: 'Dữ liệu không hợp lệ, vui lòng kiễm tra lại !',
                  type: 'error',
                  duration: 5 * 1000
                });
              }
              this.appendErrorToForm(error.data.errors);
            });
          }
        }
      });
    },
    handleAdd() {
      return this.storeRole(this.formData);
    },
    handleUpdate() {
      return this.updateRole({ formData: this.formData, id: this.roleId });
    },
    setFormData() {
      this.formData = {...defaultFormData};
    },
    appendErrorToForm(errors) {
      for (const [key, value] of Object.entries(errors)) {
        this.formError[key] = value[0];
      }
    },
    appendDataToForm(data) {
      this.formData.name   = data.name;
      this.formData.public = data.public.toString();
      this.formData.level  = data.level;
      this.formData.description = data.description;
    }
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