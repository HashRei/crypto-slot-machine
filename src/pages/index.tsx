import type { NextPage } from "next"
import { Page } from "../components/Page"
import { SlotMachine } from "../components/SlotMachine"

const Home: NextPage = () => {
  return (
    <Page>
      <SlotMachine />
    </Page>
  )
}

export default Home
