  
const groupifierExtensionId = extensionName => `groupifier.${extensionName}`;

const buildGroupifierExtension = (extensionName, data) => ({
  id: groupifierExtensionId(extensionName),
  specUrl: `https://groupifier.jonatanklosko.com/wcif-extensions/${extensionName}.json`,
  data,
});

export const setExtensionData = (extensionName, wcifEntity, data) => {
  const otherExtensions = wcifEntity.extensions.filter(
    extension => extension.id !== groupifierExtensionId(extensionName)
  );
  return {
    ...wcifEntity,
    extensions: [
      ...otherExtensions,
      buildGroupifierExtension(extensionName, data),
    ],
  };
};

const defaultExtensionData = {
  GeneralConfig: {
    useProjector: true,
    useGroups: false,
    groupTool: '',
    useTelegramNotif: false,
    logoLink: undefined,
  },
  ScheduleConfig: {
    delay: 0,
    currentActivity: undefined,
    pinnedMessage: undefined,
    groupUpdate: undefined
  },
  NotificationsConfig: {
    channelName: undefined,
    pinMessage: undefined,
  }
};

export const getRoomColors = (venues) => {
  let roomColors = []
  venues.map(venue=>venue.rooms.map(room=> roomColors[room.id] = room.color))
  return roomColors
}

export const getExtensionData = (extensionName, wcifEntity) => {
  const extension = wcifEntity.extensions.find(
    extension => extension.id === groupifierExtensionId(extensionName)
  );
  let defaultData = defaultExtensionData[extensionName];
  if (defaultData === null) return extension && extension.data;
  return extension ? { ...defaultData, ...extension.data } : defaultData;
};

export const removeExtensionData = (extensionName, wcifEntity) => ({
  ...wcifEntity,
  extensions: wcifEntity.extensions.filter(
    extension => extension.id !== groupifierExtensionId(extensionName)
  ),
});