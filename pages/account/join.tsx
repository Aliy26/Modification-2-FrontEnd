import React, { useCallback, useState } from "react";
import { NextPage } from "next";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import { logIn, signUp } from "../../libs/auth";
import { sweetMixinErrorAlert } from "../../libs/sweetAlert";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Messages } from "../../libs/config";
import { useTranslation } from "react-i18next";

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

const Join: NextPage = () => {
  const router = useRouter();
  const device = useDeviceDetect();
  const { t } = useTranslation("common");
  const [input, setInput] = useState({
    nick: "",
    password: "",
    phone: "",
    email: "",
    type: "USER",
  });
  const [loginView, setLoginView] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  /** HANDLERS **/
  const viewChangeHandler = (state: boolean) => {
    setLoginView(state);
  };

  const isLoginDataChanged = () => {
    return input.nick !== "" && input.password !== "";
  };

  const isSignupDataChanged = () => {
    return (
      input.nick !== "" &&
      input.password !== "" &&
      input.phone !== "" &&
      input.email !== ""
    );
  };

  const checkUserTypeHandler = (e: any) => {
    const checked = e.target.checked;
    if (checked) {
      const value = e.target.name;
      handleInput("type", value);
    } else {
      handleInput("type", "USER");
    }
  };

  const handleInput = useCallback((name: any, value: any) => {
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);

  const doLogin = useCallback(async () => {
    console.warn(input);
    try {
      if (!isLoginDataChanged()) {
        await sweetMixinErrorAlert(Messages.error3);
        return false;
      }
      await logIn(input.nick, input.password);
      await router.push(`${router.query.referrer ?? "/"}`);
      window.location.reload();
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
    }
  }, [input]);

  const doSignUp = useCallback(async () => {
    console.warn(input);
    try {
      if (!isSignupDataChanged()) {
        await sweetMixinErrorAlert(Messages.error3);
        return false;
      }
      await signUp(
        input.nick,
        input.password,
        input.phone,
        input.email,
        input.type
      );
      await router.push(`${router.query.referrer ?? "/"}`);
      window.location.reload();
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
    }
  }, [input]);

  console.log("+input: ", input);

  if (device === "mobile") {
    return <div>LOGIN MOBILE</div>;
  } else {
    return (
      <Stack className={"join-page"}>
        <Stack className={"container"}>
          <Stack className={"main"}>
            <Stack className={"left"}>
              {/* @ts-ignore */}
              <Box className={"logo"}>
                <img src="/img/logo/logo3.svg" alt="" />
                <span>AptDecor™</span>
              </Box>
              <Box className={"info"}>
                <span>{loginView ? t("LOGIN") : t("SIGNUP")}</span>
                <p>
                  <p>
                    {loginView
                      ? t("Login with this account across the following sites.")
                      : t(
                          "Sign up with this account to access all the following sites."
                        )}
                  </p>
                </p>
              </Box>
              <Box className={"input-wrap"}>
                <div className={"input-box"}>
                  <span>{t("Nickname")}</span>
                  <input
                    type="text"
                    placeholder={t("Enter Nickname")}
                    onChange={(e) => handleInput("nick", e.target.value)}
                    required={true}
                    onKeyDown={(event) => {
                      if (event.key == "Enter" && loginView) doLogin();
                      if (event.key == "Enter" && !loginView) doSignUp();
                    }}
                  />
                </div>

                {!loginView && (
                  <div className={"input-box"}>
                    <span>{t("Phone")}</span>
                    <input
                      type="text"
                      placeholder={t("Enter Phone")}
                      onChange={(e) => handleInput("phone", e.target.value)}
                      required={true}
                      onKeyDown={(event) => {
                        if (event.key == "Enter") doSignUp();
                      }}
                    />
                  </div>
                )}

                {!loginView && (
                  <div className={"input-box"}>
                    <span>{t("Email")}</span>
                    <input
                      type="text"
                      placeholder={t("Enter Email")}
                      onChange={(e) => handleInput("email", e.target.value)}
                      required={true}
                      onKeyDown={(event) => {
                        if (event.key == "Enter") doSignUp();
                      }}
                    />
                  </div>
                )}
                <div className={"input-box"}>
                  <span>{t("Password")}</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("Enter Password")}
                    onChange={(e) => handleInput("password", e.target.value)}
                    required={true}
                    onKeyDown={(event) => {
                      if (event.key == "Enter" && loginView) doLogin();
                      if (event.key == "Enter" && !loginView) doSignUp();
                    }}
                  />
                </div>
              </Box>
              <Box className={"register"}>
                {!loginView && (
                  <>
                    <div className="show-password">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={showPassword}
                              onClick={() => {
                                !showPassword
                                  ? setShowPassword(true)
                                  : setShowPassword(false);
                              }}
                            />
                          }
                          label="Show password"
                        />
                      </FormGroup>
                    </div>
                    <div className={"type-option"}>
                      <span className={"text"}>
                        {t("I want to be registered as:")}
                      </span>
                      <div>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                name={"USER"}
                                onChange={checkUserTypeHandler}
                                checked={input?.type == "USER"}
                              />
                            }
                            label="User"
                          />
                        </FormGroup>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                name={"AGENT"}
                                onChange={checkUserTypeHandler}
                                checked={input?.type == "AGENT"}
                              />
                            }
                            label="Agent"
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </>
                )}

                {loginView && (
                  <div className={"remember-info"}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={showPassword}
                            onClick={() => {
                              !showPassword
                                ? setShowPassword(true)
                                : setShowPassword(false);
                            }}
                          />
                        }
                        label="Show password"
                      />
                    </FormGroup>
                    <a>{t("Lost your password?")}</a>
                  </div>
                )}

                {loginView ? (
                  <Button
                    variant="contained"
                    endIcon={<img src="/img/icons/rightup.svg" alt="" />}
                    disabled={input.nick == "" || input.password == ""}
                    onClick={doLogin}
                  >
                    {t("LOGIN")}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled={
                      input.nick == "" ||
                      input.password == "" ||
                      input.phone == "" ||
                      input.email == "" ||
                      input.type == ""
                    }
                    onClick={doSignUp}
                    endIcon={<img src="/img/icons/rightup.svg" alt="" />}
                  >
                    {t("SIGNUP")}
                  </Button>
                )}
              </Box>
              <Box className={"ask-info"}>
                {loginView ? (
                  <p>
                    {t("Not registered yet?")}
                    <b
                      onClick={() => {
                        viewChangeHandler(false);
                      }}
                    >
                      {t("SIGNUP")}
                    </b>
                  </p>
                ) : (
                  <p>
                    {t("Have account?")}
                    <b onClick={() => viewChangeHandler(true)}> {t("LOGIN")}</b>
                  </p>
                )}
              </Box>
            </Stack>
            <Stack className={"right"}></Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

export default withLayoutBasic(Join);
