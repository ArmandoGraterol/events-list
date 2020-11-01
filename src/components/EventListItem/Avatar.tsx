import React from 'react'
import Blockies from 'react-blockies'

import { AvatarProps } from '../../types'

const Avatar = ({ seed }: AvatarProps) => (
  <Blockies
    seed={seed}
    size={9}
    scale={4}
  />
)

export default Avatar
