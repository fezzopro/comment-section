import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/favicon-32x32.png';
import { signIn, verifyToken } from '../../Redux/user.reducer/users.reducers';
import loading from '../../assets/images/loading-icon.svg';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isLoading, error, success, signedIn,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(localStorage.getItem('token') !== 'undefined'
      ? verifyToken({ token: JSON.parse(localStorage.getItem('token')) })
      : verifyToken({ token: 'XXX' }));
  }, [dispatch, signedIn]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setFormData((previousState) => ({ ...previousState, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(formData), [dispatch]);
  };

  if (success || signedIn) {
    navigate('/comment');
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            {/* {success
              ? (
                localStorage.setItem('token', JSON.stringify(user.token))
                && navigate('/comment')
              ) : ''} */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </label>
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </label>
            </div>
            {Object.keys(error).length > 0
              ? (
                <div className="text-red-700">
                  {!error.response ? error.message : error.response.data.error_description[0]}
                </div>
              )
              : ''}

            <div>
              {isLoading
                ? (
                  <button type="button" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled>
                    <img src={loading} alt="loading" className="animate-spin h-5 w-5 mr-3" />
                    Processing...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                )}

            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            {' '}
            <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create account
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
