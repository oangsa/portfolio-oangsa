'use client'

import { Image, Chip, Card, CardBody, CardHeader, CardFooter, Divider, Link } from "@nextui-org/react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ProjectsCard({props}: any) {

    return (
        <Card isBlurred className='ml-4 mr-4'>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{props.name} <Chip color={props.status == 'in-progess' ? "warning" : "success" }>{props.status}</Chip></h4>
                <small className="text-default-500">{props.subject}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2 justify-center items-center">
                <Image as={Image} src={props.image} width={2000} height={500} className="object-cover rounded-xl"/>
            </CardBody>
            <CardFooter>
                {props.description}
            </CardFooter>
        </Card>
    )
}