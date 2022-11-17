import { useMoralis } from "react-moralis";
import { useEffect } from "react";
const ManualHeader = () =>{
    // ! useMoralis is a hook that enables us to keep track of the user's state and perform actions on the user
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis();

    useEffect(() => {
        if(isWeb3Enabled) return;
        if(typeof window !== "undefined"){
            // ! user has connected but refreshed the page or closed the browser - then still wallet is connected. 
            // ! so check from local storage if the user is connected
            if(window.localStorage.getItem("connected")){
                // ! call web3 enable to connect the wallet in background
                enableWeb3();
            }
        }
    },[isWeb3Enabled]);

    useEffect(() => {
        // ! Moralis is a global object that contains all the methods we need to interact with Moralis
        // ! Moralis.onAccountChanged is a method that enables us to listen to changes in the user's account
        Moralis.onAccountChanged((account) => {
            console.log("Account changed", account);
            if(account == null)
            {
                window.localStorage.removeItem("connected");
                // ! deactivateWeb3 is a function that deactivates the web3 connection
                deactivateWeb3();
                console.log("Null account found");
            }
        })
    })

    const connectWallet = async() => {
        await enableWeb3();
        if(typeof window !== "undefined"){
            window.localStorage.setItem("connected", "injected");
        }
    }

    return(
        <div>
            {
                account ? 
                <div>Connected to {account.slice(0,6)}...{account.slice(account.toString().length - 4,account.toString().length)}</div> 
                : 
                // ! disabled button if the wallet is loading - so don't allow the user to click the button multiple times
                <button onClick={connectWallet} disabled={isWeb3EnableLoading}>Connect</button>
            }
        </div>
    )
}
export default ManualHeader;