import { ColonyClient, getLogs, getBlockTime } from '@colony/colony-js'
import { InfuraProvider, Log } from 'ethers/providers'

import { EventLog } from '../types'

const getColonyInitialisedEventLogs = async (
  client: ColonyClient,
  provider: InfuraProvider
):Promise<EventLog[]> => {
  const eventFilter = client.filters.ColonyInitialised(null, null)
  const eventLogs = await getLogs(client, eventFilter)
  const parsedEvents = eventLogs.map(async (event: Log) => {
    const parsedEvent = client.interface.parseLog(event)
    const logTime = await getBlockTime(provider, parsedEvent.values.blockHash)

    return {
      type: parsedEvent.name,
      transactionHash: event.transactionHash as string,
      date: logTime
    }
  })

  return Promise.all(parsedEvents)
}

export default getColonyInitialisedEventLogs
