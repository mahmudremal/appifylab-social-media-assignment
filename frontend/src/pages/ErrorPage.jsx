import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ErrorPage = () => {
  const { user } = useAuth();

  return (
    <section className="_social_login_wrapper _layout_main_wrapper min-h-screen flex items-center justify-center">
      <div className="_shape_one">
        <img src="/assets/images/shape1.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape.svg" alt="" className="_dark_shape" />
      </div>
      <div className="_shape_two">
        <img src="/assets/images/shape2.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className="_shape_three">
        <img src="/assets/images/shape3.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>

      <div className="container relative z-10">
        <div className="row justify-center text-center">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div className="_social_login_content py-16 px-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
              <div className="mb-8 flex justify-center">
                <img src="/assets/images/logo.svg" alt="AppifyLab" className="h-12 w-auto" />
              </div>

              <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-none mb-4">
                404
              </h1>

              <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
                Oops! Page Not Found
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-md mx-auto">
                The page you are looking for might have been removed, had its name changed or is temporarily unavailable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="_btn1 inline-flex items-center justify-center px-10 py-4 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Back to Home
                </Link>
                {!!!user && (
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-10 py-4 text-blue-600 font-medium rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-all duration-300"
                  >
                    Go to Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;