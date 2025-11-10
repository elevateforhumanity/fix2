import { Download, Award } from 'lucide-react'

interface CertificateProps {
  studentName: string
  courseName: string
  completionDate: string
  certificateId: string
}

export default function CertificateGenerator({ 
  studentName, 
  courseName, 
  completionDate,
  certificateId 
}: CertificateProps) {
  const handleDownload = () => {
    // TODO: Generate PDF certificate
  }

  return (
    <div className="card p-8 text-center">
      <Award className="w-16 h-16 mx-auto text-brand-blue mb-4" />
      <h2 className="text-2xl font-bold mb-2">Certificate of Completion</h2>
      <p className="text-slate-600 mb-6">
        This certifies that <strong>{studentName}</strong> has successfully completed
        <strong> {courseName}</strong> on {completionDate}
      </p>
      <p className="text-sm text-slate-500 mb-6">Certificate ID: {certificateId}</p>
      <button onClick={handleDownload} className="btn btn-primary inline-flex items-center gap-2">
        <Download className="w-4 h-4" />
        Download Certificate
      </button>
    </div>
  )
}
