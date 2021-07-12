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
 * Check User rule.
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
}

/**
 * Check Customer rule.
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
 * Check Role.
 */
export const roleRules = {
  name:  [{ required: true, message: 'Vui lòng nhập tên của vai trò !', trigger: 'blur' }],
  role_type:  [{ required: true, message: 'Vui lòng nhập loại vai trò !', trigger: 'blur' }],
  role_level: [{ required: true, message: 'Vui lòng nhập cấp độ của vai trò !', trigger: 'blur' }],
};

/**
 * Check Category group
 */
export const categoryGroupRules = {
  name: [{ required: true, message: 'Vui lòng nhập tên nhóm danh mục !', trigger: 'blur' }],
  slug: [{ required: true, message: 'Vui lòng nhập link thân thiện !', trigger: 'blur' }],
  active: [{ required: true, message: 'Vui lòng chọn trạng thái !', trigger: 'blur' }]
};

/**
 * Check Category sub group
 */
export const categorySubGroupRules = {
  name: [{ required: true, message: 'Vui lòng nhập tên nhóm danh mục phụ !', trigger: 'blur' }],
  slug: [{ required: true, message: 'Vui lòng nhập link thân thiện !', trigger: 'blur' }],
  active: [{ required: true, message: 'Vui lòng chọn trạng thái !', trigger: 'blur' }],
  category_group_id: [{ required: true, message: 'Vui lòng chọn nhóm danh mục cha !', trigger: 'blur' }]
};

/**
 * Check Category
 */
 export const categoryRules = {
  name: [{ required: true, message: 'Vui lòng nhập tên danh mục', trigger: 'blur' }],
  slug: [{ required: true, message: 'Vui lòng nhập link thân thiện !', trigger: 'blur' }],
  active: [{ required: true, message: 'Vui lòng chọn trạng thái !', trigger: 'blur' }],
  category_sub_group_id: [{ required: true, message: 'Vui lòng chọn nhóm danh mục phụ !', trigger: 'blur' }]
};

/**
 * Check Manufacturer
 */
export const manufacturerRules = {
  name: [{ required: true, message: 'Vui lòng nhập tên', trigger: 'blur' }],
  active: [{ required: true, message: 'Vui lòng chọn trạng thái', trigger: 'blur' }],
  email: [{ required: true, trigger: 'blur', validator: validateEmail }],
  phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
};

/**
 * Check Product
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

/**
 * Check Address
 */
 export const addressRules = {
   address_type: [{ required: true, message: 'Vui lòng chọn loại địa chỉ', trigger: 'blur'}],
   address_line_1: [{ required: true, message: 'Vui Lòng nhập tên đường 1', trigger: 'blur'}],
   city: [{ required: true, message: 'Vui lòng nhập thành phố', trigger: 'blur'}],
   zip_code: [{ required: true, message: 'Vui lòng nhập mã vùng', trigger: 'blur'}],
   phone: [
     { required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur'},
     { trigger: 'blur', validator: validatePhone }
  ],
   country: [{ required: true, message: 'Vui lòng chọn quốc gia', trigger: 'blur'}],
   state: [{ required: true, message: 'Vui lòng chọn khu vực', trigger: 'blur'}]
};

/**
 * Check Shop
 */
export const shopRules = {
  name: [{ required: true, message: 'Vui lòng điềm trường này', trigger: 'blur' }],
  active: [{ required: true, message: 'Vui lòng chọn trạng thái', trigger: 'blur' }],
  email: [{ required: true, trigger: 'blur', validator: validateEmail }],
  legal_name: [{ required: true, message: 'Vui lòng điền trường này', trigger: 'blur' }],
};

/**
 * Check Merchant
 */
export const merchantRules = {
  name: [{ required: true, message: 'Vui lòng điền trường này', trigger: 'blur' }],
  active: [{ required: true, message: 'Vui lòng chọn trạng thái', trigger: 'blur' }],
  email: [{ required: true, trigger: 'blur', validator: validateEmail }],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    { trigger: 'blur', validator: validatePassword, trigger: 'blur' }
  ],
  shop_name: [{ required: true, message: 'Vui lòng điền trường này', trigger: 'blur' }],
  legal_name: [{ required: true, message: 'Vui lòng điền trường này', trigger: 'blur' }],
  slug: [{ required: true, message: 'Vui lòng điền trường này', trigger: 'blur' }],
};

/**
 * Check Banner
 */
export const bannerRules = {
  link: [{ required: true, message: 'Vui lòng điền trường này', trigger: 'blur' }],
  group_id: [{ required: true, message: 'Vui lòng chọn nhóm banner', trigger: 'blur' }]
};

/**
 * Check Banner
 */
 export const sliderRules = {};

 /**
  * Check Setting System General rule
  */
export const settingSystemGeneralRule = {
  name: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
  legal_name: [{ required: true, message: 'Vui lòng điền trường này', trigger: 'blur' }],
  email: [
    { required: true, message: 'Vui lòng điền trường này', trigger: 'blur' },
    { required: true, trigger: 'blur', validator: validateEmail },
  ],
};

 /**
  * Check FaqTopic rule
  */
export const faqTopicRules = {
  name: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
  for: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }]
};

 /**
  * Check Faq rule
  */
export const faqRules = {
  question: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
  faq_topic_id: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
  answer: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }]
};

/**
 * Check Inventory rule
 */
export const inventoryRules = {
  title: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
  condition: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
  active: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
  sku: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
  sale_price: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
  slug: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
};

/**
 * Check SettingGeneral Rules.
 */
export const settingGeneralRules = {
  name: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
  legal_name: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
  email: [
    { required: true, message: 'Vui lòng điền trường này', trigger: 'blur' },
    { required: true, trigger: 'blur', validator: validateEmail },
  ],
};

/**
 * Check Setting Config Support Rules.
 */
export const shopSettingConfigSupportRule = {
  support_email: [
    { required: true, message: 'Vui lòng điền trường này', trigger: 'blur' },
    { required: true, trigger: 'blur', validator: validateEmail },
  ],
  default_sender_email_address: [
    { required: true, message: 'Vui lòng điền trường này', trigger: 'blur' },
    { required: true, trigger: 'blur', validator: validateEmail },
  ],
  default_email_sender_name: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
};

/**
 * Check Profile Rules.
 */
export const profileRules = {
  name: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
  email: [
    { required: true, message: 'Vui lòng điền trường này', trigger: 'blur' },
    { required: true, trigger: 'blur', validator: validateEmail },
  ],
};

/**
 * Check Update Password Rules.
 */
export const updatePasswordRules = {
  current_password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    { trigger: 'blur', validator: validatePassword, trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    { trigger: 'blur', validator: validatePassword, trigger: 'blur' }
  ],
  password_confirmation: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    { trigger: 'blur', validator: validatePassword, trigger: 'blur' }
  ],
};

/**
 * Check System Setting Config Support Rules.
 */
export const systemSettingConfigSupportRule = {
  support_email: [
    { required: true, message: 'Vui lòng điền trường này', trigger: 'blur' },
    { required: true, trigger: 'blur', validator: validateEmail },
  ],
  default_sender_email_address: [
    { required: true, message: 'Vui lòng điền trường này', trigger: 'blur' },
    { required: true, trigger: 'blur', validator: validateEmail },
  ],
  default_email_sender_name: [{ required: true, message: 'Vui lòng điền trường này.', trigger: 'blur' }],
};