import { Badge, Button } from "@chakra-ui/react";
import { BadgeProps, BadgeType } from "../constants";
export interface Props {
  text: string;
  //callback: any; //TODO allow parent to see whether this is selected
  type: BadgeType;
}

export const MemberEntry = (props: Props) => {
  var badge;
  var label;
  var color;

  if (props.type !== BadgeType.NOBADGE) {
    switch (props.type) {
      case BadgeType.NO:
        color = BadgeProps.NO.colour;
        label = BadgeProps.NO.label;
        break;
      case BadgeType.MAYBE:
        color = BadgeProps.MAYBE.colour;
        label = BadgeProps.MAYBE.label;
        break;
      case BadgeType.YES:
        color = BadgeProps.YES.colour;
        label = BadgeProps.YES.label;
        break;
      case BadgeType.READY:
        color = BadgeProps.READY.colour;
        label = BadgeProps.READY.label;
        break;
    }
    badge = <Badge colorScheme={color}>{label}</Badge>;
  }

  return (
    <Button
      justifyContent="space-between"
      color="current"
      variant="outline"
      width="100%"
      marginBottom={2}
    >
      {props.text}
      {badge}
    </Button>
  );
};
