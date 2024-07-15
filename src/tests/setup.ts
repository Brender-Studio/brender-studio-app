/// <reference types="vitest" />

import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/vitest'

afterEach(() => {
    // Clean up after each test
    cleanup()
});