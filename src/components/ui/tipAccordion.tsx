import { tv } from "tailwind-variants";
import ArrowDown from "@/assets/icon/arrow-down.svg";
import ChefHat from "@/assets/icon/chef-hat.svg";
import { cn } from "@/lib/utils";
import * as Accordion from "@radix-ui/react-accordion";
import "./accordion.css";

interface TipAccordionProps {
  trimTip: string;
  cookingTip: string;
  className?: string;
}
const wrap = tv({
  base: ["flex", "flex-col", "gap-[10px]"],
});

const label = tv({ base: ["w-fit", "bg-[#E5DED4]", "px-2", "py-[3px", "rounded-[32px]"] });
export function TipAccordion({ trimTip, cookingTip, className }: TipAccordionProps) {
  return (
    <Accordion.Root
      type="single"
      className={cn("absolute z-10 w-full rounded-xl bg-tabInvert text-[#51453E]", className)}
      collapsible
    >
      <Accordion.AccordionItem value={"ikim"}>
        <Accordion.Header>
          <Accordion.Trigger
            className={cn("AccordionTrigger", "flex w-full items-center justify-between px-4 py-[13px]")}
          >
            <div className="flex items-center gap-2">
              <ChefHat />
              <span>완벽한 ‘익힘정도’를 위한 필수 팁!</span>
            </div>
            <ArrowDown className="AccordionChevron" aria-hidden />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <div className="h-[1px] w-full bg-toolSelect px-4" />
          <div className="flex flex-col gap-5 p-5 pt-[14px]">
            <div className={wrap()}>
              <div className={label()}>손질 팁</div>
              <li>{trimTip}</li>
            </div>
            <div className={wrap()}>
              <div className={label()}>조리 팁</div>
              <li>{cookingTip}</li>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.AccordionItem>
    </Accordion.Root>
  );
}
