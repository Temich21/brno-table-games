import styles from "./Cards.module.css";
import { backendUrl } from "@/constants";

const Games = ({ games }) => {
    if (games.data.length == 0) {
        return <div><EmptyPage /></div>
    }

    const gamesElements = games.data.map((data) => (
        <GameCard key={data.id} data={data.attributes} />
    ))
    return <div>{gamesElements}</div>

}

const EmptyPage = () => {
    return (
        <p className={styles.emptypageText}>
            К сожалению, на данный момент здесь нет контента.
            Наша команда усердно работает над организацией интересных игр, чтобы помочь вам в вашем игровом путешествии.
            Заходите в ближайшее время, чтобы узнать, что нового! А пока, почему бы не изучить другие наши страницы? Спасибо за терпение и удачной игры!
        </p>
    )
}

const GameCard = ({ data }) => {
    return (
        <article
            className={
                data.Image.data != null
                    ? styles.contentWithImage
                    : styles.contentWithoutImage
            }
        >
            {data.Image.data &&
                <img
                    src={backendUrl + data.Image.data.attributes.url}
                    className={styles.picture}
                ></img>}

            <div
                className={
                    data.Image.data != null
                        ? styles.contentWithImageContent
                        : styles.contentWithouImageContent
                }
            >
                <h3 className={styles.banner}>{data.Game_name}</h3>
                <h4 className={styles.text}>{<ContentUnification key={data.id} data={data} />}</h4>
            </div>
        </article>
    )
}

const ContentUnification = ({ data }) => {
    const GMTelgram = `https://telegram.me/${data.GM.data.attributes.Telegram.slice(1, -1)}`

    return (
        <div className={styles.gameInfo}>
            <div className={styles.GM}> {data.GM.data.attributes.Name} |
                Telegram: <a href={GMTelgram}>{data.GM.data.attributes.Telegram}</a>
            </div>
            <div style={{ fontFamily: "cursive" }} >{data.Description}</div>
            <div >Уровень персонажей: {data.level}</div>
            <div>Игроки:<ul>{printPlayerList(data.Players.data)}</ul></div>
            <div>Место проведения: {data.Game_place.data.attributes.Name}
                | Адрес: {data.Game_place.data.attributes.Description}</div>
            <div>Дата проведения: {dateEditing(new Date(data.Date))}</div>
        </div>
    )
}

const printPlayerList = (players) => {
    return players.map((player) => (<PrintPlayer key={player.id} player={player} />))
}

const PrintPlayer = ({ player }) => {
    const playerTelgram = `https://telegram.me/${player.attributes.Telegram.slice(1, -1)}`

    return (
        <li>{player.attributes.Name} |
            <a href={playerTelgram}>{player.attributes.Telegram}</a>
        </li>
    )
}

const dateEditing = (date) => {
    const day = date.getDay()
    const days = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ]
    const dayName = days[date.getDay()]

    const year = date.getFullYear()

    const months = {
        0: "Января",
        1: "Февраля",
        2: "Марта",
        3: "Апреля",
        4: "Мая",
        5: "Июня",
        6: "Июля",
        7: "Августа",
        8: "Сентября",
        9: "Октября",
        10: "Ноября",
        11: "Декабря",
    };
    const monthName = months[date.getMonth()]

    const hour = date.getHours()

    const minutes = date.getMinutes()

    const formatted = `${dayName}, ${day} ${monthName} ${year} в ${hour}:${minutes}0`

    return formatted;
}

export default Games