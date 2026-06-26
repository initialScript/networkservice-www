'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react'

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <main className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-3xl'>
          {/* Logo Section */}
          <div className='flex flex-col items-center mb-8 '>
            {/* <div className=' relative mb-4 '>
              <img
              src="/assets/main-logo.png"
              alt="network service info logo"
              className="w-[140px] sm:w-[160px]"
            />
            </div> */}
            <h2 className='text-xl md:text-2xl font-bold text-gray-800'>
              Créer un compte
            </h2>
            <p className='text-gray-500 text-sm md:text-base mt-1'>
              Inscrivez-vous pour commencer
            </p>
          </div>

          {/* Register Form */}
          <form className='space-y-4'>
            {/* Full Name Field */}
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <User className='text-gray-400' size={20} />
              </div>
              <input
                type='text'
                placeholder='Nom complet'
                className='w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400'
                required
              />
            </div>

            {/* Email Field */}
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Mail className='text-gray-400' size={20} />
              </div>
              <input
                type='email'
                placeholder='Adresse e-mail'
                className='w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400'
                required
              />
            </div>

            {/* Phone Number Field (Optional) */}
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Phone className='text-gray-400' size={20} />
              </div>
              <input
                type='tel'
                placeholder='Numéro de téléphone (optionnel)'
                className='w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400'
              />
            </div>

            {/* Password Field */}
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className='text-gray-400' size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Mot de passe'
                className='w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400'
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200'
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className='text-gray-400' size={20} />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirmer le mot de passe'
                className='w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400'
                required
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200'
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Terms and Conditions */}
            <div className='flex items-start gap-2 pt-1'>
              <input
                type='checkbox'
                id='terms'
                className='mt-1 w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                required
              />
              <label htmlFor='terms' className='text-sm text-gray-600'>
                J'accepte les{' '}
                <Link href='/terms' className='text-blue-600 hover:text-blue-800 hover:underline'>
                  conditions d'utilisation
                </Link>
                {' '}et la{' '}
                <Link href='/privacy' className='text-blue-600 hover:text-blue-800 hover:underline'>
                  politique de confidentialité
                </Link>
              </label>
            </div>

            {/* Register Button */}
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg mt-2'
            >
              S'inscrire
            </button>
          </form>

          {/* Login Link */}
          <div className='mt-6 text-center'>
            <p className='text-gray-600 text-sm md:text-base'>
              Vous avez déjà un compte ?{' '}
              <Link 
                href='/auth/login' 
                className='text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors duration-200'
              >
                Se connecter
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-4 bg-white text-gray-500'>ou</span>
            </div>
          </div>

          {/* Social Register Buttons */}
          <div className='grid grid-cols-2 gap-3'>
            <button className='flex items-center justify-center gap-2 py-2.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-sm font-medium text-gray-700'>
              <svg className='w-5 h-5' viewBox='0 0 24 24'>
                <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z'/>
                <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
                <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
                <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>
              </svg>
              Google
            </button>
            <button className='flex items-center justify-center gap-2 py-2.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-sm font-medium text-gray-700'>
              <svg className='w-5 h-5' fill='#1877F2' viewBox='0 0 24 24'>
                <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/>
              </svg>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage