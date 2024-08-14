import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

export default function CompletionDialog({
  isCongratulationsDialogOpen,
  setIsCongratulationsDialogOpen,

}: {
  isCongratulationsDialogOpen: boolean;
  setIsCongratulationsDialogOpen: (open: boolean) => void;

}) {
  const t = useTranslations("");

  return (
    <AlertDialog
      open={isCongratulationsDialogOpen}
      onOpenChange={setIsCongratulationsDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("Congratulations")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("You_have_completed_a_study_session")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => setIsCongratulationsDialogOpen(false)}
          >
            {t("Continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
