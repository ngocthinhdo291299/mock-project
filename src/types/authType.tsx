export interface registerDataType {
  user: registerInputDataType;
}

export interface loginDataType {
  user: loginInputDataType;
}

export interface registerInputDataType {
  username: string;
  email: string;
  password: string;
}

export interface loginInputDataType {
  email: string;
  password: string;
}
