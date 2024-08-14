import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl"; // Retained from develop

export default function FeedbackDialog({
  isDialogOpen,
  setIsDialogOpen,
  handleFeedbackSubmit,
  isFormFilled,
  isSubmitLoading,
  name,
  setName,
  email,
  setEmail,
  message,
  setMessage,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  handleFeedbackSubmit: () => void;
  isFormFilled: boolean;
  isSubmitLoading: boolean;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  message: string;
  setMessage: (message: string) => void;
}) {
  const t = useTranslations(""); // Retained from develop

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          onClick={() => setIsDialogOpen(true)}
          className="mt-4"
        >
          {t("How_can_we_improve?")} {/* Retained from develop */}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("Share_your_feedback")}</DialogTitle> {/* Retained from develop */}
          <DialogDescription>
            {t(
              "We_would_love_to_hear_your_thoughts_Please_share_your_feedback_below"
            )} {/* Retained from develop */}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">{t("Name")}</Label> {/* Retained from develop */}
            <Input
              id="name"
              placeholder={t("Your_name_placeholder")} {/* Retained from develop */}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="email">{t("Email")}</Label> {/* Retained from develop */}
            <Input
              id="email"
              type="email"
              placeholder={t("Your_email_placeholder")} {/* Retained from develop */}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="message">{t("Message")}</Label> {/* Retained from develop */}
            <Textarea
              id="message"
              placeholder={t("Message_placeholder")} {/* Retained from develop */}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleFeedbackSubmit}
            disabled={!isFormFilled || isSubmitLoading}
          >
            {isSubmitLoading ? (
              <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
            ) : null}
            {isSubmitLoading ? t("Loading") : t("Submit")} {/* Retained from develop */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
