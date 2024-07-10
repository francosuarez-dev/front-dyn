import { useState, useRef } from "react";
import { useAuth } from "../providers/AuthProvider"
import { Link } from "react-router-dom";
import { Select, Modal } from "flowbite-react";
import { db } from "../firebaseConfig";
import { doc, collection, query, where, writeBatch, increment } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore"
import { QrCodeIcon } from "lucide-react";
import QRCode from "react-qr-code";
import download from "downloadjs";
import { toPng } from "html-to-image";
import margaLogoGde from '../assets/logo.png'

const ConsigueTicket = ({ idEvento, titulo, cantUsuario, qrGenerados, cantidad, fechaInicio, flyer }) => {

    const [cantElegida, setSelecCant] = useState(1)
    const { user, loading, error } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const [qrSelec, setQrSelect] = useState();

    const downRef = useRef();

    const qRef = collection(db, `eventos/${idEvento}/qrs`)
    const q = query(qRef, where("idUsuario", "==", user && user.uid))
    const [snapshot, cargando, errorQr] = useCollection(q)

    let selectFor = []
    for (let i = 1; i <= cantUsuario; i++) {
        selectFor.push({ valor: i })
    }

    if (loading) {
        return (
            <span>Cargando...</span>
        )
    }

    if (!user) {
        return (
            <div className="w-full mt-2">
                <div className="flex flex-col w-full bg-red-400 rounded-md p-2 items-center">
                    <span className="font-medium w-full text-center capitalize text-white">Por Favor Ingrese para adquirir su Ticket.</span>
                    <Link className="text-xl font-bold" to={"/login"}>INGRESAR</Link>
                </div>
            </div>
        )
    }

    const onImageCownload = (id) => {
        toPng(downRef.current, {
            cacheBust: false,
            style: {
                backgroundImage: "linear-gradient(132deg, rgba(21,8,240,1) 0%, rgba(9,9,121,1) 35%, rgba(255,0,176,1) 100%)",
            }

        })
            .then((dataUrl) => {
                download(dataUrl, id, 'image/png')
            })
    };




    const generarTickets = async () => {

        const batch = writeBatch(db)
        const eRef = doc(db, 'eventos', idEvento)

        for (let i = 1; i <= cantElegida; i++) {
            const qRef = doc(collection(db, `eventos/${idEvento}/qrs`))
            batch.set(qRef, {
                idEvento: idEvento,
                titulo: titulo,
                ingreso: false,
                fechaIngreso: '',
                idUsuario: user.uid,
                fechaEvento: fechaInicio,
                flyer: flyer
            })
        }

        batch.update(eRef, {
            qrGenerados: increment(cantElegida)
        })

        await batch.commit()

    }

    return (
        <div className="w-full mt-2">
            <div className="flex w-full flex-col items-center mb-2">
                {qrGenerados >= cantidad ?
                    <span>AGOTADO</span>
                    :
                    snapshot &&
                    <>
                        {snapshot.size >= 1 ?
                            <>
                                <span className="mt-1 w-full max-w-sm text-center">Mis Tickets:</span>
                                <div className="w-full flex mt-4 justify-center gap-4 items-center">
                                    {snapshot.docs.map((qr) => (
                                        <button
                                            key={qr.id}
                                            className={`p-2 rounded-md shadow-md ${qr.data().ingreso ? 'bg-red-500' : 'bg-green-400 hover:bg-green-500'}`}
                                            onClick={() => {
                                                setQrSelect(qr)
                                                setOpenModal(true)
                                            }}
                                        >
                                            <QrCodeIcon size={30} color="white" />
                                        </button>
                                    ))}
                                </div>
                            </>
                            :
                            <>
                                <span className="text-sm">Seleccione Cantidad de Tickets:</span>
                                <Select name="cantElegida" value={cantElegida} onChange={(e) => setSelecCant(e.target.value)} className="mt-1 w-full max-w-sm">
                                    {selectFor.map((sel) => (
                                        <option key={sel.valor} defaultValue={sel.valor}>{sel.valor}</option>
                                    ))}
                                </Select>
                                <button onClick={generarTickets} className="bg-green-400 text-white font-bold rounded-md p-2 shadow-md mt-2 hover:border-2 hover:border-blue-600">
                                    Confirmar Tickets
                                </button>
                            </>
                        }
                        <Modal size="md" show={openModal} onClose={() => setOpenModal(false)} popup>
                            <Modal.Header />
                            <Modal.Body>
                                <div ref={downRef} className="bg-cover rounded-lg w-auto h-auto overflow-hidden" style={{ backgroundImage: `url('https://storage.googleapis.com/dyntickets.appspot.com/img/eventos/${flyer}')` }}>
                                    <div
                                        className="flex w-full flex-col gap-2 items-center text-center backdrop-blur-sm bg-black/30"
                                    >
                                        {qrSelec &&
                                            <>
                                                <span className="w-full mt-4 text-3xl font-bold text-white">{qrSelec.data().titulo}</span>
                                                <span className="w-fulltext-lg mb-4 font-bold text-white ">{new Date(qrSelec.data().fechaEvento.seconds * 1000).toLocaleDateString()}</span>
                                                <div className="w-full p-2 mb-2 text-center items-center">
                                                    <QRCode
                                                        value={qrSelec.id}
                                                        size={256}
                                                        fgColor={qrSelec.data().ingreso ? "red" : ""}
                                                        className="mx-auto border-2 p-1"
                                                    />
                                                </div>
                                                {qrSelec.data().ingreso &&
                                                    <span className="text-lg mb-2 mt-2 font-bold text-red-600">QR YA UTILIZADO</span>
                                                }
                                                <img src={margaLogoGde} width={250} className="mb-2" />
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className="w-full items-center flex">
                                    <button className="flex mx-auto mt-2 font-semibold" onClick={() => onImageCownload(qrSelec.id)}>DESCARGAR QR</button>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </>
                }
            </div>
        </div>
    )
}

export default ConsigueTicket