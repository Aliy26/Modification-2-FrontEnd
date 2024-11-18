import { gql } from "@apollo/client";

/**************************
 *         MEMBER         *
 *************************/

export const UPDATE_MEMBER_BY_ADMIN = gql`
  mutation UpdateMemberByAdmin($input: MemberUpdate!) {
    updateMemberByAdmin(input: $input) {
      _id
      memberType
      memberStatus
      memberAuthType
      memberPhone
      memberNick
      memberFullName
      memberImage
      memberAddress
      memberDesc
      memberProducts
      memberArticles
      memberFollowers
      memberFollowings
      memberPoints
      memberLikes
      memberViews
      memberComments
      memberRank
      memberWarnings
      memberBlocks
      deletedAt
      createdAt
      updatedAt
      accessToken
      mainMember
      memberEmail
    }
  }
`;

/**************************
 *        PROPERTY        *
 *************************/

export const UPDATE_PRODUCT_BY_ADMIN = gql`
  mutation UpdateProductByAdmin($input: ProductUpdate!) {
    updateProductByAdmin(input: $input) {
      _id
      productType
      productStatus
      productCategory
      productBrand
      productName
      productPrice
      productViews
      productLikes
      productComments
      productRank
      productImages
      productDesc
      productInstallment
      productRent
      memberId
      soldAt
      deletedAt
      manufacturedIn
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_PROPERTY_BY_ADMIN = gql`
  mutation RemoveProductsByAdmin($input: String!) {
    removeProductsByAdmin(productId: $input) {
      _id
      productType
      productStatus
      productCategory
      productBrand
      productName
      productPrice
      productViews
      productLikes
      productComments
      productRank
      productImages
      productDesc
      productInstallment
      productRent
      memberId
      soldAt
      deletedAt
      manufacturedIn
      createdAt
      updatedAt
    }
  }
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const UPDATE_BOARD_ARTICLE_BY_ADMIN = gql`
  mutation UpdateBoardArticleByAdmin($input: BoardArticleUpdate!) {
    updateBoardArticleByAdmin(input: $input) {
      _id
      articleCategory
      articleStatus
      articleTitle
      articleContent
      articleImage
      articleViews
      articleLikes
      articleComments
      memberId
      createdAt
      updatedAt
      memberData {
        _id
        memberType
        memberStatus
        memberAuthType
        memberPhone
        memberNick
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberProducts
        memberArticles
        memberFollowers
        memberFollowings
        memberPoints
        memberLikes
        memberViews
        memberComments
        memberRank
        memberWarnings
        memberBlocks
        deletedAt
        createdAt
        updatedAt
        accessToken
      }
    }
  }
`;

export const REMOVE_BOARD_ARTICLE_BY_ADMIN = gql`
  mutation RemoveBoardArticleByAdmin($input: String!) {
    removeBoardArticleByAdmin(articleId: $input) {
      _id
      articleCategory
      articleStatus
      articleTitle
      articleContent
      articleImage
      articleViews
      articleLikes
      articleComments
      memberId
      createdAt
      updatedAt
    }
  }
`;

/**************************
 *         COMMENT        *
 *************************/

export const REMOVE_COMMENT_BY_ADMIN = gql`
  mutation RemoveCommentByAdmin($input: String!) {
    removeCommentByAdmin(commentId: $input) {
      _id
      commentStatus
      commentGroup
      commentContent
      commentRefId
      memberId
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_NOTICE_BY_ADMIN = gql`
  mutation UpdateNotice($input: NoticeUpdate!) {
    updateNotice(input: $input) {
      _id
      noticeCategory
      noticeStatus
      noticeTitle
      noticeContent
      noticeImage
      memberId
    }
  }
`;

export const DELETE_NOTICE = gql`
  mutation DeleteNotice($input: String!) {
    deleteNotice(noticeId: $input) {
      _id
      noticeCategory
      field
      noticeStatus
      noticeTitle
      noticeContent
      noticeImage
      eventCity
      memberId
      createdAt
      updatedAt
    }
  }
`;
