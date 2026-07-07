import { AssistantPanel } from "@/components/assistant-panel/assistant-panel";
import { WorkflowNav } from "@/components/workflow/workflow-nav";
import { Workspace } from "@/components/workflow/workspace";

export default function DashboardPage() {
  return (
    <div className="grid h-screen grid-cols-[260px_minmax(0,1fr)_300px] overflow-hidden">
      <WorkflowNav />
      <Workspace />
      <AssistantPanel />
    </div>
  );
}
