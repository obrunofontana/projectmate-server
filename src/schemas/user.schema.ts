import { object, string, TypeOf, z } from 'zod';
import { RoleEnumType } from '../entities/user.entity';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'O nome é obrigatório',
    }),
    email: string({
      required_error: 'É necessário um endereço de e-mail',
    }).email('Endereço de email invalido'),
    password: string({
      required_error: 'A senha é obrigatória',
    })
      .min(3, 'A senha deve ter mais de 3 caracteres')
      .max(8, 'A senha deve ter menos de 8 caracteres'),
    passwordConfirm: string({
      required_error: 'Por favor, confirme sua senha',
    }),
    role: z.optional(z.nativeEnum(RoleEnumType)),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'As senhas não coincidem',
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'É necessário um endereço de e-mai',
    }).email('Endereço de email invalido'),
    password: string({
      required_error: 'A senha é obrigatória',
    }).min(3, 'E-mail ou senha inválidos'),
  }),
});

export const verifyEmailSchema = object({
  params: object({
    verificationCode: string(),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>['body'],
  'passwordConfirm'
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>['params'];
