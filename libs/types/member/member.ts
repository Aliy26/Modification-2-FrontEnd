import {
  MemberAuthType,
  MemberStatus,
  MemberType,
} from "../../enums/member.enum";
import { MeLiked, TotalCounter } from "../product/product";
import { MeFollowed } from "../follow/follow";

export interface Member {
  _id: string;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberAuthType: MemberAuthType;
  memberPhone: string;
  memberNick: string;
  memberPassword?: string;
  memberFullName?: string;
  memberImage?: string;
  memberEmail?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberProducts: number;
  mainMember?: boolean | null;
  memberRank: number;
  memberArticles: number;
  memberPoints: number;
  memberLikes: number;
  memberFollowers?: number;
  memberFollowings?: number;
  memberViews: number;
  memberComments: number;
  memberWarnings: number;
  memberBlocks: number;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  // Enable for authentications
  meLiked?: MeLiked[];
  meFollowed?: MeFollowed[];
  accessToken?: string;
}

export interface Members {
  list: Member[];
  metaCounter: TotalCounter[];
}
