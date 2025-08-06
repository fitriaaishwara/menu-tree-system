const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"menus.index":{"uri":"menus","methods":["GET","HEAD"]},"menus.store":{"uri":"menus","methods":["POST"]},"menus.update":{"uri":"menus\/{id}","methods":["PUT"],"parameters":["id"]},"menus.destroy":{"uri":"menus\/{id}","methods":["DELETE"],"parameters":["id"]},"storage.local":{"uri":"storage\/{path}","methods":["GET","HEAD"],"wheres":{"path":".*"},"parameters":["path"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
