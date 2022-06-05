import Image from 'next/image'
import { useEffect, useState } from 'react'
import { injected } from "../helper/connectors"
import { useWeb3React } from "@web3-react/core"

export function SlotMachine() {
  const [hasMetamask, setHasMetamask] = useState(false)
  const { active, activate, deactivate, account } = useWeb3React()

  let [status, setStatus] = useState('WELCOME TO THE WEB3 SLOTMACHINE')
  const tiles = [
    '/tiles/cherries.png',
    '/tiles/club.png',
    '/tiles/diamond.png',
    '/tiles/heart.png',
    '/tiles/joker.png',
    '/tiles/seven.png',
    '/tiles/spade.png'
  ]

  const joker = tiles[4]

  let [slot1, setSlot1] = useState(tiles[0])
  let [slot2, setSlot2] = useState(tiles[1])
  let [slot3, setSlot3] = useState(tiles[0])

  let [running, setRunning] = useState(false)

  // This initialization avoids the problem of the first round where all tiles are equal and therefore automatically win
  let [numChanges, setNumChanges] = useState(randomInt(1, 4) * 7)
  let [numberSlot1, setNumberSlot1] = useState(numChanges + randomInt(1, 7))
  let [numberSlot2, setNumberSlot2] = useState(numChanges + 2 * 7 + randomInt(1, 7))
  let [numberSlot3, setNumberSlot3] = useState(numChanges + 4 * 7 + randomInt(1, 7))

  let slot1Interval = setInterval(() => {}, 50)
  let slot2Interval = setInterval(() => {}, 50)
  let slot3Interval = setInterval(() => {}, 50)
  // let testWinInterval = setInterval(() => {}, 50)

  let [counterSlot1, setCounterSlot1] = useState(0) // This should/could be replaced in the future
  let [counterSlot2, setCounterSlot2] = useState(0)
  let [counterSlot3, setCounterSlot3] = useState(0)

  // const lol = useEffect(()=>{ // Is always equal to cherry cherry cherry
  //   setSlot1(tiles[counterSlot1 % tiles.length])
  //   setSlot2(tiles[counterSlot2 % tiles.length])
  //   setSlot3(tiles[counterSlot3 % tiles.length])
  // }, [counterSlot1, counterSlot2, counterSlot3, slot1, slot2, slot3, tiles])


  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true)
    }
  }, [])

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await activate(injected)
        localStorage.setItem("isWalletconnected", "true")
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div className="container text-center flex flex-col max-w-3xl mx-auto p-8 justify-between mt-12">
      <div className="status-bar text-center p-6">{status}</div>
      <div className="slots-container inline-flex text-center mx-auto p-16 mt-8 justify-between">
        <Image src={slot1} height="100vh" width="100vw" alt="" />
        <Image src={slot2} height="100vh" width="100vw" alt="" />
        <Image src={slot3} height="100vh" width="100vw" alt="" />
      </div>

      {/* <button className="buy-tokens-button text-center p-4 mt-8">Buy Slot Machine Tokens (SMT)</button> */}

      {hasMetamask && active ? (
        <button onClick={() => runSlot()} className="spin-button text-center p-4 mt-8">
          LET IT SPIN!
        </button>
      ) : (
        <button className="spin-button text-center p-4 mt-8  bg-opacity-30" onClick={() => connect()}>
          Connect to Metamask
        </button>
      )}
    </div>
  )

  function runSlot(this: any) {
    setStatus('SPINNING')
    if (running) {
      return null
    }
    setRunning(true)

    setNumChanges(randomInt(1, 4) * 7)
    setNumberSlot1(numChanges + randomInt(1, 7))
    setNumberSlot2(numChanges + 2 * 7 + randomInt(1, 7))
    setNumberSlot3(numChanges + 4 * 7 + randomInt(1, 7))

    slot1Interval = setInterval(spin1, 50) // The period over which the timer is called, the smaller it is, the faster the tiles appear on the screen
    slot2Interval = setInterval(spin2, 50)
    slot3Interval = setInterval(spin3, 50)
    // testWinInterval = setInterval(testWin, 50)

    // HERE THE SLOTS SHOULD BE UPDATED
    // THEY ARE ALWAYS UPDATED IN THE NEXT RUN

    console.log('slot1, slot2, slot3 IN SPIN', slot1, slot2, slot3)

    testWin()
    setRunning(false)
  }

  function testWin() {
    // console.log("slot1, slot2, slot3 IN TEST WIN Before", slot1, slot2, slot3) // slot are have values of the previous spin

    // console.log("counterSlot1", counterSlot1)
    // console.log("counterSlot2", counterSlot2)
    // console.log("counterSlot3", counterSlot3)
    // slot1 = tiles[counterSlot1 % tiles.length] // counterSlot1 equals 0
    // slot2 = tiles[counterSlot2 % tiles.length] // counterSlot2 equals 0
    // slot3 = tiles[counterSlot3 % tiles.length] // counterSlot3 equals 0

    // console.log("slot1, slot2, slot3 IN TEST WIN After", slot1, slot2, slot3) // This will always be cherry cherry cherry

    console.log("TEST WIN")

    if (slot1 == slot2 && slot2 == slot3) {
      setStatus('YOU WON')
    } else if (
      (slot1 == joker && slot2 == slot3) ||
      (slot2 == joker && slot1 == slot3) ||
      (slot3 == joker && slot1 == slot2)
    ) {
      setStatus('YOU WON')
    } else if (
      (slot1 == joker && slot2 == joker) ||
      (slot2 == joker && slot3 == joker) ||
      (slot3 == joker && slot1 == joker)
    ) {
      setStatus('YOU WON')
    }
  }

  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  /** SHOULD ONLY ONE FUNCTION */
  
  function spin1() {
    setSlot1(tiles[counterSlot1 % tiles.length])

    if (counterSlot1 >= numberSlot1) {
      clearInterval(slot1Interval)
      setCounterSlot1(0)
    } else {
      setCounterSlot1((counterSlot1 += 1))
    }
  }

  function spin2() {
    setSlot2(tiles[counterSlot2 % tiles.length])

    if (counterSlot2 >= numberSlot2) {
      clearInterval(slot2Interval)
      setCounterSlot2(0)
    } else {
      setCounterSlot2((counterSlot2 += 1))
    }
  }

  function spin3() {
    setSlot3(tiles[counterSlot3 % tiles.length])

    if (counterSlot3 >= numberSlot3) {
      clearInterval(slot3Interval)
      setCounterSlot3(0)
    } else {
      setCounterSlot3((counterSlot3 += 1))
    }
  }
}
