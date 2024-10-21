export interface GitHubDataInterface {
    reposCount: number,
    commitsCount: number
}

export interface projectsInterface {
    name: string,
    subject: string,
    image: string,
    description: string,
    status: string
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