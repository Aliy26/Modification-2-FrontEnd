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

interface EventData {
  eventTitle: string;
  city: string;
  description: string;
  imageSrc: string;
}

const eventsData: EventData[] = [
  {
    eventTitle: "Boryeong Mud Festival",
    city: "Boryeong",
    description:
      "Join South Korea's most popular summer event, the Boryeong Mud Festival! Enjoy mud wrestling, mud slides, and a lively atmosphere at Daecheon Beach.",
    imageSrc: "/img/events/mud-festival.webp",
  },
  {
    eventTitle: "Seoul Lantern Festival",
    city: "Seoul",
    description:
      "Experience the beauty of traditional Korean lanterns illuminating Seoul's Cheonggyecheon Stream during the annual Seoul Lantern Festival in November.",
    imageSrc: "/img/events/lanterm-festival.webp",
  },
  {
    eventTitle: "Andong Mask Dance Festival",
    city: "Andong",
    description:
      "Discover Korea's cultural heritage at the Andong Mask Dance Festival, featuring traditional mask dances and performances each autumn.",
    imageSrc: "/img/events/mask-festival.webp",
  },
  {
    eventTitle: "Jinju Namgang Yudeung (Lantern) Festival",
    city: "Jinju",
    description:
      "Celebrate Jinju’s famous Yudeung Festival in October, featuring vibrant lantern displays along the Namgang River, a cultural tribute to Korean heritage.",
    imageSrc: "/img/events/Andong.webp",
  },
  {
    eventTitle: "Gwangju Biennale",
    city: "Gwangju",
    description:
      "Explore contemporary art from around the world at the Gwangju Biennale, a prestigious art exhibition held every two years in Gwangju.",
    imageSrc: "/img/events/biennale.webp",
  },

  {
    eventTitle: "Hwacheon Sancheoneo Ice Festival",
    city: "Hwacheon",
    description:
      "Experience winter fun at the Hwacheon Sancheoneo Ice Festival in January, famous for ice fishing, sledding, and traditional winter games.",
    imageSrc: "/img/events/Hwacheon.webp",
  },
];

const EventCard = ({ event }: { event: EventData }) => {
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
    return <div className="mobile-event-card">EVENT CARD</div>;
  } else {
    return (
      <Stack className="event-card">
        <Box component="div" className="image-overlay">
          <img src={event.imageSrc} alt={event.eventTitle} />
        </Box>
        <Box component="div" className="event-info">
          <h3>{event.eventTitle}</h3>
          <p className="city">{event.city}</p>
          <p className="description">{event.description}</p>
        </Box>
      </Stack>
    );
  }
};

const Events = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <div className="mobile-events">EVENT CARD</div>;
  } else {
    return (
      <Stack className="events">
        <div className="header">
          <h2>Events</h2>
          <p>Discover amazing events around you!</p>
        </div>

        {eventsData.length > 4 ? (
          <Swiper
            className="swiper-container"
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={4}
            pagination={{ clickable: true }}
          >
            {eventsData.map((event) => (
              <SwiperSlide key={event.eventTitle}>
                <EventCard event={event} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="cards-container">
            {eventsData.map((event) => (
              <EventCard event={event} key={event.eventTitle} />
            ))}
          </div>
        )}
      </Stack>
    );
  }
};

export default Events;
