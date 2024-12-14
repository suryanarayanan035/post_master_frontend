'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Snackbar from '../../components/SnackbarAlerts/Snackbar';
import UsersAPI from '../../APIs/UsersAPI';
import { useState } from 'react';

function ForgotPasswordPage() {
  const schema = yup.object({
    email: yup
      .string()
      .email('Invalid email')
      .required('Email cannot be empty')
      .test(
        'len',
        'Email cannot exceed 150 characters',
        (val) => val.length < 150,
      ),
  });

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    text: '',
    variant: '',
  });

  const {
    register,
    formState: { errors },
    trigger,
  } = useForm({ resolver: yupResolver(schema) });

  const handleBlur = (e) => {
    trigger([e.target.name]);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar({
      open: false,
      text: '',
      variant: '',
    });
  };

  const sendResetLinkToEmail = async (data) => {
    const { email } = data;
    if (!errors.email && email) {
      const { error, data: responseData } = await new UsersAPI().forgotPassword(
        email,
      );
      setOpenSnackbar({
        open: !!(error || responseData?.message || responseData?.error),
        text: error || responseData?.message || responseData?.error,
        variant: error || responseData.error ? 'error' : 'success',
      });
    } else {
      trigger(['email']);
    }
  };

  return (
    <>
      {openSnackbar.open && (
        <Snackbar
          open={!!openSnackbar.open}
          text={openSnackbar.text}
          handleClose={handleCloseSnackbar}
          variant={openSnackbar.variant}
        />
      )}
      <div className="flex w-1/4 flex-col items-center space-y-5 rounded bg-[#f5f3ff] bg-white p-6 shadow-md">
        <p className="mb-15px text-xl font-semibold text-[#7e22ce]">
          Oops! Forgot your password?
        </p>
        <p className="m-10px w-80 text-center text-base font-thin text-[#86198f]">
          No worries! We got you covered. Please enter your email address and we
          will send you a link to reset your password.
        </p>
        <input
          type="email"
          {...register('email')}
          className={`w-80 w-full rounded border-2 ${errors.email?.message ? 'border-red-500' : 'border-[#e0e0e0]'} bg-[#faf5ff] p-3 text-base placeholder-[#a0a0a0] focus:border-[#7e22ce] focus:outline-none`}
          placeholder="Enter your email address"
          onBlur={handleBlur}
        />
        {!!errors.email?.message && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <button
          type="submit"
          className="w-80 w-full rounded bg-[#701a75] p-3 text-base font-semibold text-white focus:outline-none"
          onClick={sendResetLinkToEmail}
        >
          Send password reset link
        </button>
        <Link href="/users/login" className="text-sm font-thin text-[#7e22ce]">
          Remember password? Back to login
        </Link>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
