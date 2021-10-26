import client from "../../client";

export default {
  Mutation: {
    addCaregiverInfo: async (
      _,
      {
        userCode,
        residentNumber,
        idCard,
        smoke,
        drink,
        mealCare,
        urineCare,
        suctionCare,
        moveCare,
        bedCare,
        address,
        addressDetail,
        bankInfo,
      }
    ) => {
      try {
        const existUser = await client.user.findUnique({
          where: {
            id: userCode,
          },
        });
        if (!existUser) {
          throw new Error("잘못된 접근입니다.");
        }
        var writeIP = ""; // IP 주소
        require("dns").lookup(
          require("os").hostname(),
          function (err, add, fam) {
            console.log(add);
            writeIP = add;
          }
        );
        await client.caregiverInfo.create({
          data: {
            userCode,
            residentNumber,
            idCard,
            smoke,
            drink,
            mealCare,
            urineCare,
            suctionCare,
            moveCare,
            bedCare,
            address,
            addressDetail,
            bankInfo,
            writeIP,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "간병인 정보 입력에 실패하였습니다. 관리자에게 문의해주세요.",
        };
      }
    },
  },
};
