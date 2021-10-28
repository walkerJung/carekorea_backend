import { gql } from "apollo-server";

export default gql`
  type Announcement {
    status: Int!
    userCode: Int!
    needMealCare: String!
    needUrineCare: String!
    needSuctionCare: String!
    needMoveCare: String!
    needBedCare: String!
    needHygieneCare: String!
    caregiverMeal: String!
    infectiousDisease: String!
    title: String!
    startDate: String!
    endDate: String!
    protectorName: String!
    protectorPhone: String!
    patientName: String!
    patientAge: Int!
    patientWeight: Int!
    address: String!
    addressDetail: String!
    nursingGrade: String!
    disease: String!
    isolation: Boolean!
  }

  type AnnouncementQueryResult {
    announcements: [Announcement]!
    result: Boolean!
  }

  type Query {
    listAnnouncement: AnnouncementQueryResult!
  }
`;
