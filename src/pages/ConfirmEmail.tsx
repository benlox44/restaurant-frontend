import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { CONFIRM_EMAIL, CONFIRM_EMAIL_UPDATE } from "../graphql/mutations/auth";

interface ConfirmEmailResponse {
  confirmEmail: {
    message: string;
  };
}

interface ConfirmEmailVariables {
  token: string;
}

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState("");

  const isEmailUpdate = location.pathname.includes('confirm-email-update');
  const isRevert = location.pathname.includes('revert-email');

  const [confirmEmailMutation] = useMutation<ConfirmEmailResponse, ConfirmEmailVariables>(CONFIRM_EMAIL, {
    onCompleted: (data) => {
      console.log("Email confirmed:", data.confirmEmail.message);
      setStatus('success');
      setMessage("Your account has been confirmed successfully! You will be redirected to login.");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: (error) => {
      console.error("Error confirming email:", error);
      setStatus('error');
      
      const errorMessage = error.message.toLowerCase();
      if (errorMessage.includes('invalid') || errorMessage.includes('expired')) {
        setMessage("The confirmation link is invalid or has expired. Please request a new link.");
      } else if (errorMessage.includes('already confirmed')) {
        setMessage("This account has already been confirmed. You can log in.");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setMessage("Error confirming your account. Please try again.");
      }
    },
  });

  const [confirmEmailUpdateMutation] = useMutation<ConfirmEmailResponse, ConfirmEmailVariables>(CONFIRM_EMAIL_UPDATE, {
    onCompleted: (data) => {
      console.log("Email update confirmed:", data);
      setStatus('success');
      setMessage("Your email has been updated successfully! You will be redirected to login.");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: (error) => {
      console.error("Error confirming email update:", error);
      setStatus('error');
      setMessage("Error confirming email update. The link may be invalid or expired.");
    },
  });

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage("Confirmation token not found in URL.");
      return;
    }

    if (isEmailUpdate || isRevert) {
      confirmEmailUpdateMutation({ variables: { token } });
    } else {
      confirmEmailMutation({ variables: { token } });
    }
  }, [searchParams, confirmEmailMutation, confirmEmailUpdateMutation, isEmailUpdate, isRevert]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Loading */}
          {status === 'loading' && (
            <>
              <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 mb-4">
                <svg 
                  className="animate-spin h-12 w-12 text-blue-600" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Confirming your account...
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your email address.
              </p>
            </>
          )}

          {/* Success */}
          {status === 'success' && (
            <>
              <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Account Confirmed!
              </h2>
              <p className="text-gray-600 mb-4">
                {message}
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-sm text-blue-700">
                  You will be redirected to the home page in a few seconds...
                </p>
              </div>
              <div className="mt-6">
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Go to home now
                </a>
              </div>
            </>
          )}

          {/* Error */}
          {status === 'error' && (
            <>
              <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-12 w-12 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Confirmation Error
              </h2>
              <p className="text-gray-600 mb-4">
                {message}
              </p>
              <div className="mt-6 space-y-2">
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 mr-2"
                >
                  Ir al inicio
                </a>
                <a
                  href="/register"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Registrarse nuevamente
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
