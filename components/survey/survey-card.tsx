"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Survey } from "@/types/survey";
import { Pencil, PlayCircle, Trash2, ListChecks } from "lucide-react";
import { useRouter } from "next/navigation";

interface SurveyCardProps {
  survey: Survey;
  onDelete: (id: string) => void;
}

export function SurveyCard({ survey, onDelete }: SurveyCardProps) {
  const router = useRouter();

  return (
    <Card className="p-6">
      <div className="flex items-top justify-between mb-4">
        <div>
          <h2 className="text-l font-semibold mb-1">{survey.title}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {survey.description}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push(`/edit/${survey.id}`)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  survey and all its data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(survey.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button size="sm" onClick={() => router.push(`/survey/${survey.id}`)}>
          <PlayCircle className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/survey/${survey.id}/responses`)}
        >
          <ListChecks className="h-4 w-4 mr-2" />
          Responses
        </Button>
      </div>
    </Card>
  );
}
