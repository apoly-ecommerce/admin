// Utils
import { validEmail, validPhone } from '@/utils/validate';

/**
 * Validate email.
 */
const validateEmail = (rule, value, callback) => {
  if (! validEmail(value)) {
    callback(new Error("Email không hợp lệ, vui lòng nhập đúng email !"));
  } else { callback() }
};

/**
 * Validate password.
 */
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error("Mật khẩu không được ít hơn 6 chữ số !"));
  } else { callback() }
}

/**
 * Validate phone
 */
const validatePhone = (rule, value, callback) => {
  if (! validPhone(value)) {
    callback(new Error("Số điện thoại không hợp lệ, vui lòng nhập số điện thoại đúng !"));
  } else { callback() }
}

/**
 * Validate price
 */
const validatePrice = (rule, value, callback) => {
  if (value <= 0) {
    callback(new Error('Giá trị số tiền phải lớn hơn 0đ'));
  } else { callback() }
}

/**
 * Check user rule.
 * @var Object
 */
export const userRules = {
  name: [{ required: true, message: 'Vui lòng nhập tên user', trigger: 'blur' }],
  active: [{ required: true, message: 'Vui lòng chọn trạng thái', trigger: 'blur' }],
  email: [
    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
    { trigger: 'blur', validator: validateEmail, trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    { trigger: 'blur', validator: validatePassword, trigger: 'blur' }
  ],
  password_confirmation: [{ required: true, message: 'Vui lòng xác nhận lại mật khẩu', trigger: 'blur' }],
  role_id: [{ required: true, message: 'Vui lòng nhập quyền cho user', trigger: 'blur' }],
  sex: [{ required: true, message: 'Vui lòng chọn giới tính', trigger: 'blur' }],
  phone: [
    { required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur' },
    { trigger: 'blur', validator: validatePhone }
  ]
}

/**
 * Check customer rule.
 * @var Object
 */
 export const customerRules = {
  name: [{ required: true, message: 'Vui lòng nhập tên khách hàng', trigger: 'blur' }],
  active: [{ required: true, message: 'Vui lòng chọn trạng thái', trigger: 'blur' }],
  email: [
    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
    { trigger: 'blur', validator: validateEmail, trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    { trigger: 'blur', validator: validatePassword, trigger: 'blur' }
  ],
  password_confirmation: [{ required: true, message: 'Vui lòng xác nhận lại mật khẩu', trigger: 'blur' }],
}

/**
 * Check role.
 * @var Object
 */
export const roleRules = {
  name:  [{ required: true, message: 'Vui lòng nhập tên của vai trò !', trigger: 'blur' }],
  role_type:  [{ required: true, message: 'Vui lòng nhập loại vai trò !', trigger: 'blur' }],
  role_level: [{ required: true, message: 'Vui lòng nhập cấp độ của vai trò !', trigger: 'blur' }],
};

/**
 * Check category group
 * @var Object
 */
export const categoryGroupRules = {
  name: [{ required: true, message: 'Vui lòng nhập tên nhóm danh mục !', trigger: 'blur' }],
  slug: [{ required: true, message: 'Vui lòng nhập link thân thiện !', trigger: 'blur' }],
  active: [{ required: true, message: 'Vui lòng chọn trạng thái !', trigger: 'blur' }]
};

/**
 * Check category sub group
 * @var Object
 */
export const categorySubGroupRules = {
  name: [{ required: true, message: 'Vui lòng nhập tên nhóm danh mục phụ !', trigger: 'blur' }],
  slug: [{ required: true, message: 'Vui lòng nhập link thân thiện !', trigger: 'blur' }],
  active: [{ required: true, message: 'Vui lòng chọn trạng thái !', trigger: 'blur' }],
  category_group_id: [{ required: true, message: 'Vui lòng chọn nhóm danh mục cha !', trigger: 'blur' }]
};

/**
 * Check category
 * @var Object
 */
 export const categoryRules = {
  name: [{ required: true, message: 'Vui lòng nhập tên danh mục', trigger: 'blur' }],
  slug: [{ required: true, message: 'Vui lòng nhập link thân thiện !', trigger: 'blur' }],
  active: [{ required: true, message: 'Vui lòng chọn trạng thái !', trigger: 'blur' }],
  category_sub_group_id: [{ required: true, message: 'Vui lòng chọn nhóm danh mục phụ !', trigger: 'blur' }]
};

/**
 * Check Manufacturer
 * @var Object
 */
export const manufacturerRules = {
  name: [{ required: true, message: 'Vui lòng nhập tên', trigger: 'blur' }],
  active: [{ required: true, message: 'Vui lòng chọn trạng thái', trigger: 'blur' }],
  email: [{ required: true, trigger: 'blur', validator: validateEmail }],
  phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
};

/**
 * Check product
 * @var Object
 */
export const productRules = {
  name: [{ required: true, message: 'Vui lòng nhập tên sản phẩm', trigger: 'blur' }],
  description: [{ required: true, message: 'Vui lòng nhập mô tả sản phẩm', trigger: 'blur' }],
  active: [{ required: true, message: 'Vui lòng chọn trạng thái', trigger: 'blur' }],
  category_list: [{ required: true, message: 'Vui lòng chọn ít nhất một da mục', trigger: 'blur' }],
  original_price: [
    { required: true, message: 'Vui lòng nhập giá gốc sản phẩm', trigger: 'blur' },
    { required: true, trigger: 'blur', validator: validatePrice }
  ],
  promotional_price: [
    { required: true, message: 'Vui lòng nhập giá giá khuyến mãi sản phẩm', trigger: 'blur' },
    { required: true, trigger: 'blur', validator: validatePrice }
  ],
};