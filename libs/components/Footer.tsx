import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import useDeviceDetect from "../hooks/useDeviceDetect";
import { Stack, Box } from "@mui/material";
import moment from "moment";

const Footer = () => {
  const device = useDeviceDetect();

  if (device == "mobile") {
    return (
      <Stack className={"footer-container"}>
        <Stack className={"main"}>
          <Stack className={"left"}>
            <Box component={"div"} className={"footer-box"}>
              <img src="/img/logo/logo3.svg" alt="" className={"logo"} />
            </Box>
            <Box component={"div"} className={"footer-box"}>
              <span>customer service</span>
              <p>+82 10 4867 2909</p>
            </Box>
            <Box component={"div"} className={"footer-box"}>
              <span>nee live</span>
              <p>+82 10 4867 2909</p>
              <span>Support?</span>
            </Box>
            <Box component={"div"} className={"footer-box"}>
              <p>follow us on social media</p>
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
                <strong>Popular Search</strong>
                <span>Property for Rent</span>
                <span>Property Low to hide</span>
              </div>
              <div>
                <strong>Quick Links</strong>
                <span>Terms of Use</span>
                <span>Privacy Policy</span>
                <span>Pricing Plans</span>
                <span>Our Services</span>
                <span>Contact Support</span>
                <span>FAQs</span>
              </div>
              <div>
                <strong>Discover</strong>
                <span>Seoul</span>
                <span>Gyeongido</span>
                <span>Busan</span>
                <span>Jejudo</span>
              </div>
            </Box>
          </Stack>
        </Stack>
        <Stack className={"second"}>
          <span>
            © Aliy of MIT 13 - All rights reserved. AptDecor` {moment().year()}
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
              <span>customer service</span>
              <p>+82 10 4867 2909</p>
            </Box>
            <Box component={"div"} className={"footer-box"}>
              <span>new live</span>
              <p>+82 10 4867 2909</p>
              <span>Support?</span>
            </Box>
            <Box component={"div"} className={"footer-box"}>
              <p>follow us on social media</p>
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
              <strong>keep yourself up to date</strong>
              <div>
                <input type="text" placeholder={"Your Email"} />
                <span>Subscribe</span>
              </div>
            </Box>
            <Box component={"div"} className={"bottom"}>
              <div>
                <strong>Popular Search</strong>
                <span>Property for Rent</span>
                <span>Property Low to hide</span>
              </div>
              <div>
                <strong>Quick Links</strong>
                <span>Terms of Use</span>
                <span>Privacy Policy</span>
                <span>Pricing Plans</span>
                <span>Our Services</span>
                <span>Contact Support</span>
                <span>FAQs</span>
              </div>
              <div>
                <strong>Discover</strong>
                <span>Seoul</span>
                <span>Gyeongido</span>
                <span>Busan</span>
                <span>Jejudo</span>
              </div>
            </Box>
          </Stack>
        </Stack>
        <div className="brand-name">
          <h1>AptDecor`</h1>
        </div>
        <Stack className={"second"}>
          <span>
            © Aliy of MIT 13 - All rights reserved. AptDecor` {moment().year()}
          </span>
          <span>Privacy · Terms · Sitemap</span>
        </Stack>
      </Stack>
    );
  }
};

export default Footer;
