import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="index,follow" />
        <link rel="icon" type="image/png" href="/img/logo/sofa.svg" />

        {/* SEO */}
        <meta
          name="keyword"
          content={"aptdecor, aptdecor.com, devex mern, mern nestjs fullstack"}
        />
        <meta
          name={"description"}
          content={
            "Buy and sell furniture and appliances anywhere anytime in New York. Best Products at Best prices on aptdecor.com | " +
            "Покупайте и продавайте мебель и бытовую технику в любое время и в любом месте в Нью-Йорке. Лучшие товары по лучшим ценам на aptdecor.com. | " +
            "뉴욕에서 언제 어디서나 가구와 가전제품을 사고 팔 수 있습니다. 최고의 가격으로 최고의 제품을 aptdecor.com에서 만나보세요."
          }
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
