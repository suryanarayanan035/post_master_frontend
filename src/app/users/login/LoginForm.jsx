'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import UsersAPI from '@APIs/UsersAPI';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {extractErrorMessage, setCookie}  from '@lib/utils';

export default function LoginForm() {
  const schema = yup.object({
    username: yup
      .string()
      .required('Username cannot be empty')
      .test(
        'len',
        'Username cannot exceed 75 characters',
        (val) => val.length < 75,
      ),
    password: yup
      .string()
      .required('Password cannot be empty')
      .test(
        'len',
        'Password cannot exceed 100 characters',
        (val) => val.length < 100,
      )
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

	//eslint-disable-next-line consistent-return
  const onSubmit = async (data) => {
    const { username, password } = data;
    const { error, data: responseData } = await new UsersAPI().loginUser(
      username,
      password,
    );
    if (!error) {
      setCookie('accessToken', responseData.token);
      return router.push('/users/dashboard');
    }

	  alert(extractErrorMessage(error))

     };


  const handleBlur = (e) => {
    trigger([e.target.name]);
  };
  return (
    <form
      className="w-full max-w-sm rounded bg-white p-6 shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="mb-4 text-2xl font-bold">Login</h2>
      <div className="mb-4">
        {' '}
	  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="block text-gray-700" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          {...register('username')}
          onBlur={handleBlur}
          className="mt-1 w-full rounded border border-gray-300 p-2"
        />
      </div>{' '}
      <div className="mb-4">
        {' '}
		  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="block text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          {...register('password')}
          onBlur={handleBlur}
          className="mt-1 w-full rounded border border-gray-300 p-2"
        />{' '}
      </div>
      <div className="mb-4 mt-4">
        {' '}
        <Link href="/users/forgot-password">
          {' '}
          <p className="text-blue-500">Forgot Password?</p>{' '}
        </Link>
      </div>
      <div className="mb-4 mt-4">
        {' '}
        <Link href="/users/signup">
          {' '}
          <p className="text-blue-500">
            Don&#39;t have an account? Signup!
          </p>{' '}
        </Link>
      </div>
      {Object.keys(errors).map((key) => (
        <div className="mb-4 text-red-500" key={key}>
          {errors[key].message}
        </div>
      ))}{' '}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full rounded bg-blue-500 p-2 text-white"
      >
        {' '}
        Login{' '}
      </button>
    </form>
  );
}
