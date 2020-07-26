import { createStore } from '../src/index';
import { renderHook, act } from '@testing-library/react-hooks';

const { useSelector, dispatch, getState } = createStore({
  state: {
    count: 0,
  },
  actions: {
    increment(state, payload: number) {
      state.count += payload;
    },
    decrement(state, payload: number) {
      state.count -= payload;
    },
    setCount(state, payload: number) {
      state.count = payload;
    },
    increateWithoutPayload(state) {
      state.count++;
    },
    async asyncIncrement(_, payload: number) {
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 50);
      });
      dispatch.increment(payload);
    },
  },
});

test('useStore', async () => {
  const { result, unmount } = renderHook(() => useSelector(s => s.count));

  expect(result.current).toBe(0);

  expect(getState()).toEqual({
    count: 0,
  });

  await act(async () => {
    await dispatch.increateWithoutPayload();
  });

  expect(result.current).toBe(1);

  await act(async () => {
    await dispatch.decrement(1);
    await dispatch.decrement(1);
  });

  expect(result.current).toBe(-1);

  await act(async () => {
    await dispatch.asyncIncrement(1);
  });

  expect(result.current).toBe(0);

  await act(async () => {
    await dispatch.setCount(2);
  });
  expect(result.current).toBe(2);

  unmount();
});
