import { ColonyClient, getLogs, getBlockTime } from '@colony/colony-js'
import { InfuraProvider, Log } from 'ethers/providers'
import { utils } from 'ethers'

import { EventLog } from '../types'
import getTokenSymbol from '../utils/getTokenSymbol'

const getPayoutClaimedEventLogs = async (
  client: ColonyClient,
  provider: InfuraProvider
):Promise<EventLog[]> => {
  const eventFilter = client.filters.PayoutClaimed(null, null, null)
  const wei = new utils.BigNumber(10)
  const eventLogs = await getLogs(client, eventFilter)
  const parsedEvents = eventLogs.map(async (event: Log) => {
    const parsedEvent = client.interface.parseLog(event)
    const humanReadableAmount = new utils.BigNumber(parsedEvent.values.amount)
    const fundingPotId = new utils.BigNumber(parsedEvent.values.fundingPotId).toString()
    const { associatedTypeId } = await client.getFundingPot(fundingPotId)
    const { recipient: userAddress } = await client.getPayment(associatedTypeId)
    const logTime = await getBlockTime(provider, parsedEvent.values.blockHash)
    const claimedAmount = humanReadableAmount.div(wei.pow(18)).toString()
    const token = getTokenSymbol(parsedEvent.values.token)

    return {
      type: parsedEvent.name,
      transactionHash: event.transactionHash as string,
      userAddress,
      date: logTime,
      claimedAmount,
      fundingPotId,
      token
    }
  })

  return Promise.all(parsedEvents)
}

export default getPayoutClaimedEventLogs
