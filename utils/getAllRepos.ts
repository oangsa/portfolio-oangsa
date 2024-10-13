'use server'

import { Octokit } from "octokit";

export default async function getAllRepos(): Promise<Array<any>> {
    
    const octokit = new Octokit({ 
        auth: process.env.GIT_TOKEN as string
      });

    const res = await octokit.request('GET /users/{owner}/repos/', {
        owner: 'oangsa',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    return res.data;
}