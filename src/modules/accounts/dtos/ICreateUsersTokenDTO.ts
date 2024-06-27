interface ICreateUserTokenDTO {
  user_id?: string;
  expire?: Date;
  token?: string;
}

export { ICreateUserTokenDTO };
