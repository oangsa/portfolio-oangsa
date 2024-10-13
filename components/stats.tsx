'use client'

import { GitHubData } from "@/interfaces/gitData"
import getGitHubData from "@/utils/getGitData"
import { useState, useCallback, useEffect } from "react"
import CountUp from 'react-countup'

export default function Stats () : JSX.Element {
    const [value, setValue] = useState<GitHubData>({commitsCount: 0, reposCount: 0})

    const getData = useCallback(async () => {
      await getD()
    }, [])
  
    const getD = async () => {
      const res = await getGitHubData()
      return setValue(res)
    }
  
    useEffect(() => {
      getData()
    }, [getData]);

    const stats: Array<{name: string, num: number}> = [
        {
            name: "Total Git Repositories",
            num: value.reposCount
        },
        {
            name: "Code Commits",
            num: value.commitsCount
        }
    ]
    
    return (
        <section>
            <div className="container mx-auto">
                <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
                    {stats.map((item, index) => {
                        return (
                            <div className="flex-1 flex gap-4 items-center justify-center xl:justify-start" key = {index}>
                                <CountUp end={item.num} duration={5} delay={2} className="text-4xl xl:text-6xl font-extrabold"/>
                                <p className={`${item.name.length < 15 ? "max-w-[100px]" : "max-w-[150px]"}`}>{item.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )

}