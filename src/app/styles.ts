import { css } from '@linaria/core';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
css`
  :global() {
    :root {
      --color-purple: #da68f5;
      --color-red: #f25f5b;
      --color-yellow: #f4ce4a;
      --color-green: #00f6d2;
      --color-blue: #0bccf7;
      --color-dark-blue: #042548;
      --color-white: #ffffff;
      --color-gray: #8196a4;
      --color-white: white;

      --color-popup: #003f6f;
      --color-select: #184469;

      --color-disabled: #8da1ad;
    }

    @font-face {
      font-family: 'ProximaNova';
      src: url('/assets/fonts/ProximaNova-Regular.ttf');
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: 'ProximaNova';
      src: url('/assets/fonts/ProximaNova-RegularIt.ttf');
      font-weight: 400;
      font-style: italic;
    }

    @font-face {
      font-family: 'ProximaNova';
      src: url('/assets/fonts/ProximaNova-Semibold.ttf');
      font-weight: 600;
      font-style: normal;
    }

    @font-face {
      font-family: 'ProximaNova';
      src: url('/assets/fonts/ProximaNova-Bold.ttf');
      font-weight: 700;
      font-style: normal;
    }

    @font-face {
      font-family: 'SFProDisplay';
      src: url('/assets/fonts/SFProDisplay-Regular.ttf');
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: 'SFProDisplay';
      src: url('/assets/fonts/SFProDisplay-RegularItalic.ttf');
      font-weight: 400;
      font-style: italic;
    }

    @font-face {
      font-family: 'SFProDisplay';
      src: url('/assets/fonts/SFUIDisplay-Medium.otf');
      font-weight: 600;
      font-style: normal;
    }

    @font-face {
      font-family: 'SFProDisplay';
      src: url('/assets/fonts/SFProDisplay-Bold.ttf');
      font-weight: 700;
      font-style: normal;
    }


    @font-face {
      font-family: 'tomorrow';
      src: url('/assets/fonts/Tomorrow/tomorrow-bold.woff2') format('woff2'),
      url('/assets/fonts/Tomorrow/tomorrow-bold.woff') format('woff');
      font-weight: 600;
      font-style: normal;
    }
    @font-face {
      font-family: 'tomorrow';
      src: url('/assets/fonts/Tomorrow/tomorrow-bolditalic.woff2') format('woff2'),
      url('/assets/fonts/Tomorrow/tomorrow-bolditalic.woff') format('woff');
      font-weight: 600;
      font-style: italic;
    }
    @font-face {
      font-family: 'tomorrow';
      src: url('/assets/fonts/Tomorrow/tomorrow-italic.woff2') format('woff2'),
      url('/assets/fonts/Tomorrow/tomorrow-italic.woff') format('woff');
      font-weight: normal;
      font-style: italic;
    }
    @font-face {
      font-family: 'tomorrow';
      src: url('/assets/fonts/Tomorrow/tomorrow-light.woff2') format('woff2'),
      url('/assets/fonts/Tomorrow/tomorrow-light.woff') format('woff');
      font-weight: 300;
      font-style: normal;
    }
    @font-face {
      font-family: 'tomorrow';
      src: url('/assets/fonts/Tomorrow/tomorrow-lightitalic.woff2') format('woff2'),
      url('/assets/fonts/Tomorrow/tomorrow-lightitalic.woff') format('woff');
      font-weight: 300;
      font-style: italic;
    }
    @font-face {
      font-family: 'tomorrow';
      src: url('/assets/fonts/Tomorrow/tomorrow-medium.woff2') format('woff2'),
      url('/assets/fonts/Tomorrow/tomorrow-medium.woff') format('woff');
      font-weight: 500;
      font-style: normal;
    }
    @font-face {
      font-family: 'tomorrow';
      src: url('/assets/fonts/Tomorrow/tomorrow-regular.woff2') format('woff2'),
      url('/assets/fonts/Tomorrow/tomorrow-regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'tomorrow';
      src: url('/assets/fonts/Tomorrow/tomorrow-semibold.woff2') format('woff2'),
      url('/assets/fonts/Tomorrow/tomorrow-semibold.woff') format('woff');
      font-weight: 700;
      font-style: normal;
    }
    @font-face {
      font-family: 'tomorrow';
      src: url('/assets/fonts/Tomorrow/tomorrow-thin.woff2') format('woff2'),
      url('/assets/fonts/Tomorrow/tomorrow-thin.woff') format('woff');
      font-weight: 200;
      font-style: normal;
    }
    @font-face {
      font-family: 'maryiad';
      src: url('/assets/fonts/Myriad/MyriadPro-Regular.ttf');
      font-weight: normal;
      font-style: normal;
    }

    * {
      box-sizing: border-box;
      outline: none;
    }

    html,
    body {
      margin: 0;
      padding: 0;
    }

    html {
      width: 444px;
      height: 600px;
    }

    html * {
      font-family: 'tomorrow', sans-serif;
    }

    body {
      background-color: var(--color-dark-blue);
      font-size: 14px;
      color: white;
    }

    p {
      margin: 0;
      margin-bottom: 30px;
    }

    ul,
    ol {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
`;
