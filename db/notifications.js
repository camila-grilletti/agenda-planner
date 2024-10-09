import * as Notifications from 'expo-notifications';

export const scheduleTaskNotification = async (task) => {
    const taskDateTime = new Date(`${task.date}T${task.time}`);

    return await Notifications.scheduleNotificationAsync({
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

export const cancelTaskNotification = async (task) => {
    return await Notifications.cancelScheduledNotificationAsync(task);
};
