export default function getItem<T>(item: string, init: T): T {
  return (localStorage.getItem(item)
    ? JSON.parse(localStorage.getItem(item)!)
    : init
  );
}