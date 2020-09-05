import { isIPv4 } from "../src"

test("192.168.0.1 is valid", () => {

    expect(isIPv4("192.168.0.1")).toBe(true)
})

test("1920.168.0.1 is not valid", () => {

  expect(isIPv4("1920.168.0.1")).toBe(false)
})

test("192.1682.0.1 is not valid", () => {

  expect(isIPv4("192.1682.0.1")).toBe(false)
})

test("192.168.256.1 is not valid", () => {

  expect(isIPv4("192.168.256.1")).toBe(false)
})

test("192.168.255.500 is not valid", () => {

  expect(isIPv4("192.168.255.500")).toBe(false)
})

test("192.168.255.255 is valid", () => {
  expect(isIPv4("192.168.255.255")).toBe(true)
})

test("192.168.X.255 is valid", () => {
  expect(isIPv4("192.168.X.255")).toBe(false)
})


