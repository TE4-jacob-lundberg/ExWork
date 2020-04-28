/* eslint-disable @typescript-eslint/no-explicit-any */
interface IEventBus {
  events: {[id: string]: Function[]};
  dispatch: (event: string, data: any) => void;
  subscribe: (event: string, callBack: Function) => void;
}

const EventBus: IEventBus = {
  events: {},
  dispatch: function (event: string, data: any): void {
    if (!this.events[event]) return;
    this.events[event].forEach((callBack: Function) => callBack(data));
  },
  subscribe: function (event: string, callBack: Function): void {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callBack);
  },
};

export { EventBus };
