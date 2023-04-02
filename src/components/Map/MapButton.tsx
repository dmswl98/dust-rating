import { IconButton } from '@chakra-ui/react';
import { BiTargetLock, BiPlus, BiMinus } from 'react-icons/bi';

const icons = {
  'current-location': <BiTargetLock />,
  'zoom-in': <BiPlus />,
  'zoom-out': <BiMinus />,
};

type iconType = keyof typeof icons;
interface MapButtonProps {
  type: iconType;
  onClick: () => void;
}

const MapButton = ({ type, onClick }: MapButtonProps) => {
  return (
    <IconButton
      aria-label={type}
      onClick={onClick}
      backgroundColor="#b4e9fa"
      icon={icons[type]}
      _hover={{ bg: '#86e0fc' }}
    />
  );
};

export default MapButton;
