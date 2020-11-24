export default function useStoreage<T>() {
  interface Storage {
    expires: number
    data: T
  }

  update()

  function update() {
    Object.keys(localStorage).forEach(key => {
      const item = get(key)

      if (item.expires < Date.now()) {
        localStorage.removeItem(key)
      }
    });
  }

  function get(key: string): Storage  {
    return JSON.parse(localStorage.getItem(key));
  }

  function set(key: string, data: T, expires: number = 3600000) {
    localStorage.setItem(key, JSON.stringify({
      expires: Date.now() + expires,
      data
    }))
    update()
  }

  return {
    get,
    set,
    update
  }
}