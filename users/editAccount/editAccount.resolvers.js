import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    editAccount: async (_, { phone, userName, password }, { loggedInUser }) => {
      try {
        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.update({
          where: {
            code: loggedInUser.code,
          },
          data: {
            phone,
            userName,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "회원정보 수정을 실패하였습니다. 관리자에게 문의해주세요.",
        };
      }
    },
  },
};
