'use server'

import { Octokit } from "octokit";

export default async function getRepoByName(repo: string, branch: string): Promise<Array<any>> {
    
    const octokit = new Octokit({ 
      auth: process.env.GIT_TOKEN as string
    });
    
    try {
      const res = await octokit.request(`GET /repos/{owner}/{repo}/commits?sha={branch}`, {
        owner: 'oangsa',
        repo: repo,
        branch: branch,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })

      // console.log(res.data)
      
      return res.data;
    } 
    catch (e) {
      return []
    }
    

}