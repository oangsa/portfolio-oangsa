import { GitHubDataInterface } from "@/interfaces/interfaces";
import getAllRepos from "./getAllRepos";
import getRepoByName from "./getReposByName";
import { cache } from 'react'

export const getGitHubData = cache(async (): Promise<GitHubDataInterface> => {

    const res: Array<any> = await getAllRepos();

    var total: number = 0

    for (let i = 0; i < res.length; i++) {
        const name: string = res[i].name

        let d: Array<any> = await getRepoByName(name, "main");
        let d2: Array<any> = await getRepoByName(name, "master");

        total = total + d.length + d2.length
    }



    return {commitsCount: total, reposCount: res.length} as GitHubDataInterface
})

