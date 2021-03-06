import bcrypt from "bcrypt";
import client from "../../client";
import { GraphQLUpload, graphqlUploadExpress } from "graphql-upload";
import { fileUpload } from "../../common/fileUpload";

export default {
  Upload: GraphQLUpload,

  Mutation: {
    editCaregiverInfo: async (
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
        introduce,
      },
      { loggedInUser }
    ) => {
      try {
        if (idCard) {
          const { createReadStream, filename, mimetype } = await idCard;
          const extension = filename.split(".").pop();
          const stream = createReadStream();
          const uploadDir = `./files/idCard`;

          const { fileName } = await fileUpload({
            uploadDir,
            stream,
            userId: loggedInUser.userId,
            extension,
          });

          await client.caregiverInfo.update({
            where: { userCode: loggedInUser.code },
            data: {
              idCard: `/files/idCard/${fileName}`,
            },
          });
        }
        if (bankInfo) {
          const { createReadStream, filename, mimetype } = await bankInfo;
          const extension = filename.split(".").pop();
          const stream = createReadStream();
          const uploadDir = `./files/bankInfo`;

          const { fileName } = await fileUpload({
            uploadDir,
            stream,
            userId: loggedInUser.userId,
            extension,
          });

          await client.caregiverInfo.update({
            where: { userCode: loggedInUser.code },
            data: {
              bankInfo: `/files/bankInfo/${fileName}`,
            },
          });
        }

        if (loggedInUser.code != userCode) {
          throw new Error("잘못된 접근입니다.");
        }

        if (!idCard && !bankInfo) {
          await client.caregiverInfo.update({
            where: {
              userCode,
            },
            data: {
              residentNumber,
              smoke,
              drink,
              mealCare,
              urineCare,
              suctionCare,
              moveCare,
              bedCare,
              address,
              addressDetail,
              introduce,
            },
          });
        }

        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "간병인정보 수정에 실패하였습니다. 관리자에게 문의해주세요.",
        };
      }
    },
  },
};
