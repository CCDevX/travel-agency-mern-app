import {
  CreditCard,
  FileStack,
  UserRound,
  Clock,
  Hand,
  Briefcase,
  Check,
} from "lucide-react";

const headerText: string = "Simple and easy !";

const blocksText: { icon: React.ElementType; text: string }[] = [
  {
    icon: Clock,
    text: "Because you would like to be there already, we save you from wasting time in your research.",
  },
  {
    icon: CreditCard,
    text: "Pay with complete peace of mind and at your own pace: credit card, 4x or holiday vouchers.",
  },
  {
    icon: UserRound,
    text: "Advisors available before, during and after your stay, it’s possible!",
  },
  {
    icon: Hand,
    text: "An unexpected event? Your advisor is there to handle it.",
  },
  {
    icon: Briefcase,
    text: "Specialists for each of your escapes...",
  },
  {
    icon: FileStack,
    text: "As many unique destinations and experiences as there are travel desires.",
  },
];

const footerText: { icon: React.ElementType; text: string } = {
  icon: Check,
  text: "And still  200 advisors in more than 20 agencies to welcome you near you !",
};

export { headerText, blocksText, footerText };
