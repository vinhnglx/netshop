import {number, object, string} from 'yup';
import {createProfanityFilter} from '../util/common';

const profanity = createProfanityFilter();

export const productSchema = object({
  name: string()
    .required()
    .test({
      test(value, ctx) {
        if (profanity.exists(value)) {
          return ctx.createError({
            message: 'Name should not contain swear words',
          });
        }
        return true;
      },
    }),
  description: string()
    .required()
    .test({
      test(value, ctx) {
        if (profanity.exists(value)) {
          return ctx.createError({
            message: 'Name should not contain swear words',
          });
        }
        return true;
      },
    }),
  quantity: number().required().positive(),
  price: number().required().positive(),
});
