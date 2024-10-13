"use client"

import {VisuallyHidden, useSwitch} from "@nextui-org/react";
import {MoonIcon} from "../../components/Icons/moon";
import {SunIcon} from "../../components/Icons/sun";
import { useTheme } from "next-themes";

const ThemeSwitch = (props: any): JSX.Element => {
  const {
    Component, 
    slots, 
    isSelected, 
    getBaseProps, 
    getInputProps, 
    getWrapperProps
  } = useSwitch(props);

  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
          <VisuallyHidden>
            <input {...getInputProps()} />
          </VisuallyHidden>
          <div
            {...getWrapperProps()}
            className={slots.wrapper({
              class: [
                "w-8 h-8",
                "flex items-center justify-center",
                "rounded-lg bg-default-100 hover:bg-default-200",
              ],
            })}
          >
            {isSelected ? <SunIcon/> : <MoonIcon/>}
          </div>
          {setTheme(isSelected ? 'light' : 'dark')}
      </Component>
    </div>
  )
}


export default function App() {
  return <ThemeSwitch/>
}