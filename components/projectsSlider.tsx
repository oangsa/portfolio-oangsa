'use client'

import ProjectsCard from "@/components/projectsCard";
import { projects } from "@/utils/data";
import Carousel from "react-multi-carousel";

export default function ProjectsSlider(): JSX.Element {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };
    
    return (
        <div className="pb-12">
            <Carousel
                swipeable={true}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                transitionDuration={500}
                customTransition="all .5s ease-out"
                containerClass="w-full"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass="carousel-item-padding-40-px"
            >
                {projects.map((items: any, index: any) => {
                    return (
                        <ProjectsCard key={index} props={items}/>
                    )
                })}
            </Carousel>
        </div>

    );
        
}