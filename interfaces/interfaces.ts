import type { StaticImageData } from "next/image";

export interface projectsInterface {
    slug?: string,
    name: string,
    subject: string,
    image?: StaticImageData,
    description: string,
    status: "Completed" | "In progress",
    tools?: string[],
    links?: Array<{
        label: string,
        href: string,
    }>,
    caseStudy?: {
        role: string,
        schemaType?: "SoftwareSourceCode" | "CreativeWork",
        sourceLabel?: string,
        sourceUpdated: string,
        lastModified: string,
        imageCaption?: string,
        problem: string,
        outcome: string,
        architecture?: Array<{
            label: string,
            detail: string,
        }>,
        contributors?: string[],
    },
}

export interface baseInterface {
    title: string,
    description: string,
}

interface infoStruct {
    fieldName: string,
    fieldValue: string
}

export interface aboutInterface extends baseInterface {
    infos: Array<infoStruct>
}

export interface resumeEntryInterface {
    title: string,
    organization: string,
    duration: string,
    context?: string,
    highlights?: string[],
}

export interface resumeSectionInterface extends baseInterface {
    entries: resumeEntryInterface[]
}
