import bcrypt from "bcrypt";
import { UserFacade } from "../facades/UserFacade";
import { User, Response } from "../models/types/User";
import {
  codeUserVerification,
  mailOption,
  mailOptionGeneratePassword,
  sendEmail,
  transporter,
} from "../utils/nodeMailer/Functions";
import { QueryResponse } from "../models/responses/UserResponse";
import jwt from "jsonwebtoken";
import { deleteImage } from "../utils/cloudinary/Cloudinary";
import { getImageFromCacheOrCloudinary } from "../utils/cacheFunction/CacheFunction";

const facade = new UserFacade();

export class UserHelper {
  async getAllUsers(data?: any): Promise<Response | User[]> {
    const { userPerPage, userStatus } = data;

    const users: User[] = await facade.getAllUsers(data, true);

    if (!users || !users[0]) return { users: [] };

    if (userStatus === "isVoluntary") {
      for (const e of users) {
        if (e.avatar.secure_url) {
          const buffer = await getImageFromCacheOrCloudinary(
            e.avatar.secure_url
          );

          //convertir el buffer en una url para mandar al front

          const base64Image = Buffer.from(buffer).toString("base64");

          // tipo de imagen: .jpg, .png etc.
          const type = e.avatar.secure_url.match(/\.([^.]+)$/);
          if (!type) return null;
          const contentType = type[1].toLowerCase();

          const imageUrl = `data:${contentType};base64,${base64Image}`;

          e.avatar.imageUrl = imageUrl;
        }
      }
    }

    if (userPerPage) {
      const quantity = await facade.countUsers({
        where: { isVoluntary: true },
      });

      const totalPages = Math.ceil(quantity / userPerPage);

      return { totalPages, users };
    }
    return { users };
  }

  async getUserById(id: string, filter?: string): Promise<User> {
    return await facade.getUserById(id, filter);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await facade.getUserByEmail(email);
  }

  async checkNickName(nick: string): Promise<boolean> {
    return await facade.checkNickName(nick);
  }

  async createUser(data: any): Promise<User> {
    const { email, first_name } = data;

    const nickName = email.split("@")[0];

    const nameCapitalWord =
      data.last_name.charAt(0).toUpperCase() +
      data.last_name.slice(1).toLowerCase();

    const code = codeUserVerification();

    const passHashed = await bcrypt.hash(data.password, 10);

    data.password = passHashed;
    const userData = {
      ...data,
      nick_name: nickName,
      last_name: nameCapitalWord,
      emailValidateCode: code,
    };

    const newUser = await facade.createUser(userData);
    if (!newUser) return null;

    const emailMessage = mailOption(email, first_name, code);

    await sendEmail(emailMessage);

    return newUser;
  }

  async getJWTUserLogIn(email: string): Promise<string> {
    const token = jwt.sign({ email }, process.env.SECRET_KEY_JWT, {
      expiresIn: 24 * 60 * 60,
    }); // => 1 dia24 * 60 * 60

    return token;
  }

  async encryptDataUser(user: User): Promise<string> {
    const dataEncrypted = jwt.sign({ user }, process.env.SECRET_KEY_DATA_JWT);
    return dataEncrypted;
  }

  async createUserAuth0(data: any): Promise<User> {
    const userData = {
      ...data,
      userEmailValidate: true,
      registerWithAuth0: true,
    };
    const newUser = await facade.createUser(userData);
    if (!newUser) return null;
    return newUser;
  }

  async updateUser(id: string, user: User, data: any): Promise<User> {
    const { avatar } = data;

    if (avatar && user.avatar.public_id) {
      await deleteImage(user.avatar.public_id);
    }
    await facade.updateUser(id, data);
    const userUpdated = await facade.getUserById(id);
    if (!userUpdated) return null;
    return userUpdated;
  }

  async adminAction(id: string, action: any): Promise<User> {
    return await facade.updateUser(id, action);
  }

  async userEmailValidated(user: User, code: string): Promise<User> {
    const data = {
      // emailValidateCode: code,
      userEmailValidate: true,
    };
    const userUpdated = await facade.updateUser(user.id, data);
    if (!userUpdated) return null;
    return userUpdated;
  }

  async createNewCode(user: User): Promise<string> {
    // const newCode = codeUserVerification()
    // const userUpdated = await facade.updateUser(user.id, { emailValidateCode: newCode })

    // if (!userUpdated) return null

    const emailMessage = mailOption(
      user.email,
      user.first_name,
      user.emailValidateCode
    );

    const response: string = await sendEmail(emailMessage);

    return response;
  }

  async generateNewPassword(user: User): Promise<User> {
    const newPass = codeUserVerification();

    const passHashed = await bcrypt.hash(newPass, 10);

    const userUpdated = await facade.updateUser(user.id, {
      password: passHashed,
    });

    const emailMessage = mailOptionGeneratePassword(
      user.email,
      user.first_name,
      newPass
    );

    await sendEmail(emailMessage);

    return userUpdated;
  }

  async updatePassword(id: string, newPassword: string): Promise<User> {
    const passHashed = await bcrypt.hash(newPassword, 10);

    return await facade.updateUser(id, { password: passHashed });
  }

  async voluntaryTypes(): Promise<object[]> {
    const types = [
      {
        name: "Presencial",
        formUrl: "https://forms.gle/nUPgJCdNUauw4Prb6 ",
        image:
          "https://res.cloudinary.com/de5xjegp3/image/upload/v1707074307/STATIC%20IMAGE/WhatsApp_Image_2024-01-04_at_19.37.28_uezdfr.jpg",
      },
      {
        name: "Online",
        formUrl: "https://forms.gle/3s4i2z9RUKEMjPN76",
        image: "",
      },
      {
        name: "Transito",
        formUrl: "https://forms.gle/Py6i7Fnf9GS4W7rq7",
        image: "",
      },
      {
        name: "Programador",
        formUrl: "https://forms.gle/BJJZeHApJ18mJ2ZW7 ",
        image: "",
      },
      {
        name: "Profesional",
        formUrl: "https://forms.gle/EsWDbhifPceMhDqN7",
        image:
          "https://res.cloudinary.com/de5xjegp3/image/upload/v1707074306/STATIC%20IMAGE/WhatsApp_Image_2024-01-04_at_19.37.27_cckzb1.jpg",
      },
      {
        name: "Marketing",
        formUrl: "https://forms.gle/rFPDPTedLudMebWR6",
        image:
          "https://res.cloudinary.com/de5xjegp3/image/upload/v1707074307/STATIC%20IMAGE/WhatsApp_Image_2024-01-04_at_19.37.29_1_cnqqeh.jpg",
      },
      {
        name: "Redes",
        formUrl: "https://forms.gle/JP3pHARF3hWXSuZV6",
        image:
          "https://res.cloudinary.com/de5xjegp3/image/upload/v1707074306/STATIC%20IMAGE/WhatsApp_Image_2024-01-04_at_19.37.28_1_frppqi.jpg",
      },
      {
        name: "General",
        formUrl: "https://forms.gle/kuJcvbzswNv2grBx7 ",
        image:
          "https://res.cloudinary.com/de5xjegp3/image/upload/v1707074307/STATIC%20IMAGE/WhatsApp_Image_2024-01-04_at_19.37.29_rhcw2c.jpg",
      },
    ];

    return types;
  }
}
