import {
  NotificationGroup,
  NotificationStatus,
  NotificationTitle,
  NotificationType,
} from "../../enums/notification.enum";
import { BoardArticle } from "../board-article/board-article";
import { Member } from "../member/member";
import { Property } from "../property/property";

export interface Notification {
  _id: string;
  notificaitonType: NotificationType;
  notificationStatus: NotificationStatus;
  notificationGroup: NotificationGroup;
  notificationTitle: NotificationTitle;
  notificationDesc?: string;
  authorId: string;
  receiverId: string;
  propertyId?: string;
  articleId?: string;
  authorData?: Member;
  propertyData?: Property;
  articleData?: BoardArticle;
}
