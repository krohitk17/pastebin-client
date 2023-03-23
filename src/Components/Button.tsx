import { Button } from "@chakra-ui/react";

export default function SubmitButton({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: any;
  className?: string;
}) {
  return (
    <Button
      className={className}
      colorScheme="blue"
      variant="solid"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
