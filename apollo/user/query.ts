import { gql } from "@apollo/client";

/**************************
 *         MEMBER         *
 *************************/

export const GET_AGENTS = gql`
  query GetAgents($input: AgentsInquiry!) {
    getAgents(input: $input) {
      list {
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
        updatedAt
        accessToken
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
        meFollowed {
          followingId
          followerId
          myFollowing
        }
        createdAt
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_MEMBER = gql(`
query GetMember($input: String!) {
    getMember(memberId: $input) {
        _id
        memberType
        memberStatus
        memberAuthType
        memberPhone
        memberNick
        memberEmail
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberProducts
        mainMember
        memberArticles
        memberPoints
        memberLikes
        memberViews
        memberFollowings
				memberFollowers
        memberRank
        memberWarnings
        memberBlocks
        deletedAt
        createdAt
        updatedAt
        accessToken
        meFollowed {
					followingId
					followerId
					myFollowing
				}
    }
}
`);

/**************************
 *        PRODUCT        *
 *************************/

export const GET_PRODUCT = gql`
  query GetProduct($input: String!) {
    getProduct(productId: $input) {
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
      discountedPrice
      productStock
      productDesc
      productInstallment
      productRent
      memberId
      soldAt
      deletedAt
      manufacturedIn
      createdAt
      updatedAt
      meLiked {
        memberId
        likeRefId
        myFavorite
      }
      memberData {
        _id
        memberType
        memberStatus
        memberAuthType
        memberPhone
        memberNick
        memberEmail
        memberFullName
        memberImage
        memberAddress
        memberDesc
        mainMember
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

export const GET_PRODUCTS = gql`
  query GetProducts($input: ProductsInquiry!) {
    getProducts(input: $input) {
      list {
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
        memberData {
          _id
          memberType
          memberStatus
          memberAuthType
          memberPhone
          memberNick
          memberEmail
          memberFullName
          memberImage
          memberAddress
          memberDesc
          mainMember
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
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
        discountedPrice
        productStock
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_AGENT_PRODUCTS = gql`
  query GetAgentProducts($input: AgentProductsInquiry!) {
    getAgentProducts(input: $input) {
      list {
        _id
        productType
        productStatus
        productCategory
        productBrand
        productName
        productPrice
        discountedPrice
        productStock
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
        memberData {
          _id
          memberType
          memberStatus
          memberAuthType
          memberPhone
          memberNick
          memberEmail
          memberFullName
          memberImage
          memberAddress
          memberDesc
          mainMember
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
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_FAVORITES = gql`
  query GetFavorites($input: OrdinaryInquiry!) {
    getFavorites(input: $input) {
      list {
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
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
        memberData {
          _id
          memberType
          memberStatus
          memberAuthType
          memberPhone
          memberNick
          memberEmail
          memberFullName
          memberImage
          memberAddress
          memberDesc
          mainMember
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
      metaCounter {
        total
      }
    }
  }
`;

export const GET_VISITED = gql`
  query GetVisited($input: OrdinaryInquiry!) {
    getVisited(input: $input) {
      list {
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
        memberData {
          _id
          memberType
          memberStatus
          memberAuthType
          memberPhone
          memberNick
          memberEmail
          memberFullName
          memberImage
          memberAddress
          memberDesc
          mainMember
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
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const GET_BOARD_ARTICLE = gql`
  query GetBoardArticle($input: String!) {
    getBoardArticle(articleId: $input) {
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
      meLiked {
        memberId
        likeRefId
        myFavorite
      }
    }
  }
`;

export const GET_BOARD_ARTICLES = gql`
  query GetBoardArticles($input: BoardArticlesInquiry!) {
    getBoardArticles(input: $input) {
      list {
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
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
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
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *         COMMENT        *
 *************************/

export const GET_COMMENTS = gql`
  query GetComments($input: CommentsInquiry!) {
    getComments(input: $input) {
      list {
        _id
        commentStatus
        commentGroup
        commentContent
        commentRefId
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
          memberEmail
          memberFullName
          memberImage
          memberAddress
          memberDesc
          mainMember
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
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *         FOLLOW        *
 *************************/
export const GET_MEMBER_FOLLOWERS = gql`
  query GetMemberFollowers($input: FollowInquiry!) {
    getMemberFollowers(input: $input) {
      list {
        _id
        followingId
        followerId
        createdAt
        updatedAt
        followerData {
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
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
        meFollowed {
          followingId
          followerId
          myFollowing
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_MEMBER_FOLLOWINGS = gql`
  query GetMemberFollowings($input: FollowInquiry!) {
    getMemberFollowings(input: $input) {
      list {
        _id
        followingId
        followerId
        createdAt
        followingData {
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
        meLiked {
          memberId
          likeRefId
          myFavorite
        }
        meFollowed {
          followingId
          followerId
          myFollowing
        }
        updatedAt
      }
      metaCounter {
        total
      }
    }
  }
`;

/**************************
 *         NOTIFICATION        *
 *************************/

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    getNotifications {
      list {
        _id
        notificationType
        notificationStatus
        notificationGroup
        notificationTitle
        notificationDesc
        authorId
        receiverId
        productId
        articleId
        createdAt
        authorData {
          _id
          memberType
          memberStatus
          memberAuthType
          memberPhone
          memberNick
          memberEmail
          memberFullName
          memberImage
          memberAddress
          memberDesc
          mainMember
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
        productData {
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
        articleData {
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
    }
  }
`;

/**************************
 *         NOTICE        *
 *************************/

export const GET_NOTICES = gql`
  query GetNotices($input: EventNoticeInquiry!) {
    getNotices(input: $input) {
      _id
      noticeCategory
      noticeStatus
      noticeTitle
      noticeContent
      field
      noticeImage
      eventCity
      memberId
      createdAt
      updatedAt
    }
  }
`;

export const GET_NOTICE_FIELDS = gql`
  query GetNoticeFields($input: Boolean!) {
    getNoticeFields(input: $input)
  }
`;
