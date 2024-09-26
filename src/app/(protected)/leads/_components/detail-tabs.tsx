"use client";

import { TaskComponent } from "@/components/task";
import TaskCreateForm from "@/components/task/create-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DetailTabs({ data }: { data: LeadsDetails }) {
  return (
    <Tabs defaultValue="task">
      <TabsList>
        {/* eslint-disable-next-line no-console */}
        <TabsTrigger onClick={() => console.log("test")} value="task">Task</TabsTrigger>
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="attachments">Attachments</TabsTrigger>
        <TabsTrigger value="log">Log</TabsTrigger>
      </TabsList>
      <TabsContent value="task">
        <TaskComponent />
      </TabsContent>
      <TabsContent value="posts">POST COMPONENT</TabsContent>
      <TabsContent value="attachments">ATTACHMENT COMPONENT</TabsContent>
      <TabsContent value="log">LOG COMPONENT</TabsContent>
    </Tabs>
  )
}