import React, { useEffect, useState } from "react";

interface NotificationData {
  id: number;
  title: string;
  message: string;
  timestamp: string;
}

interface NotificationContainerProps {
  hideNotificationContainer: boolean;
  setHideNotificationContainer: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NotificationProps {
  notification: {
    id: number;
    title: string;
    message: string;
    timestamp: string;
  };
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  notification,
  onClose,
}) => {
  return (
    <div className="bg-gray-200 p-3 mb-2 rounded-md flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{notification.title}</h3>
        <p className="text-sm">{notification.message}</p>
        <p className="text-xs text-gray-500">{notification.timestamp}</p>
      </div>
      <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
        &#10006;
      </button>
    </div>
  );
};

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  hideNotificationContainer,
  setHideNotificationContainer,
}) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([
    {
      id: 1,
      title: "New Message",
      message: "You have a new message from John.",
      timestamp: "10:00 AM",
    },
    {
      id: 2,
      title: "Reminder",
      message: "Don't forget your appointment tomorrow!",
      timestamp: "12:00 PM",
    },
  ]);

  useEffect(() => {
    if (notifications.length === 0) {
      setHideNotificationContainer(true);
    }
  }, [notifications.length]);

  // Function to handle closing a notification
  const handleCloseNotification = (notificationId: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
  };

  return (
    <div
      className={`position fixed top-0 right-0 w-full md:w-2/6 z-40 h-auto transition-transform ${
        hideNotificationContainer
          ? "transform translate-x-full"
          : "transform translate-x-0"
      }`}
    >
      <div className="transition-all">
        <div className="p-4">
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              onClose={() => handleCloseNotification(notification.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationContainer;
