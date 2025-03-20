export interface ITask {
    id: string
    title: string
    description: string
    status: "To Do" | "In Progress" | "Done"
    projectId: string
    assigneeId: string
    createdAt: Date
}