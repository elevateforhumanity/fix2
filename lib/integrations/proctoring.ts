// lib/integrations/proctoring.ts

export type ProctoringProvider = 'proctorio' | 'respondus';

type LaunchParams = {
  provider: ProctoringProvider;
  examId: string;
  attemptId: string;
  studentId: string;
};

export function getProctoringLaunchUrl(params: LaunchParams): string | null {
  const { provider, examId, attemptId, studentId } = params;

  switch (provider) {
    case 'proctorio':
      return `${process.env.PROCTORIO_LAUNCH_BASE_URL}?examId=${examId}&attemptId=${attemptId}&studentId=${studentId}`;
    case 'respondus':
      return `${process.env.RESPONDUS_LAUNCH_BASE_URL}?examId=${examId}&attemptId=${attemptId}&studentId=${studentId}`;
    default:
      return null;
  }
}
