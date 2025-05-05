import { create } from "zustand";

type Store = {
  ai_response: string;
  getResponseFromAi: () => void;
  test: any;
};

const useStore = create<Store>((set) => ({
  ai_response: "",
  getResponseFromAi: () =>
    set((state) => ({ ai_response: state.ai_response + " " })),
  test: {
    bla: "teest",
    another: {
      final: "hello",
    },
  },
}));

export default useStore;
