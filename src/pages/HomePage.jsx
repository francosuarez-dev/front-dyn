import { collection, query, where, Timestamp, orderBy, getDocs } from "firebase/firestore"
import { db } from "../firebaseConfig"
import CardEvento from "../components/CardEvento"
import { useEffect, useState } from "react"

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [eventos, setEventos] = useState(null)

    useEffect(() => {
        const fechaHoy = Timestamp.fromDate(new Date());
        const ref = collection(db, 'eventos');
        const quer = query(ref, where('fechaInicio', '>=', fechaHoy), orderBy('fechaInicio', 'asc'));
        getDocs(quer)
        .then((snapQ) => {
            setLoading(false)
            setEventos(snapQ)
        })
        .catch(()=> setLoading(false))
    })

    return (
        <>
            <div className="flex w-full flex-col gap-4 md:flex-row">
                <p>{loading && <span>Cargando...</span>}</p>
                {eventos && (
                    <>
                        {eventos.docs.map((doc) => (
                            <div className="w-full" key={doc.id}>
                                <CardEvento evento={doc.data()} slug={doc.id} />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}
export default HomePage