'use client'

import { Image, Chip, Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";


export default function ProjectsCard({props}: any) {

    return (
        <Card isBlurred className='ml-8 mr-8'>
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