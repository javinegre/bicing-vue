import BbbIcon from '../../assets/resource-icons/bikes-big-black.svg';
import BbgIcon from '../../assets/resource-icons/bikes-big-gray.svg';
import BbvIcon from '../../assets/resource-icons/bikes-big-green.svg';
import BboIcon from '../../assets/resource-icons/bikes-big-orange.svg';
import BbrIcon from '../../assets/resource-icons/bikes-big-red.svg';

import BsbIcon from '../../assets/resource-icons/bikes-small-black.svg';
import BsgIcon from '../../assets/resource-icons/bikes-small-gray.svg';
import BsvIcon from '../../assets/resource-icons/bikes-small-green.svg';
import BsoIcon from '../../assets/resource-icons/bikes-small-orange.svg';
import BsrIcon from '../../assets/resource-icons/bikes-small-red.svg';

import SbbIcon from '../../assets/resource-icons/slots-big-black.svg';
import SbgIcon from '../../assets/resource-icons/slots-big-gray.svg';
import SbvIcon from '../../assets/resource-icons/slots-big-green.svg';
import SboIcon from '../../assets/resource-icons/slots-big-orange.svg';
import SbrIcon from '../../assets/resource-icons/slots-big-red.svg';

import SsbIcon from '../../assets/resource-icons/slots-small-black.svg';
import SsgIcon from '../../assets/resource-icons/slots-small-gray.svg';
import SsvIcon from '../../assets/resource-icons/slots-small-green.svg';
import SsoIcon from '../../assets/resource-icons/slots-small-orange.svg';
import SsrIcon from '../../assets/resource-icons/slots-small-red.svg';

const icons = {
  bikes: {
    big: {
      black: BbbIcon,
      gray: BbgIcon,
      green: BbvIcon,
      orange: BboIcon,
      red: BbrIcon
    },
    small: {
      black: BsbIcon,
      gray: BsgIcon,
      green: BsvIcon,
      orange: BsoIcon,
      red: BsrIcon
    }
  },
  slots: {
    big: {
      black: SbbIcon,
      gray: SbgIcon,
      green: SbvIcon,
      orange: SboIcon,
      red: SbrIcon
    },
    small: {
      black: SsbIcon,
      gray: SsgIcon,
      green: SsvIcon,
      orange: SsoIcon,
      red: SsrIcon
    }
  },
}

const getMapMarker = (activeResource, stationInfo) => {
  let color = '';
  const size = stationInfo._radio === 'inner' ? 'big' : 'small';
  const resourceNumber = stationInfo[activeResource];

  if (activeResource === 'mechanical_bikes' || activeResource === 'electrical_bikes') {
    activeResource = 'bikes';
  }

  if (stationInfo.status === 1) {
    if (resourceNumber === 0) {
      color = 'black';
    }
    else if (resourceNumber <= 2) {
      color = 'red';
    }
    else if (resourceNumber <= 5) {
      color = 'orange';
    }
    else {
      color = 'green';
    }
  }
  else {
    color = 'gray';
  }

  return icons[activeResource][size][color];
};

export default getMapMarker;
