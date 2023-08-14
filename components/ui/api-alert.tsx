"use client";

import StorageIcon from "@mui/icons-material/Storage";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import { toast } from "react-hot-toast";

interface ApiAlertPops {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertPops["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertPops["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: React.FC<ApiAlertPops> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to the clipboard");
  };

  return (
    <Alert>
      <StorageIcon className="h-4 w-4 " />
      <AlertTitle className="flex items-center gap-x-2 ml-4">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="reletive rounded bg-muted px-[0.3em] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <ContentCopyIcon className="h-4 w-4 " />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
