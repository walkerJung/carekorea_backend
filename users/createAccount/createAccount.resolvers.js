import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { userId, userType, userName, password, sex, phone }
    ) => {
      try {
        var writeIP = ""; // IP 주소
        require("dns").lookup(
          require("os").hostname(),
          function (err, add, fam) {
            writeIP = add;
          }
        );
        const existingUserId = await client.user.findUnique({
          where: {
            userId,
          },
        });
        if (existingUserId) {
          throw new Error("동일한 회원아이디가 존재합니다.");
        }
        const existingUserPhone = await client.user.findUnique({
          where: {
            phone,
          },
        });
        if (existingUserPhone) {
          throw new Error("동일한 회원연락처가 존재합니다.");
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            userId,
            userType,
            userName,
            password: uglyPassword,
            sex,
            phone,
            writeIP,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    },
  },
};
