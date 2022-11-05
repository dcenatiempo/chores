import { FC, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { Button, PasswordInput, TextInput } from '../../components/base';
import { login, register, useIsAuthenticated } from '../../libs/authentication';
import { useRouter } from 'next/router';
import PageWrapper from '../../components/nav/PageWrapper';

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Login: NextPage = () => {
  const [isRegister, setisRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const hasClickedLogin = useRef(false);
  const { isAuthenticated } = useIsAuthenticated();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) return;
    let returnUrl = router.query.returnUrl || '/';
    returnUrl = Array.isArray(returnUrl) ? returnUrl[0] : returnUrl;
    router.push(returnUrl);
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (hasClickedLogin.current) validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, confirmPassword]);

  function validEmail() {
    var emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(email);
  }

  function validPassword() {
    return password.length >= 8;
  }

  function passwordsMatch() {
    if (!isRegister) return true;
    return password === confirmPassword;
  }

  function validateForm() {
    const newFormErrors: FormErrors = {};
    if (!validEmail()) newFormErrors.email = 'Invalid Email';
    if (!validPassword())
      newFormErrors.password =
        'Password needs to be at least 8 characters long';
    if (isRegister && !passwordsMatch())
      newFormErrors.confirmPassword = 'Passwords must match';

    setFormErrors(newFormErrors);
    return newFormErrors;
  }

  function onClickLogin() {
    hasClickedLogin.current = true;
    const newFormErrors = validateForm();
    if (Object.keys(newFormErrors).length) return;

    if (isRegister) registerUser();
    else loginUser();
  }

  function registerUser() {
    register({ email, password }).catch((error) => {
      console.log(error);
      setErrorMessage(error?.message || 'Something went wrong, try again.');
    });
  }

  function loginUser() {
    login({ email, password }).catch((error) => {
      setErrorMessage(error?.message || 'Something went wrong, try again.');
    });
  }

  return (
    <PageWrapper metaTitle="Chore Login">
      <h1>Login</h1>

      <TextInput
        label="Email"
        onChange={setEmail}
        value={email}
        errorMessage={formErrors.email}
      />

      <PasswordInput
        label="Password"
        onChange={setPassword}
        value={password}
        errorMessage={formErrors.password}
      />

      {isRegister && (
        <>
          <PasswordInput
            errorMessage={formErrors.confirmPassword}
            label="Confirm Password"
            onChange={setConfirmPassword}
            value={confirmPassword}
          />
        </>
      )}
      <Button
        label={isRegister ? 'Register' : 'Login'}
        onClick={onClickLogin}
      />
      <ErrorMessage message={errorMessage} />
    </PageWrapper>
  );
};

export default Login;

const ErrorMessage: FC<{ message?: string }> = ({ message }) => {
  return message ? <span style={{ color: 'red' }}>{message}</span> : <span />;
};

// {
//     "error": {
//       "code": 400,
//       "message": "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
//       "errors": [
//         {
//           "message": "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
//           "domain": "global",
//           "reason": "invalid"
//         }
//       ]
//     }
//   }
