import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/favicon-32x32.png';
import { signUp } from '../../Redux/user.reducer/users.reducers';
import loading from '../../assets/images/loading-icon.svg';

const Signup = () => {
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: null,
    password: '',
  });

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setFormData((previousState) => ({ ...previousState, [name]: value }));
  };

  const handleImageChange = (field, file) => {
    setFormData((previousState) => ({
      ...previousState,
      [field]: file,
    }));
  };

  const clearnForm = (e) => {
    // this.myFormRef.reset();
    console.log(e);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    const {
      name, email, password,
    } = formData;
    data.append('name', name);
    data.append('email', email);
    data.append('image', e.target.image.files[0]);
    data.append('password', password);
    console.log(data);
    dispatch(signUp(data), [dispatch]);
    if (success) {
      clearnForm(e);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col md:h-screen lg:py-0">

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={logo}
              alt="logo"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create and account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {success
              ? (
                <div className="text-green-600 font-semibold flex gap-4">
                  Account created successfully!!
                  <span>
                    <a href="/signin" className="font-semibold leading-6 text-green-700 hover:text-green-800 hover:font-extrabold">
                      Login here
                    </a>
                  </span>
                </div>
              ) : ''}
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Full Names
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </label>
              </div>
              {Object.keys(error).length > 0 && error.response.data.name
                ? (
                  <div className="text-red-700">
                    {!error.response ? error.message : `Name ${error.response.data.name[0]}`}
                  </div>
                )
                : ''}
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
              {Object.keys(error).length > 0 && error.response.data.email
                ? (
                  <div className="text-red-700">
                    {!error.response ? error.message : `Email ${error.response.data.email[0]}`}
                  </div>
                )
                : ''}
              <div>
                <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                  Your Picture
                  <div className="mt-2">
                    <input
                      id="image"
                      name="image"
                      type="file"
                      autoComplete="image"
                      required
                      accept="image/png, image/gif, image/jpeg"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => handleImageChange('image', e.target.files[0])}
                    />
                  </div>
                </label>
              </div>
              {Object.keys(error).length > 0 && error.response.data.image
                ? (
                  <div className="text-red-700">
                    {!error.response ? error.message : `Image ${error.response.data.image[0]}`}
                  </div>
                )
                : ''}
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
              {Object.keys(error).length > 0 && error.response.data.password
                ? (
                  <div className="text-red-700">
                    {!error.response ? error.message : `Password ${error.response.data.password[0]}`}
                  </div>
                )
                : ''}
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  // onChange={(e) => handlepaChange(e)}
                  />
                </label>
              </div>
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
                      Register
                    </button>
                  )}
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account??
              {' '}
              <a href="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Signup;
