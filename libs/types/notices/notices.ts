import {
  FAQFeild,
  NoticeCategory,
  NoticeStatus,
} from "../../enums/notice.enum";

export interface Notice {
  _id: string;
  noticeStatus: NoticeStatus;
  noticeCategory: NoticeCategory;
  field?: FAQFeild;
  noticeImage?: string;
  eventCity?: string;
  noticeTitle: string;
  noticeContent: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EventNoticeInquiry {
  noticeCategory?: NoticeCategory;
  noticeStatus?: NoticeStatus;
}
