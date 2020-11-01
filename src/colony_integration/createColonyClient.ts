import { ColonyClient, getColonyNetworkClient, Network } from '@colony/colony-js'
import { Wallet } from 'ethers'
import { InfuraProvider } from 'ethers/providers'

const MAINNET_NETWORK_ADDRESS = '0x5346D0f80e2816FaD329F2c140c870ffc3c3E2Ef'
const MAINNET_BETACOLONY_ADDRESS = '0x869814034d96544f3C62DE2aC22448ed79Ac8e70'

const createColonyClient = async ():Promise<ColonyClient> => {
  const provider = new InfuraProvider(
    'mainnet',
    'f78d8251de9e4dc998f74d902e0aac03'
  )
  const wallet = Wallet.createRandom()
  const connectedWallet = wallet.connect(provider)
  const networkClient = getColonyNetworkClient(
    Network.Mainnet,
    connectedWallet,
    { networkAddress: MAINNET_NETWORK_ADDRESS }
  )
  const colonyClient = await networkClient.getColonyClient(MAINNET_BETACOLONY_ADDRESS)

  return colonyClient
}

export default createColonyClient
