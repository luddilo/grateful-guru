import config from "../../config.json"

export const getBackendUrl = (path: string) => {
  return `${config.local ? config.localUrl : config.publicUrl}${path}`
}
