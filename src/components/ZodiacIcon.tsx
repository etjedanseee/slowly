import React from 'react'
import { ReactComponent as AriesIcon } from '../assets/zodiac/aries.svg'
import { ReactComponent as AquariusIcon } from '../assets/zodiac/aquarius.svg'
import { ReactComponent as CancerIcon } from '../assets/zodiac/cancer.svg'
import { ReactComponent as CapricornIcon } from '../assets/zodiac/capricorn.svg'
import { ReactComponent as GeminiIcon } from '../assets/zodiac/gemini.svg'
import { ReactComponent as LeoIcon } from '../assets/zodiac/leo.svg'
import { ReactComponent as LibraIcon } from '../assets/zodiac/libra.svg'
import { ReactComponent as PiscesIcon } from '../assets/zodiac/pisces.svg'
import { ReactComponent as SagittariusIcon } from '../assets/zodiac/sagittarius.svg'
import { ReactComponent as ScorpioIcon } from '../assets/zodiac/scorpio.svg'
import { ReactComponent as TaurusIcon } from '../assets/zodiac/taurus.svg'
import { ReactComponent as VirgoIcon } from '../assets/zodiac/virgo.svg'
import { ZodiacType } from '../types/Auth/auth'
import { themeType } from '../types/Theme/theme'

interface ZodiacIconProps {
  zodiac: ZodiacType,
  theme: themeType
}

const ZodiacIcon = ({ zodiac, theme }: ZodiacIconProps) => {
  let imageComponent;
  const iconFillColor = theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'

  switch (zodiac) {
    case 'Aries':
      imageComponent = <AriesIcon className={`h-5 w-5 ${iconFillColor}`} />;
      break;
    case 'Taurus':
      imageComponent = <TaurusIcon className={`h-5 w-5 ${iconFillColor}`} />;
      break;
    case 'Gemini':
      imageComponent = <GeminiIcon className={`h-5 w-5 ${iconFillColor}`} />;
      break;
    case 'Cancer':
      imageComponent = <CancerIcon className={`h-5 w-5 ${iconFillColor}`} />;
      break;
    case 'Leo':
      imageComponent = <LeoIcon className={`h-5 w-5 ${iconFillColor}`} />;
      break;
    case 'Virgo':
      imageComponent = <VirgoIcon className={`h-5 w-5 ${iconFillColor}`} />;
      break;
    case 'Libra':
      imageComponent = <LibraIcon className={`h-5 w-5 ${iconFillColor}`} />;
      break;
    case 'Scorpio':
      imageComponent = <ScorpioIcon className={`h-5 w-5 ${iconFillColor}`} />;
      break;
    case 'Sagittarius':
      imageComponent = <SagittariusIcon className={`h-5 w-5 ${iconFillColor}`} />;
      break;
    case 'Capricorn':
      imageComponent = <CapricornIcon className={`h-5 w-5 ${iconFillColor}`} />;
      break;
    case 'Aquarius':
      imageComponent = <AquariusIcon className={`h-5 w-5 ${iconFillColor}`} />;
      break;
    case 'Pisces':
      imageComponent = <PiscesIcon className={`h-5 w-5 ${iconFillColor}`} />;
      break;
    default:
      imageComponent = null;
      break;
  }
  return imageComponent;
}

export default ZodiacIcon