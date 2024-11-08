import {
  NotificationGroup,
  NotificationStatus,
  NotificationTitle,
  NotificationType,
} from "../../enums/notification.enum";
import { BoardArticle } from "../board-article/board-article";
import { Member } from "../member/member";
import { Property } from "../product/product";

export interface Notification {
  _id: string;
  notificationType: NotificationType;
  notificationStatus: NotificationStatus;
  notificationGroup: NotificationGroup;
  notificationTitle: NotificationTitle;
  notificationDesc?: string;
  authorId: string;
  receiverId: string;
  productId?: string;
  articleId?: string;
  authorData?: Member;
  propertyData?: Property;
  articleData?: BoardArticle;
  createdAt: Date;
}
