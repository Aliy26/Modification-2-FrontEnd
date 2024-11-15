import { NoticeCategory, NoticeStatus } from "../../enums/notice.enum";

export interface Notice {
  _id: string;
  noticeStatus: NoticeStatus;
  noticeCategory: NoticeCategory;
  noticeImage?: string;
  eventCity?: string;
  noticeTitle: string;
  noticeContent: string;
}

export interface EventNoticeInquiry {
  noticeCategory?: NoticeCategory;
  noticeStatus: NoticeStatus;
}
