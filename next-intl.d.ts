import es from "./src/messages/es.json"

type Messages = typeof es

declare global {
  interface IntlMessages extends Messages {}
}
