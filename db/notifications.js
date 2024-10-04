import * as Notifications from 'expo-notifications';

export const scheduleTaskNotification = async (task) => {
    const taskDateTime = new Date(`${task.date}T${task.time}`);

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "🍅 Pending Task 🍅",
            body: `${task.title}`,
            sound: true,
            priority: 'high',
        },
        trigger: {
            date: taskDateTime,
        },
    });
};
