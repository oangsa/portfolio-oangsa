'use client'

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProjectsCard from "@/components/projectsCard";
import { projects } from "@/utils/data";

export default function ProjectsSlider(): JSX.Element {
    const settings = {
      className: "center",
      centerMode: false,
      infinite: true,
      slidesToShow: 1,
      speed: 500,
      dots: true,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
    };


    return (
        <div className="pb-16 justify-items-center">
            <Slider {...settings}>
                {projects.map((items: any, index: any) => {
                    return (
                        <ProjectsCard key={index} props={items}/>
                    )
                })}
            </Slider>
        </div>
    )
}