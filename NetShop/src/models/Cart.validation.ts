import {object, string} from 'yup';
import {createProfanityFilter} from '../util/common';

const profanity = createProfanityFilter();

export const checkoutSchema = object({
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
  email: string().email(),
  deliveryAddress: string()
    .required()
    .test({
      test(value, ctx) {
        if (profanity.exists(value)) {
          return ctx.createError({
            message: 'Delivery Address should not contain swear words',
          });
        }
        return true;
      },
    }),
});
