import styles from './styles.module.css';

export const Message = ({me = false, time, text}) => {
    return (
        <div className={me ? styles.line_holder_2 : styles.line_holder_1}>
            <div className={me ? styles.message_box_2 : styles.message_box_1}>
                <p className={styles.message_text}>{text}</p>
            </div>
            <p className={styles.message_time}>{time}</p>
        </div>
    )
}