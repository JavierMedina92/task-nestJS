
export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'iN_PROGRESS',
    DONE = 'DONE'
}

export class Task {
    id: string
    title: string
    description: string
    status: TaskStatus
}

