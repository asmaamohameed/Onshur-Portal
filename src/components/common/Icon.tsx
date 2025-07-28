import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as FiIcons from "react-icons/fi";
import * as RiIcons from "react-icons/ri";
import * as HiIcons from "react-icons/hi";
import * as GoIcons from "react-icons/go";
import * as CgIcons from "react-icons/cg";
import * as TbIcons from "react-icons/tb";

const iconSets = {
  fa: FaIcons,
  md: MdIcons,
  ai: AiIcons,
  io: IoIcons,
  bs: BsIcons,
  gi: GiIcons,
  fi: FiIcons,
  ri: RiIcons,
  hi: HiIcons,
  go: GoIcons,
  cg: CgIcons,
  tb: TbIcons,
};

export interface IconProps {
  set?: keyof typeof iconSets;
  name: string;
  size?: number | string;
  color?: string;
  [key: string]: any;
}

export function Icon({ set = "fa", name, size = 20, color, ...props }: IconProps) {
  const IconComponent = (iconSets[set] as any)?.[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} {...props} />;
} 