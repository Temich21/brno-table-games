import Head from "next/head"
import { useEffect } from "react"
import { useRouter } from "next/router"
import styles from "../styles/404.module.css"

const Error = () => {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 4000)
    }, [router])

    return (
        <>
            <Head>
                <title>404</title>
            </Head>
            <div className={styles.error404}>
                404
            </div>
            <p className={styles.errorText}>
                Ой! Похоже, вы сбились с проторенного пути и наткнулись на страницу 404. Возвращаю вас на Главную!
            </p>
        </>
    )
}

export default Error