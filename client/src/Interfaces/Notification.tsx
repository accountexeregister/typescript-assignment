interface Notification {
    id: number;
    msg: string;
    timeoutId?: NodeJS.Timeout;
}

export default Notification;