const getTokenSymbol = (token: string) => {
  switch (token) {
    case '0x0dd7b8f3d1fa88FAbAa8a04A0c7B52FC35D4312c':
      return 'BLNY'
    case '0x6B175474E89094C44Da98b954EedeAC495271d0F':
      return 'DAI'
  }
}

export default getTokenSymbol
