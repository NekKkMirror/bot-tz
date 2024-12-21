export const generateUniqueFilename = (
  originalFilename: string,
  additionalString?: string,
): string => {
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 1e9);

  const formattedString = additionalString ? `${additionalString}-` : '';

  return `${formattedString}${timestamp}-${randomPart}-${originalFilename}`;
};
