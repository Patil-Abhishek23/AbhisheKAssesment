// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import '@testing-library/jest-dom/extend-expect';


// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: "/",
  }),
}));