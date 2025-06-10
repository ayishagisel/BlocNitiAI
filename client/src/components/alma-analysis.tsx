interface AlmaAnalysisProps {
  violationClass?: string | null;
  deadline?: string | null;
  analysis?: string | null;
}

export default function AlmaAnalysis({ violationClass, deadline, analysis }: AlmaAnalysisProps) {
  const getClassBadgeColor = (cls: string) => {
    switch (cls) {
      case "A":
        return "bg-red-600 text-white";
      case "B":
        return "status-priority";
      case "C":
        return "status-non-urgent";
      case "I":
        return "bg-purple-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="mt-6 alma-bg border border-primary/20 rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <div className="bg-primary text-white p-2 rounded-full">
          <i className="fas fa-robot text-sm"></i>
        </div>
        <div className="flex-1">
          <h5 className="font-semibold text-gray-900 mb-2">Alma's Analysis</h5>
          <div className="space-y-2 text-sm">
            {violationClass && (
              <div className="flex items-center space-x-2">
                <span className="font-medium">HPD Violation Class:</span>
                <span className={`px-2 py-1 rounded text-xs ${getClassBadgeColor(violationClass)}`}>
                  Class {violationClass}
                </span>
              </div>
            )}
            {deadline && (
              <div className="flex items-center space-x-2">
                <span className="font-medium">Correction Deadline:</span>
                <span className="text-red-600 font-medium">{deadline}</span>
              </div>
            )}
            {analysis && (
              <p className="text-gray-700">{analysis}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
