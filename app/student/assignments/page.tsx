'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { FileText, Clock, CheckCircle, AlertCircle, Upload } from 'lucide-react';

export default function StudentAssignmentsPage() {
  const assignments = [
    {
      id: 1,
      title: 'Refrigeration Quiz',
      course: 'HVAC Systems II',
      dueDate: '2024-02-18',
      status: 'pending',
      points: 50,
      type: 'quiz',
    },
    {
      id: 2,
      title: 'Safety Procedures Essay',
      course: 'Workplace Safety',
      dueDate: '2024-02-22',
      status: 'pending',
      points: 100,
      type: 'essay',
    },
    {
      id: 3,
      title: 'System Diagram Project',
      course: 'HVAC Systems II',
      dueDate: '2024-02-25',
      status: 'pending',
      points: 150,
      type: 'project',
    },
    {
      id: 4,
      title: 'Midterm Exam',
      course: 'HVAC Fundamentals',
      submittedDate: '2024-02-10',
      status: 'graded',
      points: 200,
      grade: 92,
      type: 'exam',
    },
    {
      id: 5,
      title: 'Lab Practical',
      course: 'Electrical Systems',
      submittedDate: '2024-02-08',
      status: 'graded',
      points: 100,
      grade: 88,
      type: 'practical',
    },
  ];

  const pending = assignments.filter(a => a.status === 'pending');
  const submitted = assignments.filter(a => a.status === 'submitted');
  const graded = assignments.filter(a => a.status === 'graded');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'submitted':
        return <Badge variant="primary">Submitted</Badge>;
      case 'graded':
        return <Badge variant="success">Graded</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz':
      case 'exam':
        return <FileText className="h-5 w-5" />;
      case 'essay':
      case 'project':
        return <Upload className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const AssignmentCard = ({ assignment }: { assignment: any }) => (
    <Card className="hover:border-orange-500 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
              {getTypeIcon(assignment.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{assignment.title}</h3>
                  <p className="text-sm text-slate-600">{assignment.course}</p>
                </div>
                {getStatusBadge(assignment.status)}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-600 mt-3">
                {assignment.dueDate && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Due: {assignment.dueDate}
                  </div>
                )}
                {assignment.submittedDate && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Submitted: {assignment.submittedDate}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {assignment.points} points
                </div>
                {assignment.grade && (
                  <div className="flex items-center gap-2 font-semibold text-green-600">
                    Grade: {assignment.grade}%
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            {assignment.status === 'pending' && (
              <Button variant="primary" size="sm">
                Start
              </Button>
            )}
            {assignment.status === 'submitted' && (
              <Button variant="outline" size="sm">
                View Submission
              </Button>
            )}
            {assignment.status === 'graded' && (
              <Button variant="outline" size="sm">
                View Feedback
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Assignments</h1>
          <p className="text-slate-600 mt-1">View and submit your coursework</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Pending</div>
                  <div className="text-3xl font-bold text-orange-600 mt-1">{pending.length}</div>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Submitted</div>
                  <div className="text-3xl font-bold text-red-600 mt-1">{submitted.length}</div>
                </div>
                <Upload className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Graded</div>
                  <div className="text-3xl font-bold text-green-600 mt-1">{graded.length}</div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Tabs */}
        <Tabs defaultValue="pending">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">
              Pending ({pending.length})
            </TabsTrigger>
            <TabsTrigger value="submitted">
              Submitted ({submitted.length})
            </TabsTrigger>
            <TabsTrigger value="graded">
              Graded ({graded.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="space-y-4">
              {pending.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      All caught up!
                    </h3>
                    <p className="text-slate-600">You have no pending assignments</p>
                  </CardContent>
                </Card>
              ) : (
                pending.map(assignment => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="submitted">
            <div className="space-y-4">
              {submitted.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      No submitted assignments
                    </h3>
                    <p className="text-slate-600">Assignments awaiting grading will appear here</p>
                  </CardContent>
                </Card>
              ) : (
                submitted.map(assignment => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="graded">
            <div className="space-y-4">
              {graded.map(assignment => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
