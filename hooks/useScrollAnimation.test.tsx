import { render, act } from "@testing-library/react";
import React from "react";
import { useScrollAnimation } from "./useScrollAnimation";

// Track observer instances
let observerCallback: IntersectionObserverCallback;
let mockObserve: ReturnType<typeof vi.fn>;
let mockDisconnect: ReturnType<typeof vi.fn>;
let constructorOptions: IntersectionObserverInit | undefined;

beforeEach(() => {
  mockObserve = vi.fn();
  mockDisconnect = vi.fn();

  class MockIntersectionObserver {
    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      observerCallback = callback;
      constructorOptions = options;
    }
    observe = mockObserve;
    disconnect = mockDisconnect;
    unobserve = vi.fn();
    root = null;
    rootMargin = "";
    thresholds = [] as number[];
    takeRecords = () => [] as IntersectionObserverEntry[];
  }

  global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

// Test component that uses the hook and exposes isVisible via data attribute
function TestComponent({ threshold, triggerOnce }: { threshold?: number; triggerOnce?: boolean }) {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce });
  return <div ref={ref} data-testid="target" data-visible={isVisible} />;
}

describe("useScrollAnimation", () => {
  it("returns isVisible as false initially", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("target").dataset.visible).toBe("false");
  });

  it("creates IntersectionObserver with default threshold of 0.1", () => {
    render(<TestComponent />);
    expect(constructorOptions).toEqual({ threshold: 0.1 });
  });

  it("creates IntersectionObserver with custom threshold", () => {
    render(<TestComponent threshold={0.5} />);
    expect(constructorOptions).toEqual({ threshold: 0.5 });
  });

  it("observes the referenced element", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(mockObserve).toHaveBeenCalledWith(getByTestId("target"));
  });

  it("sets isVisible to true when element intersects", () => {
    const { getByTestId } = render(<TestComponent />);

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(getByTestId("target").dataset.visible).toBe("true");
  });

  it("disconnects observer after first intersection when triggerOnce is true (default)", () => {
    render(<TestComponent triggerOnce={true} />);

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("does not disconnect observer on intersection when triggerOnce is false", () => {
    render(<TestComponent triggerOnce={false} />);

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(mockDisconnect).not.toHaveBeenCalled();
  });

  it("sets isVisible back to false when element leaves viewport with triggerOnce false", () => {
    const { getByTestId } = render(<TestComponent triggerOnce={false} />);

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(getByTestId("target").dataset.visible).toBe("true");

    act(() => {
      observerCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(getByTestId("target").dataset.visible).toBe("false");
  });

  it("cleans up observer on unmount", () => {
    const { unmount } = render(<TestComponent />);
    mockDisconnect.mockClear();
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
