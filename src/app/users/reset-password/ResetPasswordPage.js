'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Snackbar from '../../components/SnackbarAlerts/Snackbar';
import UsersAPI from '../../APIs/UsersAPI';
import { useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';

function ResetPasswordPage() {
  const schema = yup.object({
    newPassword: yup
      .string()
      .required('New password cannot be empty')
      .test(
        'len',
        'Password cannot exceed 100 characters',
        (val) => val.length < 100,
      ),
    confirmPassword: yup
      .string()
      .required('Confirm password cannot be empty')
      .test(
        'len',
        'Password cannot exceed 100 characters',
        (val) => val.length < 100,
      ),
  });

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    text: '',
    variant: '',
  });
  const [passwordResetSuccessful, setPasswordResetSuccessful] = useState(false);

  const {
    register,
    formState: { errors },
    trigger,
    handleSubmit,
    watch,
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

  const resetPassword = async (data) => {
    const { newPassword, confirmPassword } = data;
    if (newPassword !== confirmPassword) {
      setOpenSnackbar({
        open: true,
        text: 'Passwords do not match. Please try again.',
        variant: 'error',
      });
      return;
    }
    if (
      newPassword &&
      confirmPassword &&
      !errors.newPassword?.message &&
      !errors.confirmPassword?.message
    ) {
      const { error, data: responseData } = await new UsersAPI().forgotPassword(
        newPassword,
      );
      setOpenSnackbar({
        open: !!(error || responseData?.message || responseData?.error),
        text: error || responseData?.message || responseData?.error,
        variant: error || responseData?.error ? 'error' : 'success',
      });
      setPasswordResetSuccessful(!(error || responseData.error));
    } else {
      trigger(['newPassword', 'confirmPassword']);
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
        {passwordResetSuccessful ? (
          <>
            <p className="mb-15px text-xl font-semibold text-[#7e22ce]">
              Password reset successful
            </p>
            <Link
              href="/users/login"
              className="text-sm font-thin text-[#7e22ce]"
            >
              Get back to login!
            </Link>
          </>
        ) : (
          <>
            <p className="mb-15px text-xl font-semibold text-[#7e22ce]">
              Reset your password!
            </p>
            <p className="m-10px w-80 text-center text-base font-thin text-[#86198f]">
              You can now reset your password and get back to your account.
            </p>
            <div className="w-70 space-y-2">
              <input
                type="password"
                {...register('newPassword')}
                placeholder="New Password"
                onBlur={handleBlur}
                className={`w-full rounded border-2 ${errors.newPassword?.message ? 'border-red-500' : 'border-[#e0e0e0]'} bg-[#faf5ff] p-3 text-base placeholder-[#a0a0a0] focus:border-[#7e22ce] focus:outline-none`}
              />
              <PasswordStrengthBar
                className="w-full"
                password={watch('newPassword')}
              />
              {errors.newPassword?.message && (
                <p className="m-0 w-full text-sm text-red-500">
                  {errors.newPassword?.message}
                </p>
              )}
            </div>
            <div className="w-70 space-y-2">
              <input
                type="password"
                {...register('confirmPassword')}
                placeholder="Confirm Password"
                onBlur={handleBlur}
                className={`w-full rounded border-2 ${errors.confirmPassword?.message ? 'border-red-500' : 'border-[#e0e0e0]'} bg-[#faf5ff] p-3 text-base placeholder-[#a0a0a0] focus:border-[#7e22ce] focus:outline-none`}
              />
              {errors.confirmPassword?.message && (
                <p className="m-0 w-full text-sm text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <button
              type="button"
              className="w-80 rounded bg-[#701a75] p-3 text-base font-semibold text-white focus:outline-none"
              onClick={handleSubmit(resetPassword)}
            >
              Reset my password
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default ResetPasswordPage;
