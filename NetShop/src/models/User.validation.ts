import {PasswordStrengthStatistics} from 'tai-password-strength';
import {object, string} from 'yup';
import {createProfanityFilter} from '../util/common';

const taiPasswordStrength = require('tai-password-strength');

export enum PasswordStrengthCode {
  VERY_WEAK = 'VERY_WEAK',
  WEAK = 'WEAK',
  REASONABLE = 'REASONABLE',
  STRONG = 'STRONG',
  VERY_STRONG = 'VERY_STRONG',
}

const profanity = createProfanityFilter();

export const userSchema = object({
  firstName: string()
    .required()
    .test({
      test(value, ctx) {
        if (profanity.exists(value)) {
          return ctx.createError({
            message: 'First Name should not contain swear words',
          });
        }
        return true;
      },
    }),
  lastName: string()
    .required()
    .test({
      test(value, ctx) {
        if (profanity.exists(value)) {
          return ctx.createError({
            message: 'Last Name should not contain swear words',
          });
        }
        return true;
      },
    }),
  username: string()
    .required()
    .min(3)
    .lowercase()
    .matches(/^[a-zA-Z0-9_]+$/)
    .test({
      test(value, ctx) {
        if (profanity.exists(value)) {
          return ctx.createError({
            message: 'User Name should not contain swear words',
          });
        }
        return true;
      },
    }),
  email: string().email().required(),
  password: string()
    .required()
    .test({
      test(value, ctx) {
        // Check the password against the password strength library
        const passwordStrength = new taiPasswordStrength.PasswordStrength();
        const passwordStrengthResult: PasswordStrengthStatistics =
          passwordStrength.check(value);

        switch (passwordStrengthResult.strengthCode) {
          case PasswordStrengthCode.VERY_WEAK:
          case PasswordStrengthCode.WEAK:
            return ctx.createError({
              message: 'Password is not strong enough',
            });
          case PasswordStrengthCode.REASONABLE:
          case PasswordStrengthCode.STRONG:
          case PasswordStrengthCode.VERY_STRONG:
            return true;
        }
      },
    }),
}).required();

export const signInSchema = object({
  username: string().required(),
  password: string().required(),
}).required();
