import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis';
import {NotificationProvider} from "web3uikit";
function MyApp({ Component, pageProps }) {
  return (
    // ! initializeOnMount is set to false, so we can manually initialize the Moralis SDK
    // ! gives the optionality to hook into some server 
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </MoralisProvider>
  )
}

export default MyApp
