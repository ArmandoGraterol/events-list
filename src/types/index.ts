export type EventLog = {
  type: string,
  transactionHash: string,
  date: number,
  userAddress?: string,
  domainId?: string,
  token?: string,
  claimedAmount?: string,
  fundingPotId?: string,
  role?: string
}

export type AvatarProps = {
  seed: string
}
