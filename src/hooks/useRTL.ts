import { useLanguage } from '../context/LanguageContext';

export const useRTL = () => {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';

  const rtlClass = (ltrClass: string, rtlClass: string) => {
    return isRTL ? rtlClass : ltrClass;
  };

  const rtlStyle = (ltrStyle: React.CSSProperties, rtlStyle: React.CSSProperties) => {
    return isRTL ? rtlStyle : ltrStyle;
  };

  const rtlValue = <T>(ltrValue: T, rtlValue: T) => {
    return isRTL ? rtlValue : ltrValue;
  };

  const textAlign = rtlClass('text-left', 'text-right');
  const flexDirection = rtlClass('flex-row', 'flex-row-reverse');
  const marginStart = rtlClass('ml-', 'mr-');
  const marginEnd = rtlClass('mr-', 'ml-');
  const paddingStart = rtlClass('pl-', 'pr-');
  const paddingEnd = rtlClass('pr-', 'pl-');
  const positionStart = rtlClass('left-', 'right-');
  const positionEnd = rtlClass('right-', 'left-');

  return {
    isRTL,
    direction,
    rtlClass,
    rtlStyle,
    rtlValue,
    textAlign,
    flexDirection,
    marginStart,
    marginEnd,
    paddingStart,
    paddingEnd,
    positionStart,
    positionEnd,
  };
}; 