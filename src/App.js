import { Fragment, useState } from "react"
import { useWeb3 } from "web3-hooks"
import { ethers } from "ethers"

const App = () => {
  const [web3State, login] = useWeb3()

  // Get Balance
  const [address, setAddress] = useState("")
  const [etherBalance, setEtherBalance] = useState("")
  const handleClickBalance = async () => {
    try {
      const balance = await web3State.provider.getBalance(address)
      setEtherBalance(ethers.utils.formatEther(balance))
    } catch (e) {
      console.log(e)
    }
  }

  // Do Transaction
  const [address2Send, setAddress2Send] = useState(address)
  const [ether2Send, setEther2Send] = useState("")
  const handleClickSend = async () => {
    const weiAmount = ethers.utils.parseEther(ether2Send)
    try {
      const tx = await web3State.signer.sendTransaction({
        to: address2Send,
        value: weiAmount,
      })
      await tx.wait()
      console.log("TX MINED")
    } catch (e) {
      console.log(e)
    }
  }

  const style = {
    border: "1px solid rgba(0, 0, 0, 0.05)",
    width: "800px",
    height: "auto",
    margin: "16px",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
  }
  return (
    <Fragment>
      <div id="injection" style={style}>
        <h2>Injection</h2>
        <p>Web3 : {web3State.isWeb3 ? "injected" : "no injected"}</p>

        <p>MetaMask : {web3State.isMetaMask ? "yes" : "no"}</p>
      </div>
      <div id="network" style={style}>
        <h2>Network</h2>
        <p>Network ID : {web3State.chainId}</p>
        <p>Network Name : {web3State.networkName}</p>
      </div>
      <div id="account" style={style}>
        <h2>Log account</h2>
        <p>Logged : {web3State.isLogged ? "yes" : "no"}</p>
        {!web3State.isLogged && <button onClick={login}>Log in</button>}
        {web3State.isLogged && (
          <Fragment>
            <p>Acount Address : {web3State.account}</p>
            <p>Acount Balance : {web3State.balance}</p>
          </Fragment>
        )}
      </div>
      <div id="balance" style={style}>
        <h2>Get balance</h2>
        <label htmlFor="balanceOf">Address :</label>
        <input
          id="balanceOf"
          type="text"
          value={address}
          style={{ width: "auto" }}
          placeholder="ethereum address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="button" onClick={handleClickBalance}>
          Get balance
        </button>
        <p>
          Balance of {address} : {etherBalance} ETH
        </p>
      </div>
      <div id="transaction" style={style}>
        <h2>Do transaction</h2>
        <label htmlFor="address2Send">Send :</label>
        <input
          id="ether2Send"
          type="text"
          value={ether2Send}
          style={{ width: "auto" }}
          placeholder="ether amount"
          onChange={(e) => setEther2Send(e.target.value)}
        />

        <label htmlFor="ether2Send">To :</label>
        <input
          id="address2Send"
          type="text"
          value={address2Send}
          style={{ width: "auto" }}
          placeholder="ethereum address"
          onChange={(e) => setAddress2Send(e.target.value)}
        />
        <button type="button" onClick={handleClickSend}>
          Send ETH
        </button>
        <p>
          Sent to {address2Send} : {ether2Send} ETH
        </p>
      </div>
    </Fragment>
  )
}

export default App
