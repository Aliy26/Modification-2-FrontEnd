import React, { useState } from "react";
import { Stack, Box } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { EventNoticeInquiry, Notice } from "../../types/notices/notices";
import { useQuery } from "@apollo/client";
import { GET_NOTICES } from "../../../apollo/user/query";
import { T } from "../../types/common";
import { NoticeCategory, NoticeStatus } from "../../enums/notice.enum";
import { REACT_APP_API_URL } from "../../config";

const EventCard = ({ event }: { event: Notice }) => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <div className="mobile-event-card">EVENT CARD</div>;
  } else {
    return (
      <Stack className="event-card">
        <Box component="div" className="image-overlay">
          <img
            src={`${REACT_APP_API_URL}/${event.noticeImage}`}
            alt={event.noticeTitle}
          />
        </Box>
        <Box component="div" className="event-info">
          <h3>{event.noticeTitle}</h3>
          <p className="city">{event.eventCity}</p>
          <p className="description">{event.noticeContent}</p>
        </Box>
      </Stack>
    );
  }
};

const Events = () => {
  const device = useDeviceDetect();

  const input: EventNoticeInquiry = {
    noticeCategory: NoticeCategory.EVENT,
    noticeStatus: NoticeStatus.ACTIVE,
  };
  const [eventNotices, setEventNotices] = useState<Notice[]>([]);
  const {
    loading: getNoticesLoading,
    data: getNoticesData,
    error: getNoticesErroc,
    refetch: getNoticesRefetch,
  } = useQuery(GET_NOTICES, {
    fetchPolicy: "cache-and-network",
    variables: { input: input },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setEventNotices(data?.getNotices);
    },
  });

  if (device === "mobile") {
    return <div className="mobile-events">EVENT CARD</div>;
  } else {
    return (
      <div>
        {!eventNotices.length ? (
          ""
        ) : (
          <Stack className="events">
            <div className="header">
              <h2>Events</h2>
              <p>Discover amazing events around you!</p>
            </div>

            {eventNotices.length > 4 ? (
              <Swiper
                className="swiper-container"
                modules={[Pagination]}
                spaceBetween={0}
                slidesPerView={4}
                pagination={{ clickable: true }}
              >
                {eventNotices.map((event) => (
                  <SwiperSlide key={event._id}>
                    <EventCard event={event} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="cards-container">
                {eventNotices.map((event) => (
                  <EventCard event={event} key={event._id} />
                ))}
              </div>
            )}
          </Stack>
        )}
      </div>
    );
  }
};

export default Events;
