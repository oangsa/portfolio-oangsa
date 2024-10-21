'use client'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ImHtmlFive2 } from "react-icons/im";
import { IoLogoJavascript } from "react-icons/io";
import { TbBrandTypescript } from "react-icons/tb";
import { TbBrandNextjs } from "react-icons/tb";
import { CIcon } from "../../components/Icons/c"
// import { ImHtmlFive2 } from "react-icons/im";

export default function Page(): JSX.Element {
    return (
        <div>
            {/* <Button> Click Me </Button> <br />
            <div className="">
              <Slider {...settings}>
                {projects.map((items, index) => {
                  return (
                    <ProjectsCard key={index} props={items}/>
                  )
                })}
              </Slider>
            </div> */}
            <ImHtmlFive2/>
            <IoLogoJavascript/>
            <TbBrandTypescript/>
            <TbBrandNextjs/>
            <CIcon/>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M329.1 142.9c-62.5-62.5-155.8-62.5-218.3 0s-62.5 163.8 0 226.3s155.8 62.5 218.3 0c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3c-87.5 87.5-221.3 87.5-308.8 0s-87.5-229.3 0-316.8s221.3-87.5 308.8 0c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0z"/></svg>
        </div>
    )
}