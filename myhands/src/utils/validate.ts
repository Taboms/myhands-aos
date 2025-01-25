type UserInfomation = {
  id: string;
  password: string;
};

function validateUser(values: UserInfomation) {
  const errors = {
    id: '',
    password: '',
  };

  if (!(values.id.length >= 8 && values.id.length < 20)) {
    errors.id = '올바른 아이디 형식이 아닙니다.';
  }

  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
}

function validateLogin(values: UserInfomation) {
  return validateUser(values);
}

function validateSignup(values: UserInfomation & {passwordConfirm: string}) {
  const errors = validateUser(values);
  const signupErrors = {...errors, passwordConfirm: ''};

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  return signupErrors;
}

export {validateLogin, validateSignup};
