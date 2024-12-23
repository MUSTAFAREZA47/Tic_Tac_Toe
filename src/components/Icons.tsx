import React from 'react'
import type { PropsWithChildren } from 'react';

import FontAwesome from '@react-native-vector-icons/fontawesome';

type IconProps = PropsWithChildren<{
    name: string
}>



const Icons = ({name}: IconProps) => {

    switch (name) {
      case 'circle':
        return <FontAwesome name="circle-thin" size={36} color="#F4C724" />;
        break;
      case 'cross':
        return <FontAwesome name="times" size={36} color="#01CBC6" />;
        break;

      default:
        return <FontAwesome name="pencil" size={36} color="#EAF0F1" />;
        break;
    }

}

export default Icons