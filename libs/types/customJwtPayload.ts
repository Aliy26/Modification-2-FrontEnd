import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  _id: string;
  memberType: string;
  memberStatus: string;
  memberAuthType: string;
  memberPhone: string;
  memberNick: string;
  memberEmail: string;
  memberFullName?: string;
  memberImage?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberProducts: number;
  mainMember?: boolean | null;
  memberRank: number;
  memberArticles: number;
  memberPoints: number;
  memberLikes: number;
  memberViews: number;
  memberWarnings: number;
  memberBlocks: number;
}
