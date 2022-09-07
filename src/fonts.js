import { createGlobalStyle } from 'styled-components'
import Syne from './fonts/Syne.ttf';
import SyneMono from './fonts/SyneMono.ttf';
// import Gumball from './Gumball.ttf';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Syne';
        src: url(${Syne}) format('truetype');
    }

    @font-face {
        font-family: 'SyneMono';
        src: url(${SyneMono}) format('truetype');
    }
`;

// export const Renomono = createGlobalStyle`
//     @font-face {
//         font-family: 'Renomono';
//         src: url(${RenoMono}) format('opentype');
//     }
// `;

export default GlobalStyle;
