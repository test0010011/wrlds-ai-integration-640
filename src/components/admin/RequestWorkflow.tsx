
import { RefreshCw } from "lucide-react";

interface Workflow {
  current: string;
  steps: string[];
}

interface RequestWorkflowProps {
  workflow: Workflow;
}

export const RequestWorkflow = ({ workflow }: RequestWorkflowProps) => {
  return (
    <div className="mb-4">
      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
        <RefreshCw className="h-4 w-4 mr-2" />
        Workflow ITIL - Étape: {workflow.current}
      </h4>
      <div className="flex items-center space-x-2">
        {workflow.steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${
              step === workflow.current 
                ? 'bg-blue-500' 
                : workflow.steps.indexOf(workflow.current) > index
                  ? 'bg-green-500'
                  : 'bg-gray-300'
            }`} />
            <span className={`text-xs ml-1 ${
              step === workflow.current ? 'font-semibold text-blue-600' : 'text-gray-600'
            }`}>
              {step}
            </span>
            {index < workflow.steps.length - 1 && (
              <div className="w-8 h-px bg-gray-300 mx-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
