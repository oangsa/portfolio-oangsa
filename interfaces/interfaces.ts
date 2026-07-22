import type { StaticImageData } from "next/image";

export interface projectsInterface {
    name: string,
    subject: string,
    image: StaticImageData,
    description: string,
    status: "Completed" | "In progress",
    href?: string,
}

export interface baseInterface {
    title: string,
    description: string,
}

interface infoStruct {
    fieldName: string,
    fieldValue: string
}

interface educationStruct {
    institution: string,
    degree: string,
    duration: string
}

export interface aboutInterface extends baseInterface {
    infos: Array<infoStruct>
}

export interface educationInterface extends baseInterface {
    infos: Array<educationStruct>
}
