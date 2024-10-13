'use client'

import { GitHubData } from "@/interfaces/gitData";
import getGitHubData from "@/utils/getGitData";
import { Button } from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function Page(): JSX.Element {
    // const [value, setValue] = useState<GitHubData>({commitsCount: 0, reposCount: 0})  

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

    return (
        <div>
            <Button> Click Me </Button> <br />
            commit count - {value.commitsCount} <br/>
            repos count - {value.reposCount}
        </div>
    )
}