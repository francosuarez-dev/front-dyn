import { Card } from "flowbite-react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link } from "react-router-dom"

const CardEvento = ({ evento, slug }) => {

    return (
        <Card
            className="max-w-sm mx-auto"
            imgAlt={evento.titulo}
            renderImage={() =>
                <LazyLoadImage
                    src={"https://storage.googleapis.com/dyntickets.appspot.com/img/eventos/" + evento.flyer}
                />
            }
        >
            <div>
                <h5 className="text-xl font-semibold tracking-tight text-blue-800">
                    {evento.titulo}
                </h5>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">
                    {new Date(evento.fechaInicio.seconds * 1000).toLocaleDateString()}
                </span>
                <Link to={"/evento/"+slug} className="rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300">
                    Conseguir Ticket
                </Link>
            </div>

        </Card>
    )
}
export default CardEvento