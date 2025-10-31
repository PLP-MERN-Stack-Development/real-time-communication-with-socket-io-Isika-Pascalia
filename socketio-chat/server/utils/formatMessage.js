// server/utils/formatMessage.js
export function formatMessage(user, text) {
  return {
    user,
    text,
    time: new Date().toLocaleTimeString(),
  };
}
