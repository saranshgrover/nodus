  
const getExtensionId = extensionName => `realtime.${extensionName}`;

const buildExtension = (extensionName, data) => ({
  id: getExtensionId(extensionName),
  specUrl: `http://localhost:3000/wcif-extensions/${extensionName}.json`,
  data,
});

export const setExtensionData = (extensionName, wcifEntity, data) => {
  const otherExtensions = wcifEntity.extensions.filter(
    extension => extension.id !== getExtensionId(extensionName)
  );
  return {
    ...wcifEntity,
    extensions: [
      ...otherExtensions,
      buildExtension(extensionName, data),
    ],
  };
};

const defaultExtensionData = {
  GeneralConfig: {
    useProjector: false,
    useGroups: false,
    groupTool: '',
    useTelegramNotif: false,
    logoLink: undefined,
    channelName: undefined
  },
  ScheduleConfig: {
    delay: 0,
    currentActivity: undefined,
    pinnedMessage: undefined,
    groupUpdate: undefined
  },
};


export const getExtensionData = (extensionName, wcifEntity) => {
  const extension = wcifEntity.extensions.find(
    extension => extension.id === getExtensionId(extensionName)
  );
  let defaultData = defaultExtensionData[extensionName];
  if (defaultData === null) return extension && extension.data;
  return extension ? { ...defaultData, ...extension.data } : defaultData;
};

export const isExtensionSetup = (extensionName, wcifEntitiy) => wcifEntitiy.extensions.filter(extension => extension.id === getExtensionId(extensionName)).length > 0

export const removeExtensionData = (extensionName, wcifEntity) => ({
  ...wcifEntity,
  extensions: wcifEntity.extensions.filter(
    extension => extension.id !== getExtensionId(extensionName)
  ),
});