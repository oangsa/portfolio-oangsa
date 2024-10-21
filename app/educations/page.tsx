"use client"

import { educations, about } from "@/utils/data";
import { Tabs, Tab, Card, CardBody, ScrollShadow, Divider } from "@nextui-org/react";
import { useState } from "react";


export default function Page(): JSX.Element {
    const [selected, setSelected] = useState("about");


    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 xl:py-8">
            <div className="container mx-auto">
                <Tabs size="lg"  selectedKey={selected} onSelectionChange={setSelected} className="flex flex-col xl:flex-row gap-[60px]" isVertical={false} color="success">
                    <Tab key="about" title="About me"/>
                    <Tab key="education" title="Educations"/>
                </Tabs>
                <div className="pt-12 min-h-[70vh] w-full">
                    {selected == "about" ? 
                        <div className="w-full text-center xl:text-left">
                            <div className="flex flex-col gap-[30px]">
                                <h3 className="text-4xl font-bold text-dark_accent dark:text-accent">{about.title}</h3>
                                <p className="max-w-[600px] dark:text-white/60 mx-auto xl:mx-0">{about.description}</p>
                                <Divider/>
                                <ul className="grid grid-cols-1 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                                    {about.infos.map((items, index) => {
                                        return (
                                            <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                                                <span className="dark:text-white/60">{items.fieldName}:</span>
                                                <span className="text-xl">{items.fieldValue}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                
                    :
                        <div className="w-full">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold text-dark_accent dark:text-accent">{educations.title}</h3>
                                <p className="max-w-[600px] dark:text-white/60 mx-auto xl:mx-0">
                                    {educations.description}
                                </p>
                                <Divider/>
                                <ScrollShadow className="h-[400px]">
                                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                                        {educations.infos.map((items, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className="dark:bg-[#232329] bg-[#80808d] h-[284px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-12"
                                                >
                                                    <span className="text-accent font-bold">{items.duration}</span>
                                                    <h3 className="text-xl max-w-[400px] min-h-[60px] text-center lg:text-left">{items.degree}</h3>
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                                                        <p className="dark:text-white/60">{items.institution}</p>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </ScrollShadow>
                            </div>
                        </div>
                
                    }
                </div>
            </div>
        </div>
    )
}