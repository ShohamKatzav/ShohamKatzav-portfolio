import Credentials from "./Credentials";

export default interface Project {
    title: string;
    tech: string;
    description: string;
    github: string;
    demo?: string;
    credentials?: Credentials[];
}