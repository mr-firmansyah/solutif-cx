import { FileUploadComponent } from "@/components/attachment/file-upload";
import { LogComponent } from "@/components/log";
import { TaskComponent } from "@/components/task";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DetailTabsProps {
	logs: LogsResponse | null;
	tasks?: any;
	attachments?: AttachmentsResponse | null;
	activities?: any;
}

export function DetailTabs({
	logs,
	tasks,
	attachments,
	activities,
}: DetailTabsProps) {
	return (
		<Tabs defaultValue="task">
			<TabsList>
				<TabsTrigger value="task">Task</TabsTrigger>
				<TabsTrigger value="posts">Posts</TabsTrigger>
				<TabsTrigger value="attachments">Attachments</TabsTrigger>
				<TabsTrigger value="log">Log</TabsTrigger>
			</TabsList>
			<TabsContent value="task">
				<TaskComponent />
			</TabsContent>
			<TabsContent value="posts">
				{/* <PostComponent /> */}
				POST COMPONENT
			</TabsContent>
			<TabsContent value="attachments">
				<FileUploadComponent />
			</TabsContent>
			<TabsContent value="log">
				<LogComponent logs={logs} />
			</TabsContent>
		</Tabs>
	);
}
