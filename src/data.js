import { nanoid } from "nanoid";
import { FiTruck } from "react-icons/fi";
import { TbDiscount2 } from "react-icons/tb";
import { SiMoneygram } from "react-icons/si";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export const homeService = [
  {
    id: nanoid(),
    Icon: FiTruck,
    heading: "Free Shipping",
    description: "Free Shipping on all Order",
  },
  {
    id: nanoid(),
    Icon: SiMoneygram,
    heading: "Support 24/7",
    description: "Free Shipping on all Order",
  },
  {
    id: nanoid(),
    Icon: RiMoneyDollarCircleLine,
    heading: "Money Return",
    description: "Free Shipping on all Order",
  },
  {
    id: nanoid(),
    Icon: TbDiscount2,
    heading: "Order Discount",
    description: "Free Shipping on all Order",
  },
];
