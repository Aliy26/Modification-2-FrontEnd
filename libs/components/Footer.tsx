import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import useDeviceDetect from "../hooks/useDeviceDetect";
import { Stack, Box } from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const device = useDeviceDetect();
  const { t } = useTranslation("common");

  if (device == "mobile") {
    return (
      <Stack className={"footer-container"}>
        <Stack className={"main"}>
          <Stack className={"left"}>
            <Box component={"div"} className={"footer-box"}>
              <img src="/img/logo/logo3.svg" alt="" className={"logo"} />
            </Box>
            <Box component={"div"} className={"footer-box"}>
              <span>{t("customer service")}</span>
              <p>+82 10 5454 5555</p>
            </Box>
            <Box component={"div"} className={"footer-box"}>
              <span>{t("now live")}</span>
              <p>+82 10 5454 5555</p>
              <span>{t("Support?")}</span>
            </Box>
            <Box component={"div"} className={"footer-box"}>
              <p>{t("follow us on social media")}</p>
              <div className={"media-box"}>
                <FacebookOutlinedIcon />
                <TelegramIcon />
                <InstagramIcon />
                <TwitterIcon />
              </div>
            </Box>
          </Stack>
          <Stack className={"right"}>
            <Box component={"div"} className={"bottom"}>
              <div>
                <strong>{t("Popular Search")}</strong>
                <span>{t("Product for Rent")}</span>
                <span>{t("Product Low to hide")}</span>
              </div>
              <div>
                <strong>{t("Quick Links")}</strong>
                <span>{t("Terms of Use")}</span>
                <span>{t("Privacy Policy")}</span>
                <span>{t("Pricing Plans")}</span>
                <span>{t("Our Services")}</span>
                <span>{t("Contact Support")}</span>
                <span>{t("FAQs")}</span>
              </div>
              <div>
                <strong>{t("Discover")}</strong>
                <span>{t("New York")}</span>
                <span>{t("Florida")}</span>
                <span>{t("Washington")}</span>
                <span>{t("Nevada")}</span>
              </div>
            </Box>
          </Stack>
        </Stack>
        <Stack className={"second"}>
          <span>
            {t("© Aliy of MIT 13 - All rights reserved. AptDecor`")}{" "}
            {moment().year()}
          </span>
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack className={"footer-container"}>
        <Stack className={"main"}>
          <Stack className={"left"}>
            <Box component={"div"} className={"footer-top"}>
              <img src="/img/logo/logo3.svg" alt="" className={"logo"} />
              <p className="logo-name">AptDecor`</p>
            </Box>
            <Box component={"div"} className={"footer-box"}>
              <span>{t("customer service")}</span>
              <p>+82 10 5454 5555</p>
            </Box>
            <Box component={"div"} className={"footer-box"}>
              <span>{t("new live")}</span>
              <p>+82 10 5454 5555</p>
              <span>{t("Support?")}</span>
            </Box>
            <Box component={"div"} className={"footer-box"}>
              <p>{t("follow us on social media")}</p>
              <div className={"media-box"}>
                <FacebookOutlinedIcon />
                <TelegramIcon />
                <InstagramIcon />
                <TwitterIcon />
              </div>
            </Box>
          </Stack>
          <Stack className={"right"}>
            <Box component={"div"} className={"top"}>
              <strong>{t("keep yourself up to date")}</strong>
              <div>
                <input type="text" placeholder={"Your Email"} />
                <span>{t("Subscribe")}</span>
              </div>
            </Box>
            <Box component={"div"} className={"bottom"}>
              <div>
                <strong>{t("Popular Search")}</strong>
                <span>{t("Product for Rent")}</span>
                <span>{t("Product Low to hide")}</span>
              </div>
              <div>
                <strong>{t("Quick Links")}</strong>
                <span>{t("Terms of Use")}</span>
                <span>{t("Privacy Policy")}</span>
                <span>{t("Pricing Plans")}</span>
                <span>{t("Our Services")}</span>
                <span>{t("Contact Support")}</span>
                <span>{t("FAQs")}</span>
              </div>
              <div>
                <strong>{t("Discover")}</strong>
                <span>{t("New York")}</span>
                <span>{t("Florida")}</span>
                <span>{t("Washington")}</span>
                <span>{t("Nevada")}</span>
              </div>
            </Box>
          </Stack>
        </Stack>
        <div className="brand-name">
          <h1>AptDecor`</h1>
        </div>
        <Stack className={"second"}>
          <span>
            {t("© Aliy of MIT 13 - All rights reserved. AptDecor™")}{" "}
            {moment().year()}
          </span>
          <span>{t("Privacy · Terms · Sitemap")}</span>
        </Stack>
      </Stack>
    );
  }
};

export default Footer;
