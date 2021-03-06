import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    editAccount: async (
      _,
      { userCode, phone, userName, password },
      { loggedInUser }
    ) => {
      try {
        const user = await client.user.findUnique({
          where: {
            code: userCode,
          },
        });

        if (loggedInUser.code != user.code) {
          throw new Error("잘못된 접근입니다.");
        }

        if (phone) {
          await client.user.update({
            where: {
              code: user.code,
            },
            data: {
              phone,
            },
          });
          return {
            ok: true,
          };
        }

        if (userName) {
          await client.user.update({
            where: {
              code: user.code,
            },
            data: {
              userName,
            },
          });
          return {
            ok: true,
          };
        }

        if (password) {
          const uglyPassword = await bcrypt.hash(password, 10);
          await client.user.update({
            where: {
              code: user.code,
            },
            data: {
              password: uglyPassword,
            },
          });
          return {
            ok: true,
          };
        }
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "회원정보 수정을 실패하였습니다. 관리자에게 문의해주세요.",
        };
      }
    },
  },
};
