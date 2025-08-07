import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  username: string
  roleId: number
  contact?: string
  university?: string
  city?: string
}

interface Role {
  RoleID: number
  RoleName: string
}

const Register = () => {
  const { register: registerUser, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [roles, setRoles] = useState<Role[]>([])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>()

  const password = watch('password')

  useEffect(() => {
    // Fetch roles from API
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/auth/roles')
        const data = await response.json()
        if (data.success) {
          setRoles(data.data.roles)
        }
      } catch (error) {
        console.error('Failed to fetch roles:', error)
      }
    }

    fetchRoles()
  }, [])

  const onSubmit = async (data: RegisterForm) => {
    try {
      setError('')
      
      if (data.password !== data.confirmPassword) {
        setError('Passwords do not match')
        return
      }

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        username: data.username,
        roleId: data.roleId,
        contact: data.contact,
        university: data.university,
        city: data.city,
      }

      await registerUser(userData)
      toast.success('Registration successful!')
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
      toast.error(err.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
                className="input-field mt-1"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="input-field mt-1"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                })}
                className="input-field mt-1"
                placeholder="Choose a username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="roleId" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="roleId"
                {...register('roleId', {
                  required: 'Please select a role',
                })}
                className="input-field mt-1"
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.RoleID} value={role.RoleID}>
                    {role.RoleName}
                  </option>
                ))}
              </select>
              {errors.roleId && (
                <p className="mt-1 text-sm text-red-600">{errors.roleId.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className="input-field mt-1"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                className="input-field mt-1"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                Contact Number (Optional)
              </label>
              <input
                id="contact"
                type="tel"
                {...register('contact')}
                className="input-field mt-1"
                placeholder="Enter your contact number"
              />
            </div>

            <div>
              <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                University (Optional)
              </label>
              <input
                id="university"
                type="text"
                {...register('university')}
                className="input-field mt-1"
                placeholder="Enter your university"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City (Optional)
              </label>
              <input
                id="city"
                type="text"
                {...register('city')}
                className="input-field mt-1"
                placeholder="Enter your city"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex justify-center py-3"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <div className="text-center">
            <Link to="/" className="text-sm text-primary-600 hover:text-primary-500">
              Back to home
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
