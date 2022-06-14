import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    boxColor: string;
    bgColor: string;
    accentColor: string;
    overviewBgColor: string;
  }
}