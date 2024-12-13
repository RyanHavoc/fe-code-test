"use client";

export const dynamic = 'force-dynamic';

import { Button } from "@/components/ui/button";
import { QuestionDisplay } from "@/components/survey/question-display";
import { generateShareableLink, getSurveyById, saveSurveyResponse } from "@/lib/survey";
import { Survey } from "@/types/survey";
import { Share2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SurveyPreview() {
  const params = useParams();
  const [survey, setSurvey] = useState<Survey | undefined>();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      const loadedSurvey = getSurveyById(params.id as string);
      setSurvey(loadedSurvey);
    }
  }, [params.id]);

  if (!survey) {
    return <div>Survey not found</div>;
  }

  const handleShare = () => {
    const link = generateShareableLink(survey!.id);
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  const handleSubmit = () => {
    // Validate required questions
    const unansweredRequired = survey.questions
      .filter(q => q.required)
      .filter(q => !answers[q.id]);

    if (unansweredRequired.length > 0) {
      toast.error("Please answer all required questions");
      return;
    }

    // Format answers for submission
    const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value,
    }));

    // Create and save response
    const response = {
      id: crypto.randomUUID(),
      surveyId: survey.id,
      answers: formattedAnswers,
      submittedAt: new Date().toISOString(),
    };

    saveSurveyResponse(response);
    toast.success("Survey submitted successfully!");
    router.push("/");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{survey.title}</h1>
            <p className="text-muted-foreground">{survey.description}</p>
          </div>
          <Button onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="space-y-6">
          {survey.questions.map((question) => (
            <QuestionDisplay
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={(value) =>
                setAnswers({ ...answers, [question.id]: value })
              }
            />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSubmit}>Submit Survey</Button>
        </div>
      </div>
    </div>
  );
}