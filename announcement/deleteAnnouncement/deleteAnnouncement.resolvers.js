import client from "../../client";

export default {
  Mutation: {
    deleteAnnouncement: async (_, { announcementCode }) => {
      try {
        if (!announcementCode) {
          throw new Error("잘못된 접근입니다.");
        }
        const announcement = await client.announcement.findUnique({
          where: {
            code: announcementCode,
          },
        });
        if (!announcement) {
          throw new Error("이미 삭제된 공고입니다.");
        }
        await client.announcementApplication.deleteMany({
          where: {
            announcementCode,
          },
        });
        await client.announcement.delete({
          where: {
            code: announcementCode,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "공고 삭제에 실패하였습니다. 관리자에게 문의해주세요.",
        };
      }
    },
  },
};
