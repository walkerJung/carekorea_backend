import client from "../../client";

export default {
  Query: {
    caregiverGroupByAnnouncement: async (
      _,
      { userCode, status, take, skip }
    ) => {
      try {
        const announcementApplication =
          await client.announcementApplication.findMany({
            where: {
              userCode,
            },
          });

        const announcements = [];
        announcementApplication.map(async (item) => {
          const announcement = await client.announcement.findUnique({
            where: {
              code: item.announcementCode,
            },
          });
          console.log(announcement);
          await announcements.push(announcement);
        });
        console.log(announcements);
        return {
          announcements,
          count: announcements.length,
          result: true,
        };
      } catch (e) {
        return {
          result: false,
        };
      }
    },
  },
};