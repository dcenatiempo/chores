function info(message: string, metadata?: { [key: string]: any }) {
  if (!metadata) return console.info(message);
  console.info(message, metadata);
}

function warn(message: string, metadata?: { [key: string]: any }) {
  if (!metadata) return console.warn(message);
  console.warn(message, metadata);
}

function error(message: string, metadata?: { [key: string]: any }) {
  if (!metadata) return console.error(message);
  console.error(message, metadata);
}

function debug(message: string, metadata?: { [key: string]: any }) {
  if (!metadata) return console.log(message);
  console.log(message, metadata);
}

export { info, warn, error, debug };
