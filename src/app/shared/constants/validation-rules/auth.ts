import { ValidationRule } from '../../interfaces/validation.interface'

const emailRules = [
  {
    control: 'email',
    error: 'required',
    message: 'Email is required.'
  },
  {
    control: 'email',
    error: 'email',
    message: 'Please enter a valid email address.'
  }
]

const passwordRules = [
  {
    control: 'password',
    error: 'required',
    message: 'Password is required.'
  },
  {
    control: 'password',
    error: 'minlength',
    message: 'Password must be at least 6 characters long.'
  }
]

export const registerValidationRules: ValidationRule[] = [
  {
    control: 'tenantName',
    error: 'required',
    message: 'Organization name is required.'
  },
  {
    control: 'fullName',
    error: 'required',
    message: 'Full name is required.'
  },
  ...emailRules,
  ...passwordRules,
  {
    control: 'confirmPassword',
    error: 'required',
    message: 'Confirm password is required.'
  }
]

export const loginValidationRules: ValidationRule[] = [...emailRules, ...passwordRules]
