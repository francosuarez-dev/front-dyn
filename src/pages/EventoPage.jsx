import { useParams, useLocation } from "react-router-dom"
import { doc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { useDocumentOnce } from "react-firebase-hooks/firestore"
import { LazyLoadImage } from "react-lazy-load-image-component"
import ConsigueTicket from "../components/ConsigueTicket"
import { FacebookShareButton, FacebookIcon, TwitterShareButton, XIcon, WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon } from "react-share"

const EventoPage = () => {

    const { id } = useParams()
    const [evento, loadingEvento, errorEvento] = useDocumentOnce(
        doc(db, 'eventos', id)
    );

    const location = useLocation();
    const fulLocation = "https://diaynoche-tickets.web.app" + location.pathname;

    return (
        <div className="w-full flex flex-col">
            {errorEvento && <strong>Error: {JSON.stringify(error)}</strong>}
            {loadingEvento && <span>Cargando...</span>}
            {evento &&
                <div className="flex flex-col gap-4 md:flex-row rounded-md shadow-md">
                    <div className="w-full p-2">
                        <LazyLoadImage
                            className="mx-auto"
                            width={400}
                            src={"https://storage.googleapis.com/dyn-tickets.appspot.com/img/eventos/" + evento.data().flyer}
                        />
                    </div>
                    <div className="flex w-full flex-col justify-center p-2">
                        <span className="w-full text-center font-bold text-2xl text-blue-600">{evento.data().titulo}</span>
                        <span className="w-full mt-4 text-center font-semibold text-base">Fecha: {new Date(evento.data().fechaInicio.seconds * 1000).toLocaleDateString()}</span>
                        <span className="w-full text-center font-semibold text-base">Hora: {new Date(evento.data().fechaInicio.seconds * 1000).toLocaleTimeString()}</span>
                        <div className="w-full flex mt-4 justify-center gap-4 items-center">
                            <FacebookShareButton url={fulLocation}>
                                <FacebookIcon round size={35} />
                            </FacebookShareButton>
                            <TwitterShareButton url={fulLocation}>
                                <XIcon round size={35} />
                            </TwitterShareButton>
                            <WhatsappShareButton url={fulLocation}>
                                <WhatsappIcon round size={35} />
                            </WhatsappShareButton>
                            <TelegramShareButton url={fulLocation}>
                                <TelegramIcon round size={35} />
                            </TelegramShareButton>
                        </div>
                        <span className="w-full mt-6 text-center font-bold text-xl text-green-600">Conseguir Tickets</span>
                        <ConsigueTicket idEvento={evento.id} {...evento.data()} />
                    </div>
                </div>
            }
        </div>
    )
}

export default EventoPage