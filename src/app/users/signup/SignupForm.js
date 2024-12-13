import { extractErrorMessage } from '@lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

function SignupForm() {
  const phoneRegex =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const schema = yup.object({
    username: yup
      .string()
      .required('Username cannot be empty')
      .test(
        'len',
        'Username cannot exceed 75 characters',
        (val) => val.length < 75,
      ),
    email: yup
      .string()
      .email('Invalid email')
      .required('Email cannot be empty')
      .test(
        'len',
        'Email cannot exceed 150 characters',
        (val) => val.length < 150,
      ),
    phoneNumber: yup
      .string()
      .required('Phone number cannot be empty')
      .min(10, 'Phone number must be 10 digits')
      .max(10, 'Phone number must be 10 digits')
      .test('phone', 'Invalid phone number', (value) => phoneRegex.test(value)),
    password: yup
      .string()
      .required('Password cannot be empty')
      .test(
        'len',
        'Password cannot exceed 100 characters',
        (val) => val.length < 100,
      ),
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { username: '', email: '', phoneNumber: '', password: '' },
  });

  const handleBlur = (e) => {
    trigger([e.target.name]);
  };

  const borderColour = (field) => {
    if (errors[field]) {
      return 'border-red-500 focus:outline-none';
    }
    if (!dirtyFields[field]) {
      return 'border-gray-300 focus:outline-none';
    }
    return 'border-green-500 focus:outline-none';
  };

  const signupUser = async (data) => {
    const { username, email, phoneNumber, password } = data;
    const { error, data: responseData } = await new UsersAPI().signupUser({
      username,
      email,
      mobile: phoneNumber,
      password,
    });
    if (!error) {
      setCookie('accessToken', responseData.token);
      return router.push('/users/dashboard');
    }

    alert(extractErrorMessage(error));
  };

  return (
    <form
      className="flex w-1/4 flex-col items-center space-y-5 rounded bg-[#f5f3ff] bg-white p-6 shadow-md"
      onSubmit={handleSubmit(signupUser)}
    >
      <p className="font-semibold text-[#8b5cf6]">Create your account</p>
      <input
        type="text"
        name="username"
        {...register('username')}
        placeholder="Username"
        onBlur={handleBlur}
        className={`h-10 w-70 rounded border ${borderColour('username')} p-3 focus:border-gray-500`}
      />
      {errors.username?.message && (
        <p className="w-70 text-red-500">{errors.username?.message}</p>
      )}
      <input
        type="text"
        name="email"
        {...register('email')}
        placeholder="Email"
        onBlur={handleBlur}
        className={`h-10 w-70 rounded border ${borderColour('email')} p-3 focus:border-gray-500`}
      />
      {errors.email?.message && (
        <p className="w-70 text-red-500">{errors.email?.message}</p>
      )}
      <input
        type="text"
        name="phoneNumber"
        {...register('phoneNumber')}
        placeholder="Phone Number"
        onBlur={handleBlur}
        className={`h-10 w-70 rounded border ${borderColour('phoneNumber')} p-3 focus:border-gray-500`}
      />
      {errors.phoneNumber?.message && (
        <p className="w-70 text-red-500">{errors.phoneNumber?.message}</p>
      )}
      <input
        type="password"
        name="password"
        {...register('password')}
        placeholder="Password"
        onBlur={handleBlur}
        className={`h-10 w-70 rounded border ${borderColour('password')} p-3 focus:border-gray-500`}
      />
      {errors.password?.message && (
        <p className="w-70 text-red-500">{errors.password?.message}</p>
      )}
      <Link href="/users/login" className="w-70 font-semibold text-[#2563eb]">
        Already have an account? Login here!
      </Link>
      <button
        type="submit"
        onClick={handleSubmit}
        className="h-10 w-70 rounded border-2 bg-[#8b5cf6] font-semibold text-white"
      >
        Sign up
      </button>
    </form>
  );
}

export default SignupForm;
