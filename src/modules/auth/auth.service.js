import { UserModel } from "../../models/user.models.js";
import { ConflictException, NotFoundException } from "../../common/utils/reseponce/error.reseponce.js";
import { ProviderEnums } from "../../common/enums/enms.service.js";
import { findOne } from "../../database/database.service.js";

export const signup = async (data) => {
  const { userName, email, password, phone, provider, gender} = data;

 const existuser = await findOne({
  model: UserModel,
  filter: { email },
  select: "password"
});

  if (existuser) {
    return ConflictException({ message: "Email already exists" });
  }
  let addeduser= await UserModel.insertOne({userName,email,password,phone,gender})
return addeduser
  
 
};
export const login = async (data) => {
  const { email, password } = data;

  const existuser = await findOne({
  model: UserModel,
  filter: {
    email,
    password,
    provider: ProviderEnums.System
  }
});

  if (existuser) {
    return existuser;
  }

  return NotFoundException({ message: "user not found", extra: undefined });
};
