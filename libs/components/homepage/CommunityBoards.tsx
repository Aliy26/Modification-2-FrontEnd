import React, { useEffect, useState } from "react";
import Link from "next/link";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Stack, Typography } from "@mui/material";
import CommunityCard from "./CommunityCard";
import { BoardArticle } from "../../types/board-article/board-article";
import { GET_BOARD_ARTICLES } from "../../../apollo/user/query";
import { useQuery } from "@apollo/client";
import { BoardArticleCategory } from "../../enums/board-article.enum";
import { T } from "../../types/common";

const CommunityBoards = () => {
  const device = useDeviceDetect();
  const [searchCommunity, setSearchCommunity] = useState({
    page: 1,
    sort: "articleViews",
    direction: "DESC",
  });
  const [newsArticles, setNewsArticles] = useState<BoardArticle[]>([]);
  const [freeArticles, setFreeArticles] = useState<BoardArticle[]>([]);
  const [humorArticles, setHumorArticles] = useState<BoardArticle[]>([]);
  const [recommendArticle, setRecommendArticle] = useState<BoardArticle[]>([]);

  /** APOLLO REQUESTS **/
  const {
    loading: getNewsArticlesLoading,
    data: getNewsArticlesData,
    error: getNewsArticlesError,
    refetch: getNewsArticlesRefetch,
  } = useQuery(GET_BOARD_ARTICLES, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: {
        ...searchCommunity,
        limit: 6,
        search: { articleCategory: BoardArticleCategory.NEWS },
      },
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setNewsArticles(data?.getBoardArticles?.list);
    },
  });

  const {
    loading: getFreeArticlesLoading,
    data: getFreeArticlesData,
    error: getFreeArticlesError,
    refetch: getFreeArticlesRefetch,
  } = useQuery(GET_BOARD_ARTICLES, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: {
        ...searchCommunity,
        limit: 6,
        search: { articleCategory: BoardArticleCategory.FREE },
      },
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setFreeArticles(data?.getBoardArticles?.list);
    },
  });

  const {
    loading: getHumorArticlesLoading,
    data: getHumorArticlesData,
    error: getHumorArticlesError,
    refetch: getHumorArticlesRefetch,
  } = useQuery(GET_BOARD_ARTICLES, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: {
        ...searchCommunity,
        limit: 6,
        search: { articleCategory: BoardArticleCategory.HUMOR },
      },
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setHumorArticles(data?.getBoardArticles?.list);
    },
  });

  const {
    loading: getRecommendationArticlesLoading,
    data: getRecommendationArticlesData,
    error: getRecommendationArticlesError,
    refetch: getRecommendationArticlesRefetch,
  } = useQuery(GET_BOARD_ARTICLES, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: {
        ...searchCommunity,
        limit: 6,
        search: { articleCategory: BoardArticleCategory.RECOMMEND },
      },
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setRecommendArticle(data?.getBoardArticles?.list);
    },
  });

  if (device === "mobile") {
    return <div>COMMUNITY BOARDS (MOBILE)</div>;
  } else {
    return (
      <Stack className={"community-board"}>
        <Stack className={"container"}>
          <Stack>
            <Typography variant={"h1"}>COMMUNITY BOARD HIGHLIGHTS</Typography>
          </Stack>
          <Stack className="community-main">
            {recommendArticle.length ? (
              <Stack className={"community-news"}>
                <Stack className={"content-top"}>
                  <Link href={"/community?articleCategory=NEWS"}>
                    <span>NEWS</span>
                  </Link>
                  <img src="/img/icons/article.svg" alt="" />
                </Stack>
                <Stack className={"card-wrap"}>
                  {newsArticles.map((article, index) => {
                    return (
                      <CommunityCard
                        vertical={true}
                        article={article}
                        index={index}
                        key={article?._id}
                      />
                    );
                  })}
                </Stack>
              </Stack>
            ) : (
              ""
            )}
            {recommendArticle.length ? (
              <Stack className={"community-humor"}>
                <Stack className={"content-top"}>
                  <Link href={"/community?articleCategory=HUMOR"}>
                    <span>Humor</span>
                  </Link>
                  <img src="/img/icons/article.svg" alt="" />
                </Stack>
                <Stack className={"card-wrap"}>
                  {humorArticles.map((article, index) => {
                    return (
                      <CommunityCard
                        vertical={true}
                        article={article}
                        index={index}
                        key={article?._id}
                      />
                    );
                  })}
                </Stack>
              </Stack>
            ) : (
              ""
            )}
            {recommendArticle.length ? (
              <Stack className={"community-recommendation"}>
                <Stack className={"content-top"}>
                  <Link href={"/community?articleCategory=RECOMMEND"}>
                    <span>Recommendation</span>
                  </Link>
                  <img src="/img/icons/article.svg" alt="" />
                </Stack>
                <Stack className={"card-wrap"}>
                  {recommendArticle.map((article, index) => {
                    return (
                      <CommunityCard
                        vertical={true}
                        article={article}
                        index={index}
                        key={article?._id}
                      />
                    );
                  })}
                </Stack>
              </Stack>
            ) : (
              ""
            )}
            <Stack className={"community-free"}>
              <Stack className={"content-top"}>
                <Link href={"/community?articleCategory=FREE"}>
                  <span>Free</span>
                </Link>
                <img src="/img/icons/article.svg" alt="" />
              </Stack>
              <Stack className={"card-wrap vertical"}>
                {freeArticles.map((article, index) => {
                  return (
                    <CommunityCard
                      vertical={false}
                      article={article}
                      index={index}
                      key={article?._id}
                    />
                  );
                })}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

export default CommunityBoards;
