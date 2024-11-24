import {
  NotificationGroup,
  NotificationStatus,
  NotificationTitle,
  NotificationType,
} from "../../enums/notification.enum";
import { BoardArticle } from "../board-article/board-article";
import { Member } from "../member/member";
import { Product } from "../product/product";

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
  productData?: Product;
  articleData?: BoardArticle;
  createdAt: Date;
}

export interface MessageInput {
  productId: string;
  notificationDesc: string;
}
