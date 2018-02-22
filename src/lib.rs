#[cfg(test)]
mod tests {
    use add_one;

    #[test]
    fn it_works() {
        assert_eq!(add_one(3), 4);
    }
}

#[no_mangle]
pub extern fn add_one(a: u32) -> u32 {
    a + 1
}

#[no_mangle]
pub extern fn factorial(num: u32) -> u32 {
  let mut result = 1;
  for i in 1..(num+1) {
    result = i * result;
  }
  return result;
}

#[no_mangle]
pub extern fn recursiveFactorial(num: u32) -> u32 {
  if num <= 0 { return 1 }
  return num * recursiveFactorial(num - 1)
}