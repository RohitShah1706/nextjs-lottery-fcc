import { useWeb3Contract } from "react-moralis";
import {abi,contractAddress} from "../constants/index";
import { useMoralis } from "react-moralis"; 
import { useEffect, useState } from "react";
import {ethers} from "ethers";
// ! to use the notification we need to wrap the app in the NotificationProvider provider
import { useNotification } from "web3uikit";

const LotteryEntrance = ()=> {
    const {chainId:chainIdHex,isWeb3Enabled, isLoading, isFetching} = useMoralis();
    const chainId = parseInt(chainIdHex);
    const lotteryAddress = chainId in contractAddress ? contractAddress[chainId][0] : null;
    console.log("You are on this chainId with conract address",chainId,lotteryAddress);
    
    const [entranceFee, setEntranceFee] = useState("0")
    const [numberOfPlayers, setNumberOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    // ! managing notifications - tx object is passed to the notification
    // ! to use the notification we need to wrap the app in the NotificationProvider provider
    const dispatch = useNotification();
    const handleSuccess = async (tx) => {
        await tx.wait(1);
        handleNewNotification(tx);
        updateUIValues();
    }
    const handleNewNotification = (tx) => {
        dispatch({
            type: "info",
            message: "Transaction complete",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }

    

    // ! contract interaction functions
    const {runContractFunction: enterLottery} = useWeb3Contract({
        abi:abi[chainId],
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        params: {},
        msgValue: entranceFee, // ! this is the payable fn - so this only contains the msgValue
    })

    const {runContractFunction: getEntranceFee} = useWeb3Contract({
        abi: abi[chainId],
        contractAddress: lotteryAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const {runContractFunction: getNumberOfPlayers} = useWeb3Contract({
        abi: abi[chainId],
        contractAddress: lotteryAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const {runContractFunction: getRecentWinner} = useWeb3Contract({
        abi: abi[chainId],
        contractAddress: lotteryAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    // ! updating the state variables. - called whenever isWeb3Enabled changes o
    // ! handleSuccess calls this fn so it updates UI when the user clicks the enter button - so that the UI is updated
    async function updateUIValues() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = await getRecentWinner()
        setEntranceFee(entranceFeeFromCall)
        setNumberOfPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])


    return(
        <div className="p-5">
            <h1 className="py-4 px-4 font-bold text-3xl">Lottery</h1>
            {
                lotteryAddress ? 
                <div>
                    <button onClick={async() => await enterLottery({
                        onSuccess: handleSuccess,
                        onError: (err) => console.log(err)
                    })} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                    disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Enter Lottery"
                        )}
                    </button>
                    <div>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>
                    <div>The current number of players is: {numberOfPlayers}</div>
                    <div>The most previous winner was: {recentWinner}</div>
                </div>
                : 
                <div>No lottery address detected</div>
            }
        </div>
    )
}
export default LotteryEntrance;