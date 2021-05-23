// Utils
import { validEmail } from '@/utils/validate';

/**
 * Validate email.
 * @var function
 */
const validateEmail = (rule, value, callback) => {
  if (! validEmail(value)) {
    callback(new Error("Email invalid, please enter the correct email !"));
  } else { callback() }
};

/**
 * Validate password.
 * @var function
 */
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error("The password can't be less than 6 digits !"));
  } else { callback() }
}

/**
 * Check user rule.
 * @var Object
 */
export const userRules = {
  full_name: [{ required: true, trigger: 'blur' }],
  status: [{ required: true, trigger: 'blur' }],
  email: [{ required: true, trigger: 'blur', validator: validateEmail }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
  re_password: [{ required: true, trigger: 'blur' }],
  role: [{ required: true, trigger: 'blur' }],
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