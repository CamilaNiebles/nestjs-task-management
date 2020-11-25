/**
 * Build an interface to define what kind of data this entity
 * is going to have.
 */
export interface Task{
    id:string;
    title:string;
    description:string;
    status:TaskStatus;
}

/**
 * Is a feature's typescript that allows to the developers to define a set
 * of a named constants
 */
export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}